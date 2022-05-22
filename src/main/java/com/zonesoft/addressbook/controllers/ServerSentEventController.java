package com.zonesoft.addressbook.controllers;

import com.zonesoft.addressbook.events.PersistenceEvent;
import com.zonesoft.addressbook.events.PersistenceEventData;
import com.zonesoft.addressbook.events.PersistenceEventType;
import com.zonesoft.addressbook.exceptions.AddressbookException;

import java.util.Objects;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.TimeUnit;

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
	private static BlockingQueue<PersistenceEvent> eventQueue;
    
    @Autowired
	public ServerSentEventController(BlockingQueue<PersistenceEvent> eventQueue) {
    	ServerSentEventController.eventQueue = eventQueue;
    }

	@GetMapping(path = "/sse/addressbook", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	public Flux<PersistenceEvent> persons() {
		LOGGER.debug("[SSE-CONTROLLER] sse/addressbook");
		Flux<PersistenceEvent> eventFlux = Flux.generate((sink) -> {
			PersistenceEvent event = null;
			try {
				event = ServerSentEventController.eventQueue.poll(10000,TimeUnit.MILLISECONDS);
				LOGGER.debug("[Flux.generate] Event read from eventQueue by lambda passed in to Flux.generate() = {}",event);
			} catch (InterruptedException e) {
				String errorMessage = "[EXCEPTION Flux.generate] Event read from eventQueue by lambda passed in to Flux.generate() failed with the following exception = "+ e.getMessage();
				LOGGER.error(errorMessage);
				throw new AddressbookException(errorMessage);
			}
			if(Objects.nonNull(event)) {
				sink.next(event);
			}else {
				PersistenceEventData emptyEventData = new PersistenceEventData(PersistenceEventType.EMPTY, null);
				PersistenceEvent emptyEvent = new PersistenceEvent(emptyEventData);
				sink.next(emptyEvent);
			}
		});
		return eventFlux;
	}
}
