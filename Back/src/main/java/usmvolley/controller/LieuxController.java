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

import usmvolley.model.Lieux;
import usmvolley.repository.LieuxRepository;

@RestController
@RequestMapping("/lieux")
@CrossOrigin("http://localhost:4200")
public class LieuxController {

	@Autowired
	private LieuxRepository lieuxRepo;
	
	/**
	 * Methode Voir tous les lieux
	 * @return liste de tous les lieux
	 */
	@GetMapping("/get/lieux")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<List<Lieux>> getListeLieux() {
		
		List<Lieux> listeLieux = null;
		
		try {
			listeLieux = lieuxRepo.findAll();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(listeLieux);
	}
	
	/**
	 * Methode Voir un lieu
	 * @return liste un lieu
	 */
	@GetMapping("/get/unLieu/{idLieu}")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<?> getUnLieu(@PathVariable Integer idLieu) {
		
		Optional<Lieux> lieu = null;
		
		try {
			lieu = lieuxRepo.findById(idLieu);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if (lieu == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(lieu);
	}
	
	/**
	 * Methode CREATE
	 * @param information lieu
	 * @return ajoute un lieu
	 */
	@PostMapping("/create")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<?> addLieu(@RequestBody Lieux lieu) {
		
		Lieux newLieu = null;
		String libelleLieu = lieu.getLieu();
		
		if ((libelleLieu == null) || (libelleLieu.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le nom du lieu");
		}
		
		newLieu = lieuxRepo.save(lieu);
		return ResponseEntity.status(HttpStatus.CREATED).body(newLieu);
	}
	
	/**
	 * Methode DELETE
	 * @param idLieu
	 * @return supprime un lieu
	 */
	@DeleteMapping("/delete/{idLieu}")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<?> deleteLieu(@PathVariable Integer idLieu)
	{
		try
		{
			lieuxRepo.deleteById(idLieu);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}
	
	/**
	 * Methode UPDATE
	 * @param information lieu et idLieu
	 * @return modifie un lieu
	 */
	@PutMapping("/update/{idLieu}")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<?> updateLieu(@RequestBody Lieux lieu, @PathVariable Integer idLieu) throws Exception
	{
		Lieux modificationLieu= null;
		String libelleLieu = lieu.getLieu();
		if ((libelleLieu == null) || (libelleLieu.isEmpty()))
		{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le nom du lieu");
		}
		try
		{
			modificationLieu = lieuxRepo.save(lieu);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(modificationLieu);
	}
}
