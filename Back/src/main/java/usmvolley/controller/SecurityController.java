package usmvolley.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SecurityController {

	@GetMapping ("/public")
	public String publicResource () {
		return "Cette ressource est publique !";
	}
	
	@GetMapping("/manifestations")
    public String capitaineResource() {
        return "Cette ressource est disponible pour les Captaines et membres du Bureau !";
    }
	
	@GetMapping("/joueurs")
    public String bureauResource() {
        return "Cette ressource est disponible pour les membres du Bureau !";
    }
	
	@GetMapping("/deny")
	public String deniedResource() {
	    return "This resource is denied for all users !";
	}
}
