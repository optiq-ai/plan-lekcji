package com.intelligentlessonplanning.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI(@Value("${springdoc.version:1.0.0}") String appVersion) {
        return new OpenAPI()
                .components(new Components()
                        .addSecuritySchemes("bearer-jwt", 
                            new SecurityScheme()
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .in(SecurityScheme.In.HEADER)
                                .name("Authorization")))
                .info(new Info()
                        .title("Inteligentny Plan Lekcji API")
                        .version(appVersion)
                        .description("API dla aplikacji do inteligentnego planowania lekcji dla szkół w Polsce")
                        .termsOfService("https://example.com/terms/")
                        .license(new License().name("MIT").url("https://opensource.org/licenses/MIT")));
    }
}
