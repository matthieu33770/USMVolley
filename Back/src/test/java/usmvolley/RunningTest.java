package usmvolley;

import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class RunningTest {
	
	@Test
	public void test(){
		ConfigurableApplicationContext context= SpringApplication.run(UsmVolleyTestApplication.class);
		assertTrue(context.isRunning());
		context.close();
	}

}
