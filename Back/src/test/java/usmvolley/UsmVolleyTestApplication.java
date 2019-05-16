package usmvolley;

import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.mockito.BDDMockito.given;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;

import usmvolley.model.Joueurs;
import usmvolley.repository.JoueursRepository;
import usmvolley.service.UserService;

@RunWith(SpringRunner.class)
@DataJpaTest
@SpringBootTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class UsmVolleyTestApplication {
	 
	@Mock
	JoueursRepository joueurRepo;

	@Test
	@WithMockUser(roles={"BUREAU"})
	public void testGetListeJoueurs() {
		given(joueurRepo.findAll()).willReturn(new ArrayList<>());

//		List<Joueurs> joueurs = joueurRepo.findAll();

//		assertThat(joueurs).isNotNull();
	}
}
