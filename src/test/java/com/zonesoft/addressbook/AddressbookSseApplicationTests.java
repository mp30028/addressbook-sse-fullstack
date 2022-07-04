package com.zonesoft.addressbook;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.zonesoft.addressbook.configurations.ApplicationStartupConfigs;

@SpringBootTest
class AddressbookSseApplicationTests {

	@MockBean
	private ApplicationStartupConfigs startupConfigs;
	
	@Test
	void contextLoads() {
	}

}
