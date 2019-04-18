package usmvolley;


import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.fail;
import static org.mockito.BDDMockito.given;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import usmvolley.model.Joueurs;
import usmvolley.model.Users;
import usmvolley.repository.JoueursRepository;
import usmvolley.service.UserService;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureMockMvc
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class UsmVolleyTestApplicationTests {

//	@Autowired
//	private TestRestTemplate restTemplate;
	
	@Mock
	JoueursRepository joueurRepo;
	
	@Autowired
	MockMvc mockMvc;

	@Test
	@WithMockUser(roles={"BUREAU"})
	public void testGetListeJoueurs() {
		given(joueurRepo.findAll()).willReturn(new ArrayList<>());

		List<Joueurs> joueurs = joueurRepo.findAll();

		assertThat(joueurs).isNotNull();
	}
}
