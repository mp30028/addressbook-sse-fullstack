package com.zonesoft.addressbook.events;

import java.time.Instant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zonesoft.addressbook.entities.Person;

public class PersistenceEventData {
	private static final Logger LOGGER = LoggerFactory.getLogger(PersistenceEventData.class);
	private final Person person;
	private final PersistenceEventType eventType;
	private final Instant utcEventTime;
	
	public PersistenceEventData(PersistenceEventType eventType, Person person) {
		this.person = person;
		this.eventType = eventType;
		this.utcEventTime =Instant.now();
	}

	public PersistenceEventType getEventType() {
		return eventType;
	}

	public Person getPerson() {
		return person;
	}
	
	public Instant getUtcEventTime() {
		return utcEventTime;
	}

	@Override
	public String toString() {
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.findAndRegisterModules();
		String json = null;
		try {
			json = objectMapper.writeValueAsString(this);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			String message = "<EXCEPTION - whilst writing PersistenceEventData Object to JSON. " + e.getLocalizedMessage() + ">" ;
			LOGGER.error(message);
			return message;
		}
		return json;		
	}
}
