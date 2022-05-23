package com.zonesoft.addressbook.events;

import java.time.Instant;
import java.util.Objects;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;

import javax.persistence.PostPersist;
import javax.persistence.PostRemove;
import javax.persistence.PostUpdate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.zonesoft.addressbook.entities.Person;
import com.zonesoft.addressbook.exceptions.AddressbookException;

import reactor.core.publisher.SynchronousSink;

@Component
@EnableScheduling
public class PersistenceEventPublisher implements IPublisher<PersistenceEvent>{
	
	private static final Logger LOGGER = LoggerFactory.getLogger(PersistenceEventPublisher.class);
	private final static BlockingQueue<PersistenceEvent> queue = new LinkedBlockingQueue<>();
	private static final long MAX_ALLOWED_AGE_OF_QUEUED_ITEMS_MS = 30000;
	
	
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
    	logQueue();
    	LOGGER.debug("Queue Update completed");
    }
    
    @Scheduled(fixedDelay = 10000)
    private void checkAndRemoveAgedEvents() {
//    	LOGGER.debug("[CLEAN-UP-AGED-EVENTS] Triggered");
    	boolean isCheckToContinue = true;
    	Long currentTimevalue = Instant.now().toEpochMilli();
		do {
			PersistenceEvent event = PersistenceEventPublisher.queue.peek();
			if (Objects.nonNull(event)) {
				Long eventTimevalue = ((PersistenceEventData)event.getSource()).getUtcEventTime().toEpochMilli();
				if ((currentTimevalue - eventTimevalue) > MAX_ALLOWED_AGE_OF_QUEUED_ITEMS_MS) {
					PersistenceEventPublisher.queue.poll();
				}else {
					isCheckToContinue = false;
				}
			}else {
				isCheckToContinue = false;
			}
		} while (isCheckToContinue);
//		logQueue();
//		LOGGER.debug("[CLEAN-UP-AGED-EVENTS] Completed");
    }
    
    private void logQueue() {
    	LOGGER.debug("----------------------------- Printing Queue ----------------------------------------------");
    	Object[] events = PersistenceEventPublisher.queue.toArray();
		for(int j=0; j < events.length; j++) {
			LOGGER.debug(((PersistenceEvent)events[j]).toString());
        }
        LOGGER.debug("-------------------------------------------------------------------------------------------");
    }

	@Override
	public void publish(SynchronousSink<PersistenceEvent> sink) {
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
