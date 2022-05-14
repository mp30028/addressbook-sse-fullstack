package com.zonesoft.addressbook;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.reactive.config.EnableWebFlux;
import org.springframework.web.reactive.config.WebFluxConfigurer;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

@SpringBootApplication
@Configuration
@EnableWebFlux
public class AddressbookApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(AddressbookApiApplication.class, args);
	}

//	@Bean
//	public WebFluxConfigurer corsConfigurer() {
//		return new WebFluxConfigurer() {
//			public void addCorsMappings(CorsRegistry registry) {
//				registry.addMapping("/**").allowedOrigins("http://localhost:3000");
//			}
//		};
//	}
	
	@Bean
	RouterFunction<ServerResponse> staticResourceRouter(){
	    return RouterFunctions.resources("/**", new ClassPathResource("static/"));
	}
	
}
