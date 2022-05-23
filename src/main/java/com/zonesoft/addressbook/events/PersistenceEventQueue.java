package com.zonesoft.addressbook.events;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;

import javax.persistence.PostPersist;
import javax.persistence.PostRemove;
import javax.persistence.PostUpdate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import com.zonesoft.addressbook.entities.Person;
import com.zonesoft.addressbook.exceptions.AddressbookException;

@Component
public class PersistenceEventQueue{
	
	private static final Logger LOGGER = LoggerFactory.getLogger(PersistenceEventQueue.class);
	private final static BlockingQueue<PersistenceEvent> queue = new LinkedBlockingQueue<>();
	
	
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
    
    @Bean
    public  BlockingQueue<PersistenceEvent> getEventQueue(){
    	return PersistenceEventQueue.queue;
    }
    
    private void addToQueue(PersistenceEvent event) {
    	LOGGER.debug("About to update queue");
    	try {
			PersistenceEventQueue.queue.offer(event,10000,TimeUnit.MILLISECONDS);
		} catch (Exception e) {
			String errorMessage = "[EXCEPTION UPDATING QUEUE] Exception = "+ e.getMessage();
			LOGGER.error(errorMessage);
			throw new AddressbookException(errorMessage);
		}
    	logQueue();
    	LOGGER.debug("Queue Update completed");
    }
    
    private void logQueue() {
    	LOGGER.debug("----------------------------- Printing Queue ----------------------------------------------");
    	Object[] events = PersistenceEventQueue.queue.toArray();
		for(int j=0; j < events.length; j++) {
			LOGGER.debug(((PersistenceEvent)events[j]).toString());
        }
        LOGGER.debug("-------------------------------------------------------------------------------------------");
    }
}
