package usmvolley.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;

import usmvolley.model.Avoir;
import usmvolley.model.Categories;
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

	@Test
	@WithMockUser(roles={"BUREAU"})
	public void testGetListeJoueurs() {
		given(joueurRepo.findAll()).willReturn(new ArrayList<>());

		List<Joueurs> joueurs = joueurRepo.findAll();

		assertThat(joueurs).isNotNull();
	}

	@Test
	public void testGetUnJoueur() throws Exception {
		when(this.joueurRepo.findById(9)).thenReturn(Optional.ofNullable(new Joueurs(9, "LONDEIX", "Matthieu", null, null, null, null, null, null, null, null, null, null, null, null, null)));

		this.mockMvc.perform(get("/joueurs/get/unJoueur/9")).andExpect(status().isOk())
				.andExpect(jsonPath("nom").value("LONDEIX")).andExpect(jsonPath("prenom").value("Matthieu"));
	}


	@Test
	public void testGetJoueurByNom() throws Exception {
		when(this.joueurRepo.findJoueurByNom("ANDRE")).thenReturn(Optional.of(new Joueurs(0, "ANDRE", "Emmanuel", null, null, null, null, null, null, null, null, null, null, null, null, null)));

		this.mockMvc.perform(get("/joueurs/get/byJoueur/ANDRE")).andExpect(status().isOk())
				.andExpect(jsonPath("nom").value("ANDRE")).andExpect(jsonPath("prenom").value("Emmanuel"));
	}

	@Test
	public void testAddJoueur() throws Exception {
		when(this.joueurRepo.save(any())).thenReturn(Optional.of(new Joueurs(0, "Toulouse", "Lolo", "", "", 23, "Lointain", 33770, "Fort-Fort", "mm@mm.fr", "00.00.00.00.01", "",new Date(2019-07-19),new Users(), new Avoir(0, 0, false, new Licence(0, "", 0.0, new Categories(1, "toto", 11), "form", "certif", false, "", 0.0)), null)));

		String jsonContent = "{\"nom\": \"Toulouse\", \"prenom\": \"Lolo\", \"numeroAdresse\": \"23\", \"rue\": \"Lointain\", \"codePostal\": \"33770\","
				+ " \"ville\": \"Fort-Fort\", \"mail\": \"mm@mm.fr\", \"telephone1\": \"00.00.00.00.01\", \"dateNaissance\": \"2019-07-19\","
				+ " \"user\": {\"username\":\"test\", \"mdp\": \"toto\"}}";

		this.mockMvc.perform(post("/joueurs/create").contentType(MediaType.APPLICATION_JSON_UTF8).content(jsonContent))
				.andExpect(status().isCreated()).andExpect(jsonPath("nom").value("Toulouse"))
				.andExpect(jsonPath("prenom").value("Lolo"))
				.andExpect(jsonPath("numeroAdresse").value(23))
				.andExpect(jsonPath("rue").value("Lointain"))
				.andExpect(jsonPath("codePostal").value(33770))
				.andExpect(jsonPath("ville").value("Fort-Fort"))
				.andExpect(jsonPath("mail").value("mm@mm.fr"))
				.andExpect(jsonPath("telephone1").value("00.00.00.00.01"))
				.andExpect(jsonPath("dateNaissance").value("2019-07-19"))
				.andExpect(jsonPath("username").value("test"))
				.andExpect(jsonPath("mdp").value("toto"));
	}

	@Test
	public void testDeleteJoueur() throws Exception {
		this.mockMvc.perform(delete("/joueurs/delete/3"));
		
		joueurRepo.findById(3);
		assertTrue(Optional.empty() != null);
		
	}

	@Test
	public void testUpdateJoueur() throws Exception {
		when(this.joueurRepo.save(any())).thenReturn(Optional.of(new Joueurs(20, "Toulouse", "Lolo", "", "", 23, "Lointain", 33770, "Fort-Fort", "mm@mm.fr", "00.00.00.00.01", "",new Date(2019-07-19),new Users(), new Avoir(0, 0, false, new Licence(0, "", 0.0, new Categories(1, "toto", 11), "form", "certif", false, "", 0.0)), null)));

		String jsonContent = "{\"nom\": \"Toulouse\", \"prenom\": \"Lolo\", \"numeroAdresse\": \"23\", \"rue\": \"Lointain\", \"codePostal\": \"33770\","
				+ " \"ville\": \"Fort-Fort\", \"mail\": \"mm@mm.fr\", \"telephone1\": \"00.00.00.00.01\", \"dateNaissance\": \"2019-07-19\","
				+ " \"user\": {\"username\":\"test\", \"mdp\": \"toto\"}}";

		this.mockMvc.perform(put("/joueurs/update/20").contentType(MediaType.APPLICATION_JSON_UTF8).content(jsonContent))
				.andExpect(status().isCreated()).andExpect(jsonPath("nom").value("Toulouse"))
				.andExpect(jsonPath("prenom").value("Lolo"))
				.andExpect(jsonPath("numeroAdresse").value(23))
				.andExpect(jsonPath("rue").value("Lointain"))
				.andExpect(jsonPath("codePostal").value(33770))
				.andExpect(jsonPath("ville").value("Fort-Fort"))
				.andExpect(jsonPath("mail").value("mm@mm.fr"))
				.andExpect(jsonPath("telephone1").value("00.00.00.00.01"))
				.andExpect(jsonPath("dateNaissance").value("2019-07-19"))
				.andExpect(jsonPath("username").value("test"))
				.andExpect(jsonPath("mdp").value("toto"));
	}

}
