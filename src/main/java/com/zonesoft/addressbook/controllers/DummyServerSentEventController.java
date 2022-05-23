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
import reactor.core.publisher.FluxSink;

@RestController
public class DummyServerSentEventController {

	private static final Logger LOGGER = LoggerFactory.getLogger(DummyServerSentEventController.class);

	@GetMapping(path = "/sse/tryout-with-create", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	public Flux<DummyEntity> sseTryoutWithCreate() {
		LOGGER.debug("[SSE-CONTROLLER] sseTryoutWithCreate");

		Flux<DummyEntity> dummyFlux = Flux.create((FluxSink<DummyEntity> sink) -> {
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
		return dummyFlux;
	}

	@GetMapping(path = "/sse/tryout-with-generate", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	public Flux<DummyEntity> sseTryoutWithGenerate() {
		LOGGER.debug("[SSE-CONTROLLER] sseTryoutWithGenerate");

		Flux<DummyEntity> dummyFlux = Flux.generate((sink) -> {
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
		return dummyFlux;
	}

	@GetMapping(path = "/sse/tryout-with-interval", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	public Flux<DummyEntity> sseTryouWithInterval() {
		LOGGER.debug("[SSE-CONTROLLER] sseTryouWithInterval");
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
