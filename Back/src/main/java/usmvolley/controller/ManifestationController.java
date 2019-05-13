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

import usmvolley.model.Manifestations;
import usmvolley.repository.ManifestationsRepository;

@RestController
@RequestMapping("/manifestations")
@CrossOrigin("http://localhost:4200")
public class ManifestationController {
	
	@Autowired
	private ManifestationsRepository manifestationsRepo;
	
	/**
	 * Methode Voir toutes les manifestations
	 * @return liste de toutes les manifestations
	 */
	@GetMapping("/get/manifestations")
//	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine') or hasAuthority('Licencie')")
	public ResponseEntity<List<Manifestations>> getListeManifestations() {
		
		List<Manifestations> listeManifestations = null;
		
		try {
			listeManifestations = manifestationsRepo.findAll();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(listeManifestations);
	}
	
	/**
	 * Methode Voir une manifestation
	 * @return liste une manifestation
	 */
	@GetMapping("/get/uneManifestation/{idManifestation}")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine') or hasAuthority('Licencie')")
	public ResponseEntity<?> getUneManifestation(@PathVariable Integer idManifestation) {
		
		Optional<Manifestations> manifestation = null;
		
		try {
			manifestation = manifestationsRepo.findById(idManifestation);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if (manifestation == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(manifestation);
	}
	
	/**
	 * Methode CREATE
	 * @param information Manifestation
	 * @return ajoute une Manifestation
	 */
	@PostMapping("/create")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<?> addManifestation(@RequestBody Manifestations manifestation) {
		
		Manifestations newManifestation = null;
		String libelleManifestation = manifestation.getTitle();
		String periodiciteManifestation = manifestation.getPeriodicite();
		
		if ((libelleManifestation == null) || (libelleManifestation.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque la disponibilité du joueur");
		}
		if ((periodiciteManifestation == null) || (periodiciteManifestation.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque la disponibilité du joueur");
		}
		
		newManifestation = manifestationsRepo.save(manifestation);
		return ResponseEntity.status(HttpStatus.CREATED).body(newManifestation);
	}
	
	/**
	 * Methode DELETE
	 * @param idManifestation
	 * @return supprime une Manifestation
	 */
	@DeleteMapping("/delete/{idManifestation}")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<?> deleteManifestation(@PathVariable Integer idManifestation)
	{
		try
		{
			manifestationsRepo.deleteById(idManifestation);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}
	
	/**
	 * Methode UPDATE
	 * @param information Manifestation et idManifestation
	 * @return modifie une Manifestation
	 */
	@PutMapping("/update/{idManifestation}")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine') or hasAuthority('Licencie')")
	public ResponseEntity<?> updateManifestation(@RequestBody Manifestations manifestation, @PathVariable Integer idManifestation) throws Exception
	{
		
		Manifestations modificationManifestation = null;
		String libelleManifestation = manifestation.getTitle();
		String periodiciteManifestation = manifestation.getPeriodicite();
		
		if ((libelleManifestation == null) || (libelleManifestation.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque la disponibilité du joueur");
		}
		if ((periodiciteManifestation == null) || (periodiciteManifestation.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque la disponibilité du joueur");
		}
		
		try
		{
			modificationManifestation = manifestationsRepo.save(manifestation);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(modificationManifestation);
	}
}
