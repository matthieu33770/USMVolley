package usmvolley.controller;

import java.util.Date;
import java.util.Optional;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import usmvolley.model.Joueurs;
import usmvolley.model.Manifestations;
import usmvolley.model.Users;
import usmvolley.repository.JoueursRepository;
import usmvolley.repository.ManifestationsRepository;
import usmvolley.repository.UsersRepository;

@RestController
@RequestMapping("/email")
public class MailController {
	 	     
	    @Autowired
	    private JavaMailSender sender;
	    @Autowired
	    private UsersRepository userRepo;
	    @Autowired
	    private JoueursRepository joueurRepo;
	    @Autowired
	    private ManifestationsRepository manifestationRepo;
	    
	    public MailController (JoueursRepository joueurRepo, UsersRepository userRepo) {
	    	this.joueurRepo = joueurRepo;
	    	this.userRepo = userRepo;
	    }
	 
	    @PostMapping("/changeMdp")
	    public ResponseEntity<?> sendEmail(@RequestParam(value= "username", required=true) String username,
	    		@RequestParam(value= "lien", required=true) String lien) {
	    	
	    	Users user = null;
	    	Joueurs joueur = null;
	    	
			user = userRepo.findUserByUsername(username);
			joueur = joueurRepo.findJoueurByUser(user);
	    	
	        try {
	            
	            sendEmailMdP(user.getIdUser(), joueur.getNom(), joueur.getPrenom(), joueur.getMail(), lien);
	            
	            return ResponseEntity.status(HttpStatus.OK).body(null);
	        }catch(Exception ex) {
	        	System.out.println(ex);
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	        }
	    }
	 
	    private void sendEmailMdP(Integer idUser, String nom, String prenom, String email, String lien) throws Exception{
	        MimeMessage message = sender.createMimeMessage();
	        MimeMessageHelper helper = new MimeMessageHelper(message);
	        
	        String url = lien + idUser;
	          
	        helper.setTo(email);
	        
	        helper.setText("Bonjour " + prenom + " " + nom + ",\n\nVous venez de faire une demande de changement de mot de passe.\r\n"  
	        						+ "Merci de cliquer sur le lien ci dessous pour le réinitialiser :\r\n" + url +"\r\n\r\n" 
	        						+ "Si vous n'etes pas � l'origine de cette demande, merci de nous en informer\n\n"
	        						+ "USM Volley Ball\nunionsallesmios.volley@gmail.com");
	        helper.setSubject("Votre lien");
	        
	        sender.send(message);
	    }
	    
	    @PostMapping("/sendMailEquipe")
	    public ResponseEntity<?> sendMaiEquipe(@RequestParam(value= "username", required=true) String username , @RequestParam(value= "sujetMail", required=true) String sujetMail, @RequestParam(value= "contenuMail", required=true) String contenuMail) {
	    	
	    	Users user = null;
	    	Joueurs joueur = null;
	    	
			user = userRepo.findUserByUsername(username);
			joueur = joueurRepo.findJoueurByUser(user);
	    	
	        try {
	            
	            sendEmailEquipe(user.getIdUser(), joueur.getNom(), joueur.getPrenom(), joueur.getMail(), sujetMail, contenuMail);
	            
	            return ResponseEntity.status(HttpStatus.OK).body(null);
	        }catch(Exception ex) {
	        	System.out.println(ex);
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	        }
	    }
	    
	    private void sendEmailEquipe(Integer idUser, String nom, String prenom, String email, String sujetMail, String contenuMail) throws Exception{
	        MimeMessage message = sender.createMimeMessage();
	        MimeMessageHelper helper = new MimeMessageHelper(message);
	          
	        helper.setTo(email);
	        
	        helper.setText("Bonjour " + prenom + " " + nom + ",\n\nVous avez reçu un message de votre club de volley favori :\r\n"  
					+ contenuMail);
	        
	        helper.setSubject(sujetMail);
	        
	        sender.send(message);
	    }
	    
	    @PostMapping("/selection")
	    public ResponseEntity<?> sendMailSelection(@RequestParam(value= "idJoueur", required=true) int idJoueur, @RequestParam(value= "idManifestation", required=true) int idManifestation) {

	    	Optional<Joueurs> joueur = null;
	    	Optional<Manifestations> manifestation = null;
	    	
			joueur = joueurRepo.findById(idJoueur);
			manifestation = manifestationRepo.findById(idManifestation);
	    	
	        try {
	            
	        	sendEmailSelection(joueur.get().getNom(), joueur.get().getPrenom(), joueur.get().getMail(), manifestation.get().getAdversaire(),manifestation.get().getStart(), manifestation.get().getLieu().getLieu());
	            
	            return ResponseEntity.status(HttpStatus.OK).body(null);
	        }catch(Exception ex) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	        }
	    }
	 
	    private void sendEmailSelection(String nom, String prenom, String email, String adversaire, Date date, String lieu) throws Exception{
	        MimeMessage message = sender.createMimeMessage();
	        MimeMessageHelper helper = new MimeMessageHelper(message);
	          
	        helper.setTo(email);
	        
	        helper.setText("Bonjour " + prenom + " " + nom + ",\n\nVous venez d'être sélectionné pour un match.\r\n"  
	        						+ "Le match se joue contre " + adversaire + ", le " + date + " à // au " + lieu + "\n\n"
	        						+ "Ton Capitaine");
	        helper.setSubject("Sélectionné pour un match");
	        
	        sender.send(message);
	    }
	}