package usmvolley.controller;

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

import usmvolley.model.Inscrire;
import usmvolley.repository.CreneauRepository;

@RestController
@RequestMapping("/creneaux")
@CrossOrigin("http://localhost:4200")
public class CreneauController {
	
	@Autowired
	private CreneauRepository creneauxRepo;
	
	/**
	 * Methode Voir tous les inscrire
	 * @return liste de tous les inscrire
	 */
	@GetMapping("/get/inscrire")
	public ResponseEntity<List<Inscrire>> getListeInscrire() {
		
		List<Inscrire> listeInscrire = null;
		
		try {
			listeInscrire = creneauxRepo.findAll();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(listeInscrire);
	}
	
	/**
	 * Methode Voir un Inscrire
	 * @return liste un Inscrire
	 */
	@GetMapping("/get/unInscrire/{idInscrire}")
	public ResponseEntity<?> getUnInscrire(@PathVariable Integer idInscrire) {
		
		Optional<Inscrire> inscrire = null;
		
		try {
			inscrire = creneauxRepo.findById(idInscrire);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if (inscrire == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(inscrire);
	}
	
	/**
	 * Methode CREATE
	 * @param information Inscrire
	 * @return ajoute Inscrire
	 */
	@PostMapping("/create")
	public ResponseEntity<?> addInscrire(@RequestBody Inscrire inscrire) {
		
		Inscrire newInscrire = null;
		String disponibleInscrire = inscrire.getDisponible();
		
		if (disponibleInscrire == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque la disponibilité du joueur");
		}
		
		newInscrire = creneauxRepo.save(inscrire);
		return ResponseEntity.status(HttpStatus.CREATED).body(newInscrire);
	}
	
	/**
	 * Methode DELETE
	 * @param idInscrire
	 * @return supprime Inscrire
	 */
	@DeleteMapping("/delete/{idInscrire}")
	public ResponseEntity<?> deleteInscrire(@PathVariable Integer idInscrire)
	{
		try
		{
			creneauxRepo.deleteById(idInscrire);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}
	
	/**
	 * Methode UPDATE
	 * @param information Inscrire et idInscrire
	 * @return modifie un Inscrire
	 */
	@PutMapping("/update/{idInscrire}")
	public ResponseEntity<?> updateInscrire(@RequestBody Inscrire inscrire, @PathVariable Integer idInscrire) throws Exception
	{
		
		Inscrire modificationInscrire = null;
		String disponibleInscrire = inscrire.getDisponible();
		
		if (disponibleInscrire == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque la disponibilité du joueur");
		}
		
		try
		{
			modificationInscrire = creneauxRepo.save(inscrire);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(modificationInscrire);
	}
}
