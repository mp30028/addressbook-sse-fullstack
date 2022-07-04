package com.zonesoft.addressbook.repositories;

import java.util.concurrent.atomic.AtomicBoolean;

import org.testcontainers.containers.MySQLContainer;

@SuppressWarnings({ "rawtypes", "deprecation" })
abstract class AbstractMySqlContainer extends MySQLContainer<AbstractMySqlContainer> {
	private static final String IMAGE_NAME = "mysql:8.0.19";

    static final MySQLContainer MYSQL_CONTAINER;

    static {
    	MYSQL_CONTAINER = new MySQLContainer(IMAGE_NAME)
    			.withDatabaseName("addressbook");
        MYSQL_CONTAINER.start();
    }
    
    private static AtomicBoolean started = new AtomicBoolean(false);

    @Override
    public void start() {
        // only allow a single start()
        if (started.compareAndSet(false, true)) {
            super.start();
        }
    }

    @Override
    public void stop() {
        // Do nothing
    }  

    
}
