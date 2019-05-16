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

import usmvolley.model.Equipes;
import usmvolley.repository.EquipesRepository;

@RestController
@RequestMapping("/equipes")
public class EquipesController {
	
	@Autowired
	private EquipesRepository equipesRepo;
	
	/**
	 * Methode Voir toutes les équipes
	 * @return liste de toutes les équipes
	 */
	@GetMapping("/get/equipes")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<List<Equipes>> getListeEquipes() {
		
		List<Equipes> listeEquipes = null;
		
		try {
			listeEquipes = equipesRepo.findAll();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(listeEquipes);
	}
	
	/**
	 * Methode Voir une équipe
	 * @return liste une équipe
	 */
	@GetMapping("/get/uneEquipe/{idEquipe}")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<?> getUneEquipe(@PathVariable Integer idEquipe) {
		
		Optional<Equipes> equipe = null;
		
		try {
			equipe = equipesRepo.findById(idEquipe);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if (equipe == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(equipe);
	}
	
	/**
	 * Methode CREATE
	 * @param information équipe
	 * @return ajoute une équipe
	 */
	@PostMapping("/create")
	@PreAuthorize("hasAuthority('Bureau')")
	public ResponseEntity<?> addEquipe(@RequestBody Equipes equipe) {
		
		Equipes newEquipe = null;
		String libelleEquipe = equipe.getLibelleEquipe();
		System.out.println("équipe du Front : " + equipe);
		
		if ((libelleEquipe == null) || (libelleEquipe.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le nom de l'équipe");
		}
		
		newEquipe = equipesRepo.save(equipe);
		System.out.println("création équipe : " + newEquipe);
		return ResponseEntity.status(HttpStatus.CREATED).body(newEquipe);
	}
	
	/**
	 * Methode DELETE
	 * @param idEquipe
	 * @return supprime une equipe
	 */
	@DeleteMapping("/delete/{idEquipe}")
	@PreAuthorize("hasAuthority('Bureau')")
	public ResponseEntity<?> deleteEquipe(@PathVariable Integer idEquipe)
	{
		try
		{
			equipesRepo.deleteById(idEquipe);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}
	
	/**
	 * Methode UPDATE
	 * @param information equipe et idEquipe
	 * @return modifie une equipe
	 */
	@PutMapping("/update/{idEquipe}")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<?> updateEquipe(@RequestBody Equipes equipe, @PathVariable Integer idEquipe) throws Exception
	{
		Equipes modificationEquipe = null;
		String libelleEquipe = equipe.getLibelleEquipe();
		if ((libelleEquipe == null) || (libelleEquipe.isEmpty()))
		{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le nom de l'équipe");
		}
		
		try
		{
			modificationEquipe = equipesRepo.save(equipe);
			System.out.println("Equipe modifiée : " + modificationEquipe);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(modificationEquipe);
	}
}