package usmvolley.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import usmvolley.model.Agenda;
import usmvolley.repository.AgendaRepository;

@RestController
@RequestMapping("/agenda")
public class AgendaController {

	@Autowired
	private AgendaRepository agendaRepo;
	
	/**
	 * Methode Voir tous les agenda
	 * @return liste de tous les agenda
	 */
	@GetMapping("/get/agenda")
	public ResponseEntity<List<Agenda>> getListeAgenda() {
		
		List<Agenda> listeAgenda = null;
		
		try {
			listeAgenda = agendaRepo.findAll();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(listeAgenda);
	}
	
	/**
	 * Methode Voir un agenda
	 * @return liste un agenda
	 */
	@GetMapping("/get/unAgenda/{idAgenda}")
	public ResponseEntity<?> getUnAgenda(@PathVariable Integer idAgenda) {
		
		Optional<Agenda> agenda = null;
		
		try {
			agenda = agendaRepo.findById(idAgenda);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if (agenda == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(agenda);
	}
	
	/**
	 * Methode CREATE
	 * @param information agenda
	 * @return ajoute un agenda
	 */
	@PostMapping("/create")
	public ResponseEntity<?> addAgenda(@RequestBody Agenda agenda) {
		
		Agenda newAgenda = null;
		
		newAgenda = agendaRepo.save(agenda);
		return ResponseEntity.status(HttpStatus.CREATED).body(newAgenda);
	}
	
	/**
	 * Methode DELETE
	 * @param idAgenda
	 * @return supprime un agenda
	 */
	@DeleteMapping("/delete/{idAgenda}")
	public ResponseEntity<?> deleteAgenda(@PathVariable Integer idAgenda)
	{
		try
		{
			agendaRepo.deleteById(idAgenda);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}
	
	/**
	 * Methode UPDATE
	 * @param information agenda et idAgenda
	 * @return modifie un agenda
	 */
	@PutMapping("/update/{idAgenda}")
	public ResponseEntity<?> updateAgenda(@RequestBody Agenda agenda, @PathVariable Integer idAgenda) throws Exception
	{
		Agenda modificationAgenda = null;

		try
		{
			modificationAgenda = agendaRepo.save(agenda);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(modificationAgenda);
	}
}
