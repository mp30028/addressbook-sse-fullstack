package com.zonesoft.addressbook.configurations;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.reactive.config.CorsRegistry;
import org.springframework.web.reactive.config.EnableWebFlux;
import org.springframework.web.reactive.config.WebFluxConfigurer;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;

import com.zonesoft.addressbook.events.PersistenceEventPublisher;

@Configuration
@EnableWebFlux
public class ApplicationStartupConfigs {
	private static final Logger LOGGER = LoggerFactory.getLogger(ApplicationStartupConfigs.class);
	
    @EventListener
    public void onApplicationEvent(ContextRefreshedEvent event) {
    	LOGGER.info("[ApplicationStartupConfigs.onApplicationEvent] event ={}", event);
    	PersistenceEventPublisher.persistenceEventFlux().subscribe();
    }
    
	@Bean
	public WebFluxConfigurer corsConfigurer() {
		return new WebFluxConfigurer() {
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("http://localhost:8081","http://localhost:3000" );
//				registry.addMapping("/**").allowedOrigins("http://localhost:3000");
			}
		};
	}
	
	@Bean
	RouterFunction<ServerResponse> staticResourceRouter(){
	    return RouterFunctions.resources("/**", new ClassPathResource("static/"));
	}
}
