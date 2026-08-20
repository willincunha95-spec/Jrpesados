package com.Jrpesados.Jrpesados.infra.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        exposeDirectory("uploads", registry);
    }

//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedOrigins(
//                    "https://jrpesadostransportes.com.br",
//                    "https://api.jrpesadostransportes.com.br",
//                    "http://jrpesadostransportes.com.br", 
//                    "http://api.jrpesadostransportes.com.br",
//                    "http://18.230.43.15:3000", 
//                    "http://localhost:3000"
//                )
//                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
//                .allowedHeaders("*")
//                .allowCredentials(true);
//    }

    private void exposeDirectory(String dirName, ResourceHandlerRegistry registry) {
        Path uploadDir = Paths.get(dirName);
        String resourceLocation = uploadDir.toUri().toString();

        registry.addResourceHandler("/" + dirName + "/**")
                .addResourceLocations(resourceLocation);
    }
}
