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

import usmvolley.model.Statuts;
import usmvolley.repository.StatutsRepository;

@RestController
@RequestMapping("/statuts")
@CrossOrigin("http://localhost:4200")
public class StatutsController {

	@Autowired
	private StatutsRepository statutsRepo;
	
	/**
	 * Methode Voir tous les statuts
	 * @return liste de tous les statuts
	 */
	@GetMapping("/get/statuts")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<List<Statuts>> getListeStatus() {
		
		List<Statuts> listeStatuts = null;
		
		try {
			listeStatuts = statutsRepo.findAll();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(listeStatuts);
	}
	
	/**
	 * Methode Voir un statut
	 * @return liste un statut
	 */
	@GetMapping("/get/unStatut/{idStatut}")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<?> getUnStatut(@PathVariable Integer idStatut) {
		
		Optional<Statuts> statut = null;
		
		try {
			statut = statutsRepo.findById(idStatut);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if (statut == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(statut);
	}
	
	/**
	 * Methode CREATE
	 * @param information statut
	 * @return ajoute un statut
	 */
	@PostMapping("/create")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<?> addStatut(@RequestBody Statuts statut) {
		
		Statuts newStatut = null;
		String libelleStatut = statut.getLibelleStatut();
		
		if ((libelleStatut == null) || (libelleStatut.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le libellé du statut");
		}
		
		newStatut = statutsRepo.save(statut);
		return ResponseEntity.status(HttpStatus.CREATED).body(newStatut);
	}
	
	/**
	 * Methode DELETE
	 * @param idStatut
	 * @return supprime un statut
	 */
	@DeleteMapping("/delete/{idStatut}")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<?> deleteStatut(@PathVariable Integer idStatut)
	{
		try
		{
			statutsRepo.deleteById(idStatut);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}
	
	/**
	 * Methode UPDATE
	 * @param information statut et idStatut
	 * @return modifie un statut
	 */
	@PutMapping("/update/{idStatut}")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<?> updatestatut(@RequestBody Statuts statut, @PathVariable Integer idStatut) throws Exception
	{
		Statuts modificationStatut = null;
		String libelleStatut = statut.getLibelleStatut();
		if ((libelleStatut == null) || (libelleStatut.isEmpty()))
		{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le libellé du statut");
		}
		try
		{
			modificationStatut = statutsRepo.save(statut);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(modificationStatut);
	}
}
