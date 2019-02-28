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

import usmvolley.model.Horaire;
import usmvolley.repository.HoraireRepository;

@RestController
@RequestMapping("/horaires")
@CrossOrigin("http://localhost:4200")
public class HoraireController {
	
	@Autowired
	private HoraireRepository horairesRepo;
	
	/**
	 * Methode Voir tous les horaires
	 * @return liste de tous les horaires
	 */
	@GetMapping("/get/horaires")
	public ResponseEntity<List<Horaire>> getListeHoraires() {
		
		List<Horaire> listeHoraires = null;
		
		try {
			listeHoraires = horairesRepo.findAll();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(listeHoraires);
	}
	
	/**
	 * Methode Voir un horaire
	 * @return liste un horaire
	 */
	@GetMapping("/get/unHoraire/{idHoraire}")
	public ResponseEntity<?> getUnHoraire(@PathVariable Integer idHoraire) {
		
		Optional<Horaire> horaire = null;
		
		try {
			horaire = horairesRepo.findById(idHoraire);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if (horaire == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(horaire);
	}
	
	/**
	 * Methode CREATE
	 * @param information horaire
	 * @return ajoute un horaire
	 */
	@PostMapping("/create")
	public ResponseEntity<?> addHoraire(@RequestBody Horaire horaire) {
		
		Horaire newHoraire = null;
		Date dateHoraire = horaire.getDateHoraire();
		Integer heureHoraire = horaire.getHeureHoraire();
		
		if (dateHoraire == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque la disponibilité du joueur");
		}
		if (heureHoraire == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque la disponibilité du joueur");
		}
		
		newHoraire = horairesRepo.save(horaire);
		return ResponseEntity.status(HttpStatus.CREATED).body(newHoraire);
	}
	
	/**
	 * Methode DELETE
	 * @param idHoraire
	 * @return supprime horaire
	 */
	@DeleteMapping("/delete/{idHoraires}")
	public ResponseEntity<?> deleteHoraire(@PathVariable Integer idHoraire)
	{
		try
		{
			horairesRepo.deleteById(idHoraire);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}
	
	/**
	 * Methode UPDATE
	 * @param information Horaire et idHoraire
	 * @return modifie un horaire
	 */
	@PutMapping("/update/{idHoraire}")
	public ResponseEntity<?> updateHoraire(@RequestBody Horaire horaire, @PathVariable Integer idHoraire) throws Exception
	{
		
		Horaire modificationHoraire = null;
		Date dateHoraire = horaire.getDateHoraire();
		Integer heureHoraire = horaire.getHeureHoraire();
		
		if (dateHoraire == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque la disponibilité du joueur");
		}
		if (heureHoraire == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque la disponibilité du joueur");
		}
		
		try
		{
			modificationHoraire = horairesRepo.save(horaire);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(modificationHoraire);
	}
}
