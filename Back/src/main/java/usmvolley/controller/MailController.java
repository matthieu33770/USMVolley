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
import org.springframework.web.bind.annotation.RequestParam;
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
	 
	    @PostMapping("/changeMdp")
	    public ResponseEntity<?> sendEmail(@RequestParam(value= "username", required=true) String username , @RequestParam(value= "lien", required=true) String lien) {
	    	
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
	        						+ "Si vous n'etes pas à l'origine de cette demande, merci de nous en informer\n\n"
	        						+ "USM Volley Ball\nunionsallesmios.volley@gmail.com");
	        helper.setSubject("Votre lien");
	        
	        System.out.println(message);
	        
	        sender.send(message);
	    }
	    
	}