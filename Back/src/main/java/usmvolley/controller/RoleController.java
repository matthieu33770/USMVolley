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

import usmvolley.model.RoleFonction;
import usmvolley.repository.RoleRepository;

@RestController
@RequestMapping("/roles")
@CrossOrigin("http://localhost:4200")
public class RoleController {

	@Autowired
	private RoleRepository roleRepo;
	
	/**
	 * Methode Voir tous les r�les
	 * @return liste de tous les r�les
	 */
	@GetMapping("/get/roles")
	public ResponseEntity<List<RoleFonction>> getListeRoles() {
		
		List<RoleFonction> listeRoles = null;
		
		try {
			listeRoles = roleRepo.findAll();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(listeRoles);
	}
	
	/**
	 * Methode Voir un r�le
	 * @return liste un r�le
	 */
	@GetMapping("/get/unRole/{idRole}")
	public ResponseEntity<?> getUnRole(@PathVariable Integer idRole) {
		
		Optional<RoleFonction> role = null;
		
		try {
			role = roleRepo.findById(idRole);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if (role == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(role);
	}
	
	/**
	 * Methode Voir un user
	 * @return liste un user
	 */
	@GetMapping("/getRole/byUser/{username}")
	public ResponseEntity<?> getRoleByUsername(@PathVariable String username) {
		
		Optional<RoleFonction> role = null;
		
		try {
			role = roleRepo.findRoleByUsername(username);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if (role == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(role);
	}
	
	/**
	 * Methode CREATE
	 * @param information r�le
	 * @return ajoute un r�le
	 */
	@PostMapping("/create")
	public ResponseEntity<?> addRole(@RequestBody RoleFonction role) {
		
		RoleFonction newRole = null;
		String libelleRole = role.getLibelleRole();
		
		if ((libelleRole == null) || (libelleRole.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le libell� du r�le");
		}
		
		newRole = roleRepo.save(role);
		return ResponseEntity.status(HttpStatus.CREATED).body(newRole);
	}
	
	/**
	 * Methode DELETE
	 * @param idRole
	 * @return supprime un r�le
	 */
	@DeleteMapping("/delete/{idRole}")
	public ResponseEntity<?> deleteRole(@PathVariable Integer idRole)
	{
		try
		{
			roleRepo.deleteById(idRole);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}
	
	/**
	 * Methode UPDATE
	 * @param information r�le et idRole
	 * @return modifie un role
	 */
	@PutMapping("/update/{idRole}")
	public ResponseEntity<?> updateRole(@RequestBody RoleFonction role, @PathVariable Integer idRole) throws Exception
	{
		RoleFonction modificationRole = null;
		String libelleRole = role.getLibelleRole();
		if ((libelleRole == null) || (libelleRole.isEmpty()))
		{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le libell� du r�le");
		}
		try
		{
			modificationRole = roleRepo.save(role);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(modificationRole);
	}
}