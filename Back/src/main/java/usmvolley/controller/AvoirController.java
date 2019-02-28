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

import usmvolley.model.Avoir;
import usmvolley.repository.AvoirRepository;

@RestController
@RequestMapping("/avoir")
@CrossOrigin("http://localhost:4200")
public class AvoirController {

	@Autowired
	private AvoirRepository avoirRepo;
	
	/**
	 * Methode Voir tout Avoir
	 * @return liste de tout Avoir
	 */
	@GetMapping("/get/avoir")
	public ResponseEntity<List<Avoir>> getListeAvoir() {
		
		List<Avoir> listeAvoir = null;
		
		try {
			listeAvoir = avoirRepo.findAll();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(listeAvoir);
	}
	
	/**
	 * Methode Voir un Avoir
	 * @return liste un Avoir
	 */
	@GetMapping("/get/unAvoir/{idAvoir}")
	public ResponseEntity<?> getUnAvoir(@PathVariable Integer idAvoir) {
		
		Optional<Avoir> avoir = null;
		
		try {
			avoir = avoirRepo.findById(idAvoir);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if (avoir == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(avoir);
	}
	
	/**
	 * Methode CREATE
	 * @param information avoir
	 * @return ajoute un avoir
	 */
	@PostMapping("/create")
	public ResponseEntity<?> addAvoir(@RequestBody Avoir avoir) {
		
		Avoir newAvoir = null;
		Integer anneeAvoir = avoir.getAnneeAvoir();
		
		if (anneeAvoir == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque l'année");
		}
		
		newAvoir = avoirRepo.save(avoir);
		return ResponseEntity.status(HttpStatus.CREATED).body(newAvoir);
	}
	
	/**
	 * Methode DELETE
	 * @param idAvoir
	 * @return supprime un avoir
	 */
	@DeleteMapping("/delete/{idAvoir}")
	public ResponseEntity<?> deleteAvoir(@PathVariable Integer idAvoir)
	{
		try
		{
			avoirRepo.deleteById(idAvoir);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}
	
	/**
	 * Methode UPDATE
	 * @param information Avoir et idAvoir
	 * @return modifie un Avoir
	 */
	@PutMapping("/update/{idAvoir}")
	public ResponseEntity<?> updateAvoir(@RequestBody Avoir avoir, @PathVariable Integer idAvoir) throws Exception
	{
		
		Avoir modificationAvoir = null;
		Integer anneeAvoir = avoir.getAnneeAvoir();
		
		if (anneeAvoir == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque l'année");
		}
		
		try
		{
			modificationAvoir = avoirRepo.save(avoir);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(modificationAvoir);
	}
}
