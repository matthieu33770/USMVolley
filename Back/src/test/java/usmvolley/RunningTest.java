package usmvolley;

import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import usmvolley.service.UserService;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class RunningTest {

	@Test
	public void test(){
		ConfigurableApplicationContext context= SpringApplication.run(UsmVolleyTestApplication.class);
		assertTrue(context.isRunning());
		context.close();
	}

//@RunWith(SpringRunner.class)
//@DataJpaTest
//@AutoConfigureMockMvc
//@AutoConfigureTestDatabase(replace = Replace.NONE)
//public class RunningTest {
//	
////	@Autowired
////	UserService userService;
//
//	@Test
//	public void test(){
//		ConfigurableApplicationContext context= SpringApplication.run(UsmVolleyTestApplicationTests.class);
//		assertTrue(context.isRunning());
//		context.close();
//	}
	
	
}