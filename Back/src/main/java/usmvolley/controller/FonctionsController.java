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

import usmvolley.model.Fonctions;
import usmvolley.repository.FonctionsRepository;

@RestController
@RequestMapping("/fonctions")
@CrossOrigin("http://localhost:4200")
public class FonctionsController {
	
	@Autowired
	private FonctionsRepository fonctionRepo;
	
	/**
	 * Methode Voir tous les fonctions
	 * @return liste de tous les fonctions
	 */
	@GetMapping("/get/fonctions")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<List<Fonctions>> getListeFonctions() {
		
		List<Fonctions> listeFonctions = null;
		
		try {
			listeFonctions = fonctionRepo.findAll();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(listeFonctions);
	}
	
	/**
	 * Methode Voir une fonction
	 * @return liste une fonction
	 */
	@GetMapping("/get/unRole/{idFonction}")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<?> getUneFonction(@PathVariable Integer idFonction) {
		
		Optional<Fonctions> fonction = null;
		
		try {
			fonction = fonctionRepo.findById(idFonction);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if (fonction == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(fonction);
	}
	
	/**
	 * Methode CREATE
	 * @param information fonction
	 * @return ajoute une fonction
	 */
	@PostMapping("/create")
	@PreAuthorize("hasAuthority('Bureau')")
	public ResponseEntity<?> addFonction(@RequestBody Fonctions fonction) {
		
		Fonctions newFonction = null;
		String libelleFonction = fonction.getLibelleFonction();
		
		if ((libelleFonction == null) || (libelleFonction.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le libellé du rôle");
		}
		
		newFonction = fonctionRepo.save(fonction);
		return ResponseEntity.status(HttpStatus.CREATED).body(newFonction);
	}
	
	/**
	 * Methode DELETE
	 * @param idFonction
	 * @return supprime une fonction
	 */
	@DeleteMapping("/delete/{idFonction}")
	@PreAuthorize("hasAuthority('Bureau')")
	public ResponseEntity<?> deleteFonction(@PathVariable Integer idFonction)
	{
		try
		{
			fonctionRepo.deleteById(idFonction);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}
	
	/**
	 * Methode UPDATE
	 * @param information fonction et idFonction
	 * @return modifie une fonciton
	 */
	@PutMapping("/update/{idFonction}")
	@PreAuthorize("hasAuthority('Bureau')")
	public ResponseEntity<?> updateFonction(@RequestBody Fonctions fonction, @PathVariable Integer idFonction) throws Exception
	{
		Fonctions modificationFonction = null;
		String libelleFonction = fonction.getLibelleFonction();
		if ((libelleFonction == null) || (libelleFonction.isEmpty()))
		{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le libellé du rôle");
		}
		try
		{
			modificationFonction = fonctionRepo.save(fonction);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(modificationFonction);
	}
}
