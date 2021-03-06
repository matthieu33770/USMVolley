package usmvolley.controller;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import usmvolley.model.Joueurs;
import usmvolley.model.Users;
import usmvolley.repository.JoueursRepository;
import usmvolley.service.FileStorageService;
import usmvolley.upload.FileInformation;
import usmvolley.upload.exception.UploadFileException;

@RestController
@RequestMapping("/joueurs")
public class JoueursController {

	@Autowired
	private JoueursRepository joueursRepo;
	
	@Autowired
	private FileStorageService fileStorageService;
	
	private BCryptPasswordEncoder passwordEncoder;
	
	public JoueursController( BCryptPasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }
	
	/**
	 * Methode Voir tous les joueurs
	 * @return liste de tous les joueurs
	 */
	@GetMapping("/get/joueurs")
	public ResponseEntity<List<Joueurs>> getListeJoueurs() {
		
		List<Joueurs> listeJoueurs = null;
		
		try {
			listeJoueurs = joueursRepo.findAll();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(listeJoueurs);
	}
	
	/**
	 * Methode Voir un joueur
	 * @return liste un joueur
	 */
	@GetMapping("/get/unJoueur/{idJoueur}")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<?> getUnJoueur(@PathVariable Integer idJoueur) {
		
		Optional<Joueurs> joueur = null;
		
		try {
			joueur = joueursRepo.findById(idJoueur);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if (joueur == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(joueur);
	}
	
	/**
	 * Methode Voir un joueur
	 * @return liste un joueur selon son nom
	 */
	@GetMapping("/get/byJoueur/{nom}")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<?> getJoueurByNom(@PathVariable String nom) {
		
		Optional<Joueurs> joueur = null;
		
		try {
			joueur = joueursRepo.findJoueurByNom(nom);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if (joueur == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(joueur);
	}
	
	/**
	 * Methode CREATE
	 * @param information joueur
	 * @return ajoute un joueur
	 */
	@PostMapping("/create")
	public ResponseEntity<?> addJoueur(@RequestBody Joueurs joueur) {
		
		Joueurs newJoueur = null;
		String nomJoueur = joueur.getNom();
		String prenomJoueur = joueur.getPrenom();
		Integer numeroAdresseJoueur = joueur.getNumeroAdresse();
		String rueJoueur = joueur.getRue();
		Integer codePostalJoueur = joueur.getCodePostal();
		String villeJoueur = joueur.getVille();
		String mailJoueur = joueur.getMail();
		String telephone1Joueur = joueur.getTelephone1();
		Date dateJoueur = joueur.getDateNaissance();
		Users userJoueur = joueur.getUser();
		String userJoueurMdp = passwordEncoder.encode(joueur.getUser().getMdp());
		
		if ((nomJoueur == null) || (nomJoueur.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le nom du joueur");
		}
		if ((prenomJoueur == null) || (prenomJoueur.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le prenom du joueur");
		}
		if (numeroAdresseJoueur == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le numéro de la rue");
		}
		if ((rueJoueur == null) || (rueJoueur.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le nom de la rue");
		}
		if (codePostalJoueur == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le code postal");
		}
		if ((villeJoueur == null) || (villeJoueur.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque la ville");
		}
		if ((mailJoueur == null) || (mailJoueur.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le mail");
		}
		if ((telephone1Joueur == null) || (telephone1Joueur.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le num�rode telephone 1");
		}
		if (dateJoueur == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque la date de naissance");
		}
		if (userJoueur == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque l'identifiant");
		}
		
		joueur.getUser().setMdp(userJoueurMdp);
	
		newJoueur = joueursRepo.save(joueur);
		return ResponseEntity.status(HttpStatus.CREATED).body(newJoueur);
	}
	
	/**
	 * Methode DELETE
	 * @param idJoueur
	 * @return supprime un joueur
	 */
	@DeleteMapping("/delete/{idJoueur}")
	@PreAuthorize("hasAuthority('Bureau')")
	public ResponseEntity<?> deleteUser(@PathVariable Integer idJoueur) {
		
		try
		{
			joueursRepo.deleteById(idJoueur);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}
	
	/**
	 * Methode UPDATE
	 * @param information joueur et idJoueur
	 * @return modifie un joueur
	 */
	@PutMapping("/update/{idJoueur}")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine') or hasAuthority('Licencie')")
	public ResponseEntity<?> updateJoueur(@RequestBody Joueurs joueur, @PathVariable Integer idJoueur) throws Exception
	{
		Joueurs modificationJoueur = null;
		
		String nomJoueur = joueur.getNom();
		String prenomJoueur = joueur.getPrenom();
		Integer numeroAdresseJoueur = joueur.getNumeroAdresse();
		String rueJoueur = joueur.getRue();
		Integer codePostalJoueur = joueur.getCodePostal();
		String villeJoueur = joueur.getVille();
		String mailJoueur = joueur.getMail();
		String telephone1Joueur = joueur.getTelephone1();
		Date dateJoueur = joueur.getDateNaissance();
		Users userJoueur = joueur.getUser();
		
		if ((nomJoueur == null) || (nomJoueur.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le nom du joueur");
		}
		if ((prenomJoueur == null) || (prenomJoueur.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le prenom du joueur");
		}
		if (numeroAdresseJoueur == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le num�ro de la rue");
		}
		if ((rueJoueur == null) || (rueJoueur.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le nom de la rue");
		}
		if (codePostalJoueur == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le code postal");
		}
		if ((villeJoueur == null) || (villeJoueur.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque la ville");
		}
		if ((mailJoueur == null) || (mailJoueur.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le mail");
		}
		if ((telephone1Joueur == null) || (telephone1Joueur.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le num�rode telephone 1");
		}
		if (dateJoueur == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque la date de naissance");
		}
		if (userJoueur == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque l'identifiant");
		}
		
		try
		{
			modificationJoueur = joueursRepo.save(joueur);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(modificationJoueur);
	}
	
	// upload a file and put it in D:\\eclipse-workspace\\USMVolley\\Front\\src\\assets\\documents\\ and memorize its name in DB   
		@PostMapping(value = "/upload", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
		  public ResponseEntity<?> uploadFile(
		      @RequestParam("data") MultipartFile multipartFile
		  ) throws UploadFileException, IllegalStateException, IOException {
			
		    if (multipartFile == null || multipartFile.isEmpty()) {
		      throw new UploadFileException();
		    }
		    
		    this.fileStorageService.storeFile(multipartFile);
		    System.out.println(multipartFile.getOriginalFilename());
		    System.out.println(multipartFile.getSize());
		    
//		    multipartFile.transferTo(new File("D:\\eclipse-workspace\\USMVolley\\Front\\src\\assets\\documents\\" + multipartFile.getOriginalFilename()));
		    return new ResponseEntity<>(new FileInformation(multipartFile.getOriginalFilename(), multipartFile.getSize()), HttpStatus.CREATED);
		}
		
}
