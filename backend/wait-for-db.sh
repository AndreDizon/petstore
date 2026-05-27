#!/usr/bin/env bash
set -e

echo "Starting wait-for-db helper"

if [ -z "${JDBC_DATABASE_URL}" ]; then
  echo "JDBC_DATABASE_URL not set, skipping DB wait"
  exec java -jar /app/app.jar
fi

# Extract host and port from jdbc:postgresql://host:port/dbname
url_no_prefix=${JDBC_DATABASE_URL#jdbc:postgresql://}
host_port=${url_no_prefix%%/*}
host=${host_port%%:*}
port=${host_port#*:}
if [ "$port" = "$host" ]; then
  # no port present
  port=5432
fi

echo "Waiting for database at $host:$port"
max_wait=60
until bash -c "</dev/tcp/$host/$port" 2>/dev/null; do
  max_wait=$((max_wait-1))
  if [ $max_wait -le 0 ]; then
    echo "Timed out waiting for $host:$port"
    exit 1
  fi
  sleep 1
done

echo "Database reachable, starting application"
exec java -jar /app/app.jar
