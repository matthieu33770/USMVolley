package usmvolley.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import usmvolley.model.Disponibilite;
import usmvolley.repository.DisponibiliteRepository;

@RestController
@RequestMapping("/disponibilite")
public class DisponibiliteController {
	
	@Autowired
	private DisponibiliteRepository disponibiliteRepo;
	
	/**
	 * Methode Voir tous les disponibilites
	 * @return liste de tous les disponibilitÚs
	 */
	@GetMapping("/get/disponibilites")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine') or hasAuthority('Licencie')")
	public ResponseEntity<List<Disponibilite>> getListeDisponibilites() {
		
		List<Disponibilite> listeDisponibilite = null;
		
		try {
			listeDisponibilite = disponibiliteRepo.findAll();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(listeDisponibilite);
	}
	
	/**
	 * Methode Voir une disponibilitÚ
	 * @return liste une disponibilitÚ
	 */
	@GetMapping("/get/uneDisponibilite/{idDisponibilite}")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine') or hasAuthority('Licencie')")
	public ResponseEntity<?> getUneDisponibilite(@PathVariable Integer idDisponibilite) {
		
		Optional<Disponibilite> disponibilite = null;
		
		try {
			disponibilite = disponibiliteRepo.findById(idDisponibilite);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if (disponibilite == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(disponibilite);
	}
	
	/**
	 * Methode CREATE
	 * @param information disponibilitÚ
	 * @return ajoute une disponibilitÚ
	 */
	@PostMapping("/create")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<?> addDisponibilite(@RequestBody Disponibilite disponibilite) {
		
		Disponibilite newDisponibilite = null;
		String libelleDisponibilite = disponibilite.getLibelleDisponibilite();
		
		if ((libelleDisponibilite == null) || (libelleDisponibilite.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le libellÚ de la disponibilitÚ");
		}
		
		newDisponibilite = disponibiliteRepo.save(disponibilite);
		return ResponseEntity.status(HttpStatus.CREATED).body(newDisponibilite);
	}
	
	/**
	 * Methode DELETE
	 * @param idDisponibilite
	 * @return supprime une disponibilitÚ
	 */
	@DeleteMapping("/delete/{idDisponibilite}")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<?> deleteDisponibilite(@PathVariable Integer idDisponibilite)
	{
		try
		{
			disponibiliteRepo.deleteById(idDisponibilite);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}
	
	/**
	 * Methode UPDATE
	 * @param information DisponibilitÚ et idDisponibilite
	 * @return modifie une disponibilitÚ
	 */
	@PutMapping("/update/{idDisponibilite}")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<?> updateDisponibilite(@RequestBody Disponibilite disponibilite, @PathVariable Integer idDisponibilite) throws Exception
	{
		
		Disponibilite modificationDisponibilite = null;
		String libelleDisponibilite = disponibilite.getLibelleDisponibilite();
		
		if ((libelleDisponibilite == null) || (libelleDisponibilite.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le libellÚ de la disponibilitÚ");
		}
		
		try
		{
			modificationDisponibilite = disponibiliteRepo.save(disponibilite);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(modificationDisponibilite);
	}
}
