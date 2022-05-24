package com.zonesoft.addressbook.controllers;

import com.zonesoft.addressbook.events.PersistenceEvent;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
public class ServerSentEventController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ServerSentEventController.class);
	private static Flux<PersistenceEvent> persistenceEventFlux;
    
    @Autowired
    public ServerSentEventController(Flux<PersistenceEvent> persistenceEventFlux) {
    	ServerSentEventController.persistenceEventFlux = persistenceEventFlux;
    }

	@GetMapping(path = "/sse/addressbook", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	public Flux<PersistenceEvent> addressbook() {
		LOGGER.debug("[SSE-CONTROLLER] sse/addressbook");
		return ServerSentEventController.persistenceEventFlux;
	}

}
