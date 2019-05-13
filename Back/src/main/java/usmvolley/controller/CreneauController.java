package usmvolley.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import usmvolley.model.Creneau;
import usmvolley.repository.CreneauRepository;

@RestController
@RequestMapping("/creneaux")
@CrossOrigin("http://localhost:4200")
public class CreneauController {
	
	@Autowired
	private CreneauRepository creneauxRepo;
	
	/**
	 * Methode Voir tous les creneaux
	 * @return liste de tous les creneaux
	 */
	@GetMapping("/get/creneaux")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<List<Creneau>> getListeCreneaux() {
		
		List<Creneau> listeCreneaux = null;
		
		try {
			listeCreneaux = creneauxRepo.findAll();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(listeCreneaux);
	}
	
	/**
	 * Methode Voir un creneaux
	 * @return liste un creneaux
	 */
	@GetMapping("/get/unCreneau/{idCreneau}")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<?> getUnCreneau(@PathVariable Integer idCreneau) {
		
		Optional<Creneau> creneau = null;
		
		try {
			creneau = creneauxRepo.findById(idCreneau);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if (creneau == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(creneau);
	}
	
	/**
	 * Methode CREATE
	 * @param information creneau
	 * @return ajoute creneau
	 */
	@PostMapping("/create")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<?> addCreneau(@RequestBody Creneau creneau) {
		
		Creneau newCreneau = null;
		String creneauCr = creneau.getCreneau();
		
		if ((creneauCr == null) || (creneauCr.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le nom du créneau");
		}
		
		newCreneau = creneauxRepo.save(creneau);
		return ResponseEntity.status(HttpStatus.CREATED).body(newCreneau);
	}
	
	/**
	 * Methode DELETE
	 * @param idCreneau
	 * @return supprime creneau
	 */
	@DeleteMapping("/delete/{idCreneau}")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<?> deleteCreneau(@PathVariable Integer idCreneau)
	{
		try
		{
			creneauxRepo.deleteById(idCreneau);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}
	
	/**
	 * Methode UPDATE
	 * @param information Creneau et idCreneau
	 * @return modifie un Creneau
	 */
	@PutMapping("/update/{idCreneau}")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<?> updateCreneau(@RequestBody Creneau creneau, @PathVariable Integer idCreneau) throws Exception
	{
		
		Creneau modificationCreneau = null;
		String creneauCr = creneau.getCreneau();
		
		if ((creneauCr == null) || (creneauCr.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le nom du créneau");
		}
		
		try
		{
			modificationCreneau = creneauxRepo.save(creneau);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(modificationCreneau);
	}
}
