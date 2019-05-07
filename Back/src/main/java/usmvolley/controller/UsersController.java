package usmvolley.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import usmvolley.dto.JsonWebToken;
import usmvolley.exception.ExistingUsernameException;
import usmvolley.exception.InvalidCredentialsException;
import usmvolley.model.Users;
import usmvolley.repository.UsersRepository;
import usmvolley.service.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin("http://localhost:4200")
public class UsersController {
	
	@Autowired
	private UsersRepository usersRepo;
	
	@Autowired
	private UserService userService;
	
	private BCryptPasswordEncoder passwordEncoder;
	
    public UsersController(UserService userService, BCryptPasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }
    
    @GetMapping
//    @PreAuthorize("hasRole('ROLE_BUREAU')")
	public List<Users> getUsers() {
		return userService.findAllUsers();
	}
	
	/**
     * Method to register a new user in database.
     * @param user the new user to create.
     * @return a JWT if sign up is ok, a bad response code otherwise.
     */
    @PostMapping("/sign-up")
    public ResponseEntity<JsonWebToken> signUp(@RequestBody Users user) {
        try {
            return ResponseEntity.ok(new JsonWebToken(userService.signup(user)));
        } catch (ExistingUsernameException ex) {
            return ResponseEntity.badRequest().build();
        }
    }
    /*
     * Method to sign in a user (already existing).
     * @param user the user to sign in to the app.
     * @return a JWT if sign in is ok, a bad response code otherwise.
     */
    @PostMapping("/signin")
    public ResponseEntity<JsonWebToken> signIn(@RequestBody Users user) {
//    	System.out.println(user);
        try {
        	System.out.println(userService.signin(user.getUsername(), user.getMdp()));
            return ResponseEntity.ok(new JsonWebToken(userService.signin(user.getUsername(), user.getMdp())));
        } catch (InvalidCredentialsException ex) {
            return ResponseEntity.badRequest().build();
        }
    }
	
	/**
	 * Methode Voir tous les users
	 * @return liste de tous les users
	 */
	@GetMapping("/get/users")
//	@PreAuthorize("hasRole('ROLE_CAPITAINE') or hasRole('ROLE_BUREAU') or hasRole('ROLE_LICENCIE')")
	public List<Users> getListeUsers() {
		
		List<Users> listeUsers = null;
		
//		try {
			listeUsers = usersRepo.findAll();
//		} catch (Exception e) {
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//		}
		return listeUsers;
//		return ResponseEntity.status(HttpStatus.OK).body(listeUsers);
	}
	
	/**
	 * Methode Voir un user
	 * @return liste un user
	 */
	@GetMapping("/get/unUser/{idUser}")
//	@PreAuthorize("hasRole('ROLE_BUREAU')")
	public ResponseEntity<?> getUnUser(@PathVariable Integer idUser) {
		
		Optional<Users> user = null;
		
		try {
			user = usersRepo.findById(idUser);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if (user == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(user);
	}
	
	/**
	 * Methode Voir un user
	 * @return liste un user
	 */
	@GetMapping("/get/byUser/{username}")
//	@PreAuthorize("hasRole('ROLE_BUREAU')")
	public ResponseEntity<?> getUserByUsername(@PathVariable String username) {
		
		Users user = null;
		
		try {
			user = usersRepo.findUserByUsername(username);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if (user == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(user);
	}
	
	/**
	 * Methode CREATE
	 * @param information user
	 * @return ajoute un user
	 */
	@PostMapping("/create")
//	@PreAuthorize("hasRole('ROLE_BUREAU')")
	public ResponseEntity<?> addUser(@RequestBody Users user) {
		
		Users newUser = null;
		String mdpUser = passwordEncoder.encode(user.getMdp());
		String usernameUser = user.getUsername();
		//Role roleUser = user.getRole();
		
		if ((mdpUser == null) || (mdpUser.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le mot de passe");
		}
		if ((usernameUser == null) || (usernameUser.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le nom d'utilisateur");
		}
		//if (roleUser == null) {
		//	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le rôle");
		//}
		
		newUser = usersRepo.save(user);
		return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
	}
	
	/**
	 * Methode DELETE
	 * @param idUser
	 * @return supprime un user
	 */
	@DeleteMapping("/delete/{idUser}")
//	@PreAuthorize("hasRole('ROLE_BUREAU')")
	public ResponseEntity<?> deleteUser(@PathVariable Integer idUser)
	{
		try
		{
			usersRepo.deleteById(idUser);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}
	
	/**
	 * Methode UPDATE
	 * @param information user et idUser
	 * @return modifie un user
	 */
	@PutMapping("/update/{idUser}")
//	@PreAuthorize("hasRole('ROLE_BUREAU')")
	public ResponseEntity<?> updateUser(@RequestBody Users user, @PathVariable Integer idUser) throws Exception
	{
		Users modificationUser = null;
		String mdpUser = user.getMdp();
		String usernameUser = user.getUsername();
		//Role roleUser = user.getRole();
		
		if ((mdpUser == null) || (mdpUser.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le mot de passe");
		}
		if ((usernameUser == null) || (usernameUser.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le nom d'utilisateur");
		}
		//if (roleUser == null) {
		//	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le rôle");
		//}
		
		try
		{
			modificationUser = usersRepo.save(user);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(modificationUser);
	}
}
