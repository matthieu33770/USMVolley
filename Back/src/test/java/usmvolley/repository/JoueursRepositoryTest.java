package usmvolley.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;

import usmvolley.model.Fonctions;
import usmvolley.model.Joueurs;
import usmvolley.model.Users;


@RunWith(SpringRunner.class)
@DataJpaTest
@SpringBootTest
public class JoueursRepositoryTest {
	
	@Autowired
	private JoueursRepository joueursRepo;

	@Autowired
	private TestEntityManager testEntityManager;
	
	@Test
	@WithMockUser(authorities="Bureau")
	public void findJoueurByUserTest() throws Exception {
		Joueurs joueur = joueursRepo.findJoueurByUser(new Users(9, "", "", new Fonctions(3, "Bureau")));
		
		assertThat(joueur.getIdJoueur()).isEqualTo(9);
	}
	
	@Test
	@WithMockUser(authorities="Bureau")
	public void findJoueurByNomTest() throws Exception {
		Optional<Joueurs> joueur = joueursRepo.findJoueurByNom("LONDEIX");
		
		assertThat(joueur.get()).isEqualTo(joueur);
	}

}
