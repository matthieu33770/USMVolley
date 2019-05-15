package usmvolley.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import usmvolley.model.Participation;
import usmvolley.model.ParticipationPK;
import usmvolley.repository.ParticipationRepository;

@RestController
@RequestMapping("/participation")
public class ParticipationController {

	@Autowired
	ParticipationRepository participationRepo;
	
	/**
	 * Methode Voir toutes les participations
	 * @return liste de toutes les participations
	 */
	@GetMapping("/get/participation")
	public ResponseEntity<?> getParticipation() {
		
		List<Participation> listeParticipation = null;
		
		try {
			listeParticipation = participationRepo.findAll();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(listeParticipation);
	}
	
	/**
	 * Methode Voir une participation
	 * @return liste une participation
	 */
	@GetMapping("/get/participationManifestation/{idManifestation}")
	public ResponseEntity<?> getParticipationByManifestation(@PathVariable int idManifestation) {
		
		List<Participation> listParticipation = null;
		
		try {
			listParticipation = participationRepo.findAllParManifestation(idManifestation);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if (listParticipation == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(listParticipation);
	}
	
	/**
	 * Methode CREATE
	 * @param information une participation
	 * @return ajoute une participation
	 */
	@PostMapping("/create")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine') or hasAuthority('Licencie')")
	public ResponseEntity<?> addParticipation(@RequestBody Participation participation) {
		
		Participation newParticipation = null;
		int idJoueur = participation.getParticipationPK().getIdJoueur();
		int idManifestation = participation.getParticipationPK().getIdManifestation();
		int idDisponibilite = participation.getParticipationPK().getIdDisponibilite();
		
		if ((idJoueur == 0)) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Id Joueur incorrecte");
		}
		if ((idManifestation == 0)) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Id Manifestation incorrecte");
		}
		if ((idDisponibilite == 0)) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Id Disponibilite incorrecte");
		}
		
		newParticipation = participationRepo.save(participation);
		System.out.println(newParticipation);
		return ResponseEntity.status(HttpStatus.CREATED).body(newParticipation);
	}
	
}
