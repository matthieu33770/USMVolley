package usmvolley.controller;

import java.util.List;
import java.util.Optional;

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

import usmvolley.model.Disponibilite;
import usmvolley.model.Joueurs;
import usmvolley.model.Manifestations;
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
	@GetMapping("/get/uneParticipation/{participationPK}")
	public ResponseEntity<?> getUneParticipation(@PathVariable ParticipationPK participationPK) {
		
		Optional<Participation> participation = null;
		
		try {
			participation = participationRepo.findById(participationPK);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if (participation == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(participation);
	}
	
	/**
	 * Methode CREATE
	 * @param information une participation
	 * @return ajoute une participation
	 */
	@PostMapping("/create")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<?> addParticipation(@RequestBody Participation participation) {
		
		System.out.println("arrivée Joueur: " + participation.getParticipationPK().getJoueur());
		System.out.println("arrivée Manif: " + participation.getParticipationPK().getManifestation());
		System.out.println("arrivée Dispo: " + participation.getParticipationPK().getDisponibilite());
		Participation newParticipation = null;
		Joueurs idJoueur = participation.getParticipationPK().getJoueur();
		Manifestations idManifestation = participation.getParticipationPK().getManifestation();
		Disponibilite idDisponibilite = participation.getParticipationPK().getDisponibilite();
		
		System.out.println(idJoueur);
		
		if ((idJoueur == null)) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Id Joueur incorrecte");
		}
		if ((idManifestation == null)) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Id Manifestation incorrecte");
		}
		if ((idDisponibilite == null)) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Id Disponibilite incorrecte");
		}
		
		newParticipation = participationRepo.save(participation);
		return ResponseEntity.status(HttpStatus.CREATED).body(newParticipation);
	}
	
}
