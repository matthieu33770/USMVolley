package usmvolley.service;

import usmvolley.exception.ExistingUsernameException;
import usmvolley.exception.InvalidCredentialsException;
import usmvolley.model.Users;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface UserService {

    /**
     * Method that signs a user in the application.
     * @param username the user username.
     * @param password the user password.
     * @return the JWT if credentials are valid, throws InvalidCredentialsException otherwise.
     * @throws InvalidCredentialsException
     */
    String signin(String username, String mdp) throws InvalidCredentialsException;

    /**
     * Method that signs up a new user in the application.
     * @param user the new user to create.
     * @return the JWT if user username is not already existing.
     * @throws ExistingUsernameException
     */
    String signup(Users user) throws ExistingUsernameException;

    /**
     * Method that finds all users from the application database.
     * @return the list of all application users.
     */
    List<Users> findAllUsers();

    /**
     * Method that finds a user based on its username.
     * @param username the username to look for.
     * @return an Optional object containing user if found, empty otherwise.
     */
    Optional<Users> findUserByUserName(String username);
}
