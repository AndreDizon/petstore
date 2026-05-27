# Multi-stage Dockerfile for building and running the Spring Boot backend

# Build stage: use Maven image with JDK 17 to build the application
FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /workspace/app

# Copy only what we need for a fast maven download/caching
COPY pom.xml ./
RUN mkdir -p src

# Copy source
COPY src ./src

# Build the application (creates the fat jar)
# Use the maven binary provided by the base image and explicitly
# invoke the spring-boot:repackage goal to ensure an executable jar
RUN mvn -B -e -DskipTests package spring-boot:repackage

# Run stage: use a slim JRE image
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app

# Copy the jar from the build stage
COPY --from=build /workspace/app/target/petstore-backend-0.0.1-SNAPSHOT.jar app.jar

# Expose the application port
EXPOSE 8080

# Create a non-root user and group for better security (portable across images)
RUN set -eux; \
		if command -v groupadd >/dev/null 2>&1; then \
			groupadd -r spring || true; \
		fi; \
		if command -v useradd >/dev/null 2>&1; then \
			useradd -r -g spring -d /home/spring -s /sbin/nologin -c "spring user" spring || true; \
			mkdir -p /home/spring; \
			chown -R spring:spring /home/spring; \
		fi; \
		chown spring:spring /app/app.jar || true
USER spring

# Copy DB wait helper and make it executable
COPY --chown=spring:spring wait-for-db.sh /app/wait-for-db.sh
RUN chmod +x /app/wait-for-db.sh

ENTRYPOINT ["/app/wait-for-db.sh"]
