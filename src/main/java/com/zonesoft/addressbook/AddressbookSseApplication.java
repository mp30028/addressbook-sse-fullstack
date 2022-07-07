package com.zonesoft.addressbook;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.io.ClassPathResource;
//import org.springframework.web.reactive.config.EnableWebFlux;
//import org.springframework.web.reactive.function.server.RouterFunction;
//import org.springframework.web.reactive.function.server.RouterFunctions;
//import org.springframework.web.reactive.function.server.ServerResponse;


@SpringBootApplication
//@EnableWebFlux
//@Configuration
public class AddressbookSseApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(AddressbookSseApplication.class, args);
	}
	
	
//	@Bean
//	RouterFunction<ServerResponse> staticResourceRouter(){
//	    return RouterFunctions.resources("/**{path:[^\\\\.]*}", new ClassPathResource("forward:/"));
////	    return RouterFunctions.resources("/**", new ClassPathResource("static/"));
//	}
}
