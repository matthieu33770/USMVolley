package usmvolley.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import usmvolley.model.Joueurs;
import usmvolley.model.Reponse;
import usmvolley.model.Users;
import usmvolley.repository.JoueursRepository;
import usmvolley.repository.UsersRepository;
import usmvolley.service.MailService;

@RestController
@RequestMapping("/emaildd")
@CrossOrigin("http://localhost:4200")
public class EmailController {
	
	@Autowired
    private UsersRepository userRepo;
    @Autowired
    private JoueursRepository joueurRepo;
    @Autowired
    private MailService mailService;
    
    public EmailController (JoueursRepository joueurRepo, UsersRepository userRepo, MailService mailService) {
    	this.joueurRepo = joueurRepo;
    	this.userRepo = userRepo;
    	this.mailService = mailService;
    }

	@PostMapping("/changePassword/{username}")
	public ResponseEntity<?> changePassword(@PathVariable String username) {
		Users user = null;
    	Joueurs joueur = null;
    	
		user = userRepo.findUserByUsername(username);
		joueur = joueurRepo.findJoueurByUser(user);
		
		System.out.println("username : " + username);
		System.out.println("user : " + user);
		System.out.println("joueur : " + joueur);
		System.out.println("mail : " + joueur.getMail());
		
		mailService.sendPasswordMail(joueur.getMail());
		System.out.println("mail envoyé");
		
		return ResponseEntity.ok(new Reponse("password changé"));
	}
	
}
