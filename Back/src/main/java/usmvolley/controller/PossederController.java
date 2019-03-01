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

import usmvolley.model.Posseder;
import usmvolley.repository.PossederRepository;

@RestController
@RequestMapping("/posseder")
@CrossOrigin("http://localhost:4200")
public class PossederController {

	@Autowired
	private PossederRepository possederRepo;
	
	/**
	 * Methode Voir tous les posseder
	 * @return liste de tous les posseder
	 */
	@GetMapping("/get/posseder")
	public ResponseEntity<List<Posseder>> getListePosseder() {
		
		List<Posseder> listePosseder = null;
		
		try {
			listePosseder = possederRepo.findAll();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(listePosseder);
	}
	
	/**
	 * Methode Voir un posseder
	 * @return liste un posseder
	 */
	@GetMapping("/get/unPosseder/{idPosseder}")
	public ResponseEntity<?> getUnPosseder(@PathVariable Integer idPosseder) {
		
		Optional<Posseder> posseder = null;
		
		try {
			posseder = possederRepo.findById(idPosseder);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if (posseder == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(posseder);
	}
	
	/**
	 * Methode CREATE
	 * @param information posseder
	 * @return ajoute posseder
	 */
	@PostMapping("/create")
	public ResponseEntity<?> addPosseder(@RequestBody Posseder posseder) {
		
		Posseder newPosseder = null;
		String saisonPosseder = posseder.getSaison();
		
		if ((saisonPosseder == null) || (saisonPosseder.isEmpty())){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque la saison");
		}
		
		newPosseder = possederRepo.save(posseder);
		return ResponseEntity.status(HttpStatus.CREATED).body(newPosseder);
	}
	
	/**
	 * Methode DELETE
	 * @param idPosseder
	 * @return supprime posseder
	 */
	@DeleteMapping("/delete/{idPosseder}")
	public ResponseEntity<?> deletePosseder(@PathVariable Integer idPosseder)
	{
		try
		{
			possederRepo.deleteById(idPosseder);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}
	
	/**
	 * Methode UPDATE
	 * @param information posseder et idPosseder
	 * @return modifie un posseder
	 */
	@PutMapping("/update/{idPosseder}")
	public ResponseEntity<?> updatePosseder(@RequestBody Posseder posseder, @PathVariable Integer idPosseder) throws Exception
	{
		
		Posseder modificationPosseder = null;
		String saisonPosseder = posseder.getSaison();
		
		if ((saisonPosseder == null) || (saisonPosseder.isEmpty())){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque la saison");
		}
		
		try
		{
			modificationPosseder = possederRepo.save(posseder);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(modificationPosseder);
	}
}
