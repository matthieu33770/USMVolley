package usmvolley.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.sql.Date;
import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import usmvolley.model.Avoir;
import usmvolley.model.Categories;
import usmvolley.model.Fonctions;
import usmvolley.model.Joueurs;
import usmvolley.model.Licence;
import usmvolley.model.Users;


@RunWith(SpringRunner.class)
@DataJpaTest
@SpringBootTest(classes=JoueursRepository.class)
public class JoueursRepositoryTest {
	
	@Autowired
	private JoueursRepository joueursRepo;

	@Autowired
	private TestEntityManager testEntityManager;
	
	@Test
	public void findJoueurByUserTest() throws Exception {
		Joueurs savedJoueur = testEntityManager.persistFlushFind(new Joueurs(4, "GUERIN", "Julie", "Féminin", "123", 1, "chemin des gassinieres", 33380, "MIOS", "jujuly69@free.fr", "607193344", "", new Date(1989-01-29),
				new Users(4, "jujuly69@free.fr", "$2a$10$gu0/JMAOkR8H2Gwqp57BVuhqSZ00ztEDkuty5cFUZ7o.DVS8Gtudu", new Fonctions(1, "licencie")), 
				new Avoir(4, 2018, true, 
						new Licence(4, "1839663", 90.00, 
								new Categories(6, "Adultes", 80), "formulaire", "certificat", true, "102938", 90.00)), null));
		Joueurs joueurTest = this.joueursRepo.findJoueurByUser(new Users(4, "jujuly69@free.fr", "$2a$10$gu0/JMAOkR8H2Gwqp57BVuhqSZ00ztEDkuty5cFUZ7o.DVS8Gtudu", new Fonctions(1, "licencie")));
		assertThat(joueurTest.getNom()).isEqualTo(savedJoueur.getNom());
		assertThat(joueurTest.getPrenom()).isEqualTo(savedJoueur.getPrenom());
	}
	
	@Test
	public void findJoueurByNomTest() throws Exception {
		Joueurs savedJoueur = testEntityManager.persistFlushFind(new Joueurs(9, "LONDEIX", "Matthieu", null, null, null, null, null, null, null, null, null, null, null, null, null));
		Optional<Joueurs> joueurTest = this.joueursRepo.findJoueurByNom("LONDEIX");
		assertThat(joueurTest.get().getNom()).isEqualTo(savedJoueur.getNom());
		assertThat(joueurTest.get().getPrenom()).isEqualTo(savedJoueur.getPrenom());
	}

}
