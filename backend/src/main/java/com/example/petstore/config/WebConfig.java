package com.example.petstore.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                // allow local dev and the Render frontend (adjust if your Render URL differs)
                .allowedOrigins(
                        "http://localhost:5173",
                        "http://127.0.0.1:5173",
                        "https://petstore-frontend-qe2r.onrender.com"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD")
                .allowedHeaders("*")
                // the frontend currently receives Access-Control-Allow-Credentials: true
                // in production; enable credentials support for cookies/auth if needed
                .allowCredentials(true)
                .maxAge(1800);
    }
}
