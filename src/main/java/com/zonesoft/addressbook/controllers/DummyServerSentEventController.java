package com.zonesoft.addressbook.controllers;

import com.zonesoft.addressbook.entities.DummyEntity;
import java.time.Duration;
import java.util.Date;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
public class DummyServerSentEventController {

	private static final Logger LOGGER = LoggerFactory.getLogger(DummyServerSentEventController.class);

	@GetMapping(path = "/sse/test-with-generate", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	public Flux<DummyEntity> sseTestWithGenerate() {
		LOGGER.debug("[SSE-CONTROLLER] sseTestWithGenerate");

		Flux<DummyEntity> acaciaFlux = Flux.generate((sink) -> {
			Random random = new Random();
			String name = generateName();
			int a = random.nextInt(101);
			int b = random.nextInt(101);
			Date now = new Date();
			int waitSeconds = randomInt(10, 20);
			LOGGER.debug("name = {}, valueA= {}, valueB={}, date={}", name, a, b, now);
			this.wait(waitSeconds, "[WAIT-sseTestWithGenerate]");
			DummyEntity dummyEntity = new DummyEntity(name, a, b, now);
			sink.next(dummyEntity);
		});
		return acaciaFlux;
	}

	@GetMapping(path = "/sse/test-with-interval", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	public Flux<DummyEntity> sseTestWithInterval() {
		LOGGER.debug("[SSE-CONTROLLER] sseTestWithInterval");
		Random random = new Random();
		return Flux.interval(Duration.ofSeconds(1))
				.map(it -> new DummyEntity(generateName(), random.nextInt(101), random.nextInt(101), new Date()));
	}

	private static final String[] NAMES = { "SMITH", "BROWN", "WILSON", "THOMSON", "STEWART", "ROBERTSON", "CAMPBELL",
			"ANDERSON", "SCOTT", "TAYLOR", "MACDONALD", "CLARK", "MURRAY", "REID", "MORRISON", "YOUNG", "WATSON",
			"WALKER", "MITCHELL", "PATERSON", "ROSS", "GRAHAM", "MARTIN", "MILLER", "KERR", "JOHNSTON", "DAVIDSON",
			"HENDERSON", "HUNTER", "MCDONALD", "BELL", "FRASER", "HAMILTON", "GRAY", "DUNCAN", "FERGUSON", "KELLY",
			"CAMERON", "MACKENZIE", "SIMPSON", "MACLEOD", "ALLAN", "GRANT", "MCLEAN", "BLACK", "RUSSELL", "WALLACE",
			"MACKAY", "WRIGHT", "GIBSON" };

	private String generateName() {
		return NAMES[randomInt(0, NAMES.length - 1)];
	}

	private int randomInt(int min, int max) {
		return ThreadLocalRandom.current().nextInt(min, max + 1);
	}

	private void wait(int seconds, String tag) {
		LOGGER.debug("{} Started {} seconds wait. {}", tag, seconds);
		for (int j = 0; j < seconds; j++) {
			try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				LOGGER.error("Error whilst waiting: {}", e.getLocalizedMessage());
				e.printStackTrace();
			}
			LOGGER.debug(":");
		}
		LOGGER.debug("{} Finished {} seconds wait. {}", tag, seconds);
	}
}
