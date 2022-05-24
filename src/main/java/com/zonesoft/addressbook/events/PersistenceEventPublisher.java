package com.zonesoft.addressbook.events;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;

import javax.persistence.PostPersist;
import javax.persistence.PostRemove;
import javax.persistence.PostUpdate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import com.zonesoft.addressbook.entities.Person;
import com.zonesoft.addressbook.exceptions.AddressbookException;

import reactor.core.publisher.Flux;
import reactor.core.publisher.SynchronousSink;

@Component
public class PersistenceEventPublisher {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(PersistenceEventPublisher.class);
	private final static BlockingQueue<PersistenceEvent> queue = new LinkedBlockingQueue<>();
	private static Flux<PersistenceEvent> persistenceEventFlux;
    
    @Autowired
	public PersistenceEventPublisher() {
    	PersistenceEventPublisher.persistenceEventFlux = initializeflux();
    }
	
	@PostPersist
    public void afterInsert(Person person) {
        LOGGER.info("[JPA-EVENT] CREATE completed for PERSON: {} ", person.toString());
        PersistenceEventData source = new PersistenceEventData(PersistenceEventType.CREATE, person);
        addToQueue(new PersistenceEvent(source));
    }
    
    @PostUpdate
    public void afterUpdate(Person person) {
        LOGGER.info("[JPA-EVENT] UPDATE completed for PERSON: {} ", person.toString());
        PersistenceEventData source = new PersistenceEventData(PersistenceEventType.UPDATE, person);
        addToQueue(new PersistenceEvent(source));
    }    
    
    @PostRemove
    public void afterDelete(Person person) {
        LOGGER.info("[JPA-EVENT] DELETE completed for PERSON: {} ", person.toString());
        PersistenceEventData source = new PersistenceEventData(PersistenceEventType.DELETE, person);
        addToQueue(new PersistenceEvent(source));
    }
    
    private void addToQueue(PersistenceEvent event) {
    	LOGGER.debug("About to update queue");
    	try {
			PersistenceEventPublisher.queue.offer(event,10000,TimeUnit.MILLISECONDS);
		} catch (Exception e) {
			String errorMessage = "[EXCEPTION UPDATING QUEUE] Exception = "+ e.getMessage();
			LOGGER.error(errorMessage);
			throw new AddressbookException(errorMessage);
		}
    	LOGGER.debug("Queue Update completed");
    }
    
    @EventListener
    public void onApplicationEvent(ContextRefreshedEvent event) {
    	PersistenceEventPublisher.persistenceEventFlux.subscribe();
    }
    
    @Bean
    public Flux<PersistenceEvent> persistenceEventFlux(){
    	return PersistenceEventPublisher.persistenceEventFlux;
    }
    
	private Flux<PersistenceEvent> initializeflux() {
		Flux<PersistenceEvent> eventFlux = Flux.generate((sink) -> {
			this.publish(sink);
		});
		return eventFlux.share();
	}
    
	private void publish(SynchronousSink<PersistenceEvent> sink) {
		PersistenceEvent event = null;
		try {
			event = PersistenceEventPublisher.queue.take();
			LOGGER.debug("[EVENT-PUBLISH] Event read from eventQueue {}",event);
			sink.next(event);
			LOGGER.debug("[EVENT-PUBLISH] Read event pulished to sink {}",event);
		} catch (InterruptedException e) {
			String errorMessage = "[EXCEPTION EVENT-PUBLISH] Event read from eventQueue failed with the following exception = "+ e.getMessage();
			LOGGER.error(errorMessage);
			throw new AddressbookException(errorMessage);
		}		
	}
}
