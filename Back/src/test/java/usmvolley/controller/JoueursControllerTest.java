package usmvolley.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import usmvolley.model.Avoir;
import usmvolley.model.Categories;
import usmvolley.model.Fonctions;
import usmvolley.model.Joueurs;
import usmvolley.model.Licence;
import usmvolley.model.Users;
import usmvolley.repository.JoueursRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class JoueursControllerTest {
	
	@Mock
	JoueursRepository joueurRepo;
	
	@Autowired
	MockMvc mockMvc;
	
	@Autowired
	private ObjectMapper objectMapper;

	JacksonTester<Joueurs> joueurJacksonTester;
	
	@Before
	public void setUp() {
		JacksonTester.initFields(this, objectMapper);
	}

	@Test
	@WithMockUser(roles={"Bureau"})
	public void testGetListeJoueurs() {
		given(joueurRepo.findAll()).willReturn(new ArrayList<>());

		List<Joueurs> joueurs = joueurRepo.findAll();

		assertThat(joueurs).isNotNull();
	}

	@Test
	@WithMockUser(roles={"Bureau"})
	public void testGetUnJoueur() throws Exception {
		when(this.joueurRepo.findById(9)).thenReturn(Optional.ofNullable(new Joueurs(9, "LONDEIX", "Matthieu", null, null, null, null, null, null, null, null, null, null, null, null, null)));

		this.mockMvc.perform(get("/joueurs/get/unJoueur/9")).andExpect(status().isOk())
				.andExpect(jsonPath("nom").value("LONDEIX")).andExpect(jsonPath("prenom").value("Matthieu"));
	}


	@Test
	@WithMockUser(roles={"Bureau"})
	public void testGetJoueurByNom() throws Exception {
		when(this.joueurRepo.findJoueurByNom("ANDRE")).thenReturn(Optional.of(new Joueurs(0, "ANDRE", "Emmanuel", null, null, null, null, null, null, null, null, null, null, null, null, null)));

		this.mockMvc.perform(get("/joueurs/get/byJoueur/ANDRE")).andExpect(status().isOk())
				.andExpect(jsonPath("nom").value("ANDRE")).andExpect(jsonPath("prenom").value("Emmanuel"));
	}

	@Test
	@WithMockUser(roles={"Bureau"})
	public void testAddJoueur() throws Exception {		
		Joueurs joueur = new Joueurs(0, "Toto", "Test", "Andro", "123", 22, "rue lointaine", 99999, "Fort-Fort", "mm@mm.fr", "00.00.00.00.01", "", new Date(2019-01-29),
				new Users(0, "username", "mdp", null), 
				new Avoir(0, 2019, true, 
						new Licence(0, "12233", 90.00, 
								new Categories(1, "M11", 11), "formulaire", "certificat", true, "102938", 90.00)), null);
		System.out.println(joueur);
		
		when(this.joueurRepo.save(any())).thenReturn(joueur);

		String jsonContent = joueurJacksonTester.write(joueur).getJson();
		System.out.println(jsonContent);

		this.mockMvc.perform(post("/joueurs/create").contentType(MediaType.APPLICATION_JSON_UTF8).content(jsonContent))
				.andExpect(status().isCreated()).andExpect(jsonPath("nom").value(joueur.getNom()))
				.andExpect(jsonPath("prenom").value(joueur.getPrenom()));
	}

	@Test
	@WithMockUser(roles={"Bureau"})
	public void testDeleteJoueur() throws Exception {
		
//		doNothing().when(this.joueurRepo).deleteById(1);
		
		this.mockMvc.perform(delete("/joueurs/delete/10")).andExpect(status().isOk());
		
		joueurRepo.findById(10);
		assertTrue(Optional.empty() != null);
		
	}

	@Test
	@WithMockUser(roles={"Bureau"})
	public void testUpdateJoueur() throws Exception {
		Joueurs joueur = new Joueurs(4, "GUERIN", "Julie", "Féminin", "123", 1, "chemin des gassinieres", 33380, "MIOS", "jujuly69@free.fr", "607193344", "", new Date(1989-01-29),
				new Users(4, "jujuly69@free.fr", "$2a$10$gu0/JMAOkR8H2Gwqp57BVuhqSZ00ztEDkuty5cFUZ7o.DVS8Gtudu", new Fonctions(1, "licencie")), 
				new Avoir(4, 2018, true, 
						new Licence(4, "1839663", 90.00, 
								new Categories(6, "Adultes", 80), "formulaire", "certificat", true, "102938", 90.00)), null);
		
		when(this.joueurRepo.save(any())).thenReturn(joueur);

		String jsonContent = joueurJacksonTester.write(joueur).getJson();
		System.out.println(jsonContent);

		this.mockMvc.perform(put("/joueurs/update/4").contentType(MediaType.APPLICATION_JSON_UTF8).content(jsonContent))
				.andExpect(status().isOk())
				.andExpect(jsonPath("nom").value(joueur.getNom()))
				.andExpect(jsonPath("taille").value(joueur.getTaille()));
	}

}
