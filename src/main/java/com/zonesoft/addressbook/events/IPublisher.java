package com.zonesoft.addressbook.events;

import reactor.core.publisher.SynchronousSink;

public interface IPublisher<T> {
	public void publish(SynchronousSink<PersistenceEvent> sink);
}
