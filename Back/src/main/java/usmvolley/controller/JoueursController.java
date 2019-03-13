package usmvolley.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import usmvolley.model.Joueurs;
import usmvolley.model.Users;
import usmvolley.repository.JoueursRepository;

@RestController
@RequestMapping("/joueurs")
@CrossOrigin("http://localhost:4200")
public class JoueursController {

	@Autowired
	private JoueursRepository joueursRepo;
	
	/**
	 * Methode Voir tous les joueurs
	 * @return liste de tous les joueurs
	 */
	@GetMapping("/get/joueurs")
	public ResponseEntity<List<Joueurs>> getListeJoueurs() {
		
		List<Joueurs> listeJoueurs = null;
		
		try {
			listeJoueurs = joueursRepo.findAll();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(listeJoueurs);
	}
	
	/**
	 * Methode Voir un joueur
	 * @return liste un joueur
	 */
	@GetMapping("/get/unJoueur/{idJoueur}")
	public ResponseEntity<?> getUnJoueur(@PathVariable Integer idJoueur) {
		
		Optional<Joueurs> joueur = null;
		
		try {
			joueur = joueursRepo.findById(idJoueur);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if (joueur == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(joueur);
	}
	
	/**
	 * Methode Voir un joueur
	 * @return liste un joueur selon son nom
	 */
	@GetMapping("/get/byJoueur/{nom}")
	public ResponseEntity<?> getJoueurByNom(@PathVariable String nom) {
		
		Optional<Joueurs> joueur = null;
		
		try {
			joueur = joueursRepo.findJoueurByNom(nom);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if (joueur == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(joueur);
	}
	
	/**
	 * Methode Voir un joueur
	 * @return liste un joueur selon son sex
	 */
	@GetMapping("/get/byJoueur/{sexe}")
	public ResponseEntity<?> getJoueurBySexe(@PathVariable String sexe) {
		
		Optional<Joueurs> joueur = null;
		
		try {
			joueur = joueursRepo.findJoueurBySexe(sexe);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if (joueur == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(joueur);
	}
	
	/**
	 * Methode CREATE
	 * @param information joueur
	 * @return ajoute un joueur
	 */
	@PostMapping("/create")
	public ResponseEntity<?> addJoueur(@RequestBody Joueurs joueur) {
		
		Joueurs newJoueur = null;
		String nomJoueur = joueur.getNom();
		String prenomJoueur = joueur.getPrenom();
		Integer numeroAdresseJoueur = joueur.getNumeroAdresse();
		String rueJoueur = joueur.getRue();
		Integer codePostalJoueur = joueur.getCodePostal();
		String villeJoueur = joueur.getVille();
		String mailJoueur = joueur.getMail();
		String telephone1Joueur = joueur.getTelephone1();
		String telephone2Joueur = joueur.getTelephone2();
		Date dateJoueur = joueur.getDateNaissance();
		Users userJoueur = joueur.getUser();
		
		if ((nomJoueur == null) || (nomJoueur.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le nom du joueur");
		}
		if ((prenomJoueur == null) || (prenomJoueur.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le prenom du joueur");
		}
		if (numeroAdresseJoueur == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le numéro de la rue");
		}
		if ((rueJoueur == null) || (rueJoueur.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le nom de la rue");
		}
		if (codePostalJoueur == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le code postal");
		}
		if ((villeJoueur == null) || (villeJoueur.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque la ville");
		}
		if ((mailJoueur == null) || (mailJoueur.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le mail");
		}
		if ((telephone1Joueur == null) || (telephone1Joueur.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le numérode telephone 1");
		}
		if ((telephone2Joueur == null) || (telephone2Joueur.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le numérode telephone 2");
		}
		if (dateJoueur == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque la date de naissance");
		}
		if (userJoueur == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque l'identifiant");
		}
	
		newJoueur = joueursRepo.save(joueur);
		return ResponseEntity.status(HttpStatus.CREATED).body(newJoueur);
	}
	
	/**
	 * Methode DELETE
	 * @param idJoueur
	 * @return supprime un joueur
	 */
	@DeleteMapping("/delete/{idJoueur}")
	public ResponseEntity<?> deleteUser(@PathVariable Integer idJoueur)
	{
		try
		{
			joueursRepo.deleteById(idJoueur);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}
	
	/**
	 * Methode UPDATE
	 * @param information joueur et idJoueur
	 * @return modifie un joueur
	 */
	@PutMapping("/update/{idJoueur}")
	public ResponseEntity<?> updateJoueur(@RequestBody Joueurs joueur, @PathVariable Integer idJoueur) throws Exception
	{
		Joueurs modificationJoueur = null;
		String nomJoueur = joueur.getNom();
		String prenomJoueur = joueur.getPrenom();
		Integer numeroAdresseJoueur = joueur.getNumeroAdresse();
		String rueJoueur = joueur.getRue();
		Integer codePostalJoueur = joueur.getCodePostal();
		String villeJoueur = joueur.getVille();
		String mailJoueur = joueur.getMail();
		String telephone1Joueur = joueur.getTelephone1();
		String telephone2Joueur = joueur.getTelephone2();
		Date dateJoueur = joueur.getDateNaissance();
		Users userJoueur = joueur.getUser();
		
		if ((nomJoueur == null) || (nomJoueur.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le nom du joueur");
		}
		if ((prenomJoueur == null) || (prenomJoueur.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le prenom du joueur");
		}
		if (numeroAdresseJoueur == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le numéro de la rue");
		}
		if ((rueJoueur == null) || (rueJoueur.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le nom de la rue");
		}
		if (codePostalJoueur == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le code postal");
		}
		if ((villeJoueur == null) || (villeJoueur.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque la ville");
		}
		if ((mailJoueur == null) || (mailJoueur.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le mail");
		}
		if ((telephone1Joueur == null) || (telephone1Joueur.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le numérode telephone 1");
		}
		if ((telephone2Joueur == null) || (telephone2Joueur.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le numérode telephone 2");
		}
		if (dateJoueur == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque la date de naissance");
		}
		if (userJoueur == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque l'identifiant");
		}
		
		try
		{
			modificationJoueur = joueursRepo.save(joueur);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(modificationJoueur);
	}
}
