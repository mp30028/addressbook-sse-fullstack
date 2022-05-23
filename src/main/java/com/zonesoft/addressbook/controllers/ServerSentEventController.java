package com.zonesoft.addressbook.controllers;

import com.zonesoft.addressbook.events.IPublisher;
import com.zonesoft.addressbook.events.PersistenceEvent;
//import com.zonesoft.addressbook.events.PersistenceEventData;
//import com.zonesoft.addressbook.events.PersistenceEventType;
//import com.zonesoft.addressbook.exceptions.AddressbookException;

//import java.util.Objects;
//import java.util.concurrent.BlockingQueue;
//import java.util.concurrent.TimeUnit;

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
	private static IPublisher<PersistenceEvent> publisher;
	private static Flux<PersistenceEvent> persistenceEventFlux;
    
    @Autowired
	public ServerSentEventController(IPublisher<PersistenceEvent> publisher) {
    	ServerSentEventController.publisher = publisher;
    	ServerSentEventController.persistenceEventFlux = initializeflux();
    }
    
	private Flux<PersistenceEvent> initializeflux() {
		Flux<PersistenceEvent> eventFlux = Flux.generate((sink) -> {
			publisher.publish(sink);
		});
		return eventFlux.share();
	}
    
	@GetMapping(path = "/sse/addressbook", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	public Flux<PersistenceEvent> addressbook() {
		LOGGER.debug("[SSE-CONTROLLER] sse/addressbook");
		return ServerSentEventController.persistenceEventFlux;
	}

}
