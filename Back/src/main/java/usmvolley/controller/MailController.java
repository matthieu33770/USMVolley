package usmvolley.controller;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import usmvolley.model.Joueurs;
import usmvolley.model.Users;
import usmvolley.repository.JoueursRepository;
import usmvolley.repository.UsersRepository;

@RestController
@RequestMapping("/email")
@CrossOrigin("http://localhost:4200")
public class MailController {
	 	     
	    @Autowired
	    private JavaMailSender sender;
	    @Autowired
	    private UsersRepository userRepo;
	    @Autowired
	    private JoueursRepository joueurRepo;
	    
	    public MailController (JoueursRepository joueurRepo, UsersRepository userRepo) {
	    	this.joueurRepo = joueurRepo;
	    	this.userRepo = userRepo;
	    }
	 
	    @PostMapping("/reinit/{username}")
	    public ResponseEntity<?> sendEmail(@PathVariable String username) {
	    	
	    	Users user = null;
	    	Joueurs joueur = null;
	    	
			user = userRepo.findUserByUsername(username);
			joueur = joueurRepo.findJoueurByUser(user);
			
			System.out.println("username : " + username);
			System.out.println("user : " + user);
			System.out.println("joueur : " + joueur);
			System.out.println("mail : " + joueur.getMail());
	    	
	        try {
	            
	            sendEmailMdP(joueur.getMail(), joueur.getPrenom(), joueur.getMail());
	            
	            return ResponseEntity.status(HttpStatus.OK).body(null);
	        }catch(Exception ex) {
	        	System.out.println(ex);
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	        }
	    }
	 
	    private void sendEmailMdP(String nom, String prenom, String email) throws Exception{
	        MimeMessage message = sender.createMimeMessage();
	        MimeMessageHelper helper = new MimeMessageHelper(message);
	        
	        System.out.println("essai");
	          
	        helper.setTo(email);
	        
	        helper.setText("Bonjour " + nom + " " + prenom + ",\n\nVous êtes bien inscrit sur le site de l'Union Salles Mios Volley Ball" + 
	        		".\nPour réinitialiser votre mot de passe, veuillez suivre le lien suivant : !\n\nUSM Volley Ball");
	        helper.setSubject("Votre lien");
	        
	        System.out.println(message);
	        
	        sender.send(message);
	    }
	    
	}