package usmvolley;


import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.fail;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import usmvolley.model.Users;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class UsmVolleyTestApplicationTests {

	@Autowired
	private TestRestTemplate restTemplate;

	@Test
	public void getUsers() {
		// When retrieving cities from /api/city
		List<?> cities = this.restTemplate.getForObject("/users/get/users", List.class);
		
		// Then a non null list should be returned
		assertThat(cities).isNotNull();
	}

//	@Test
//	public void getCityByName() {
//		// When retrieving an existing city by its name
//		ResponseEntity<Users> responseEntity = this.restTemplate.getForEntity("/api/city/{cityName}", Users.class, "paris");
//		Users paris = responseEntity.getBody();
//		
//		// Then OK status code should be sent back and 
//		// the city should be returned and should be filled with its attributes
//		assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
//		assertThat(paris.getName()).isEqualTo("Paris");
//		assertThat(paris.getDptCode()).isEqualTo(75);
//	}
//
//	@Test
//	public void getCityMonuments() {
//		// When retrieving city monuments from /api/city/{cityName}/monument
//		List<?> monuments = this.restTemplate.getForObject("/api/city/{cityName}/monument", List.class, "paris");
//		
//		// Then a non null list should be returned
//		assertThat(monuments).isNotNull();
//	}
//
//	@Test
//	public void getCityMonumentByName() {
//		fail();
//		// TODO
//	}
//
//	@Test
//	public void addCity() {
//		// Given a new valid city
//		Users toulouse = new Users("Toulouse", 31);
//		HttpEntity<Users> toulouseEntity = new HttpEntity<Users>(toulouse);
//		
//		// When posting this city to /api/city
//		ResponseEntity<Users> responseEntity = this.restTemplate.postForEntity("/api/city", toulouseEntity, Users.class);
//		Users createdToulouse = responseEntity.getBody();
//		
//		// Then OK status code should be sent back and 
//		// the created city should be returned and should be filled with its attributes
//		assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
//		assertThat(createdToulouse.getName()).isEqualTo(toulouse.getName());
//		assertThat(createdToulouse.getDptCode()).isEqualTo(toulouse.getDptCode());
//	}
//
//	@Test
//	public void addMonumentToCity() {
//		fail();
//		// TODO
//	}

}
