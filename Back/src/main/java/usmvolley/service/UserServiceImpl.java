package usmvolley.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import usmvolley.exception.ExistingUsernameException;
import usmvolley.exception.InvalidCredentialsException;
import usmvolley.model.Users;
import usmvolley.repository.UsersRepository;
import usmvolley.security.JwtTokenProvider;

@Service
public class UserServiceImpl implements UserService {

    private UsersRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    private JwtTokenProvider jwtTokenProvider;
    private AuthenticationManager authenticationManager;
    
    public UserServiceImpl(UsersRepository userRepository, BCryptPasswordEncoder passwordEncoder,
                              JwtTokenProvider jwtTokenProvider, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public String signin(String username, String mdp) throws InvalidCredentialsException {
        try {
        	System.out.println("Je suis ici !");
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, mdp));
            System.out.println("Je suis l� !");
            return jwtTokenProvider.createToken(username, userRepository.findUserByUsername(username).get().getRoleList());
        } catch (AuthenticationException e) {
            throw new InvalidCredentialsException();
        }
    }

    @Override
    public String signup(Users user) throws ExistingUsernameException {
        if (!userRepository.existsByUsername(user.getUsername())) {
        	Users userToSave = new Users(user.getUsername(), passwordEncoder.encode(user.getMdp()), user.getRoleList());
            userRepository.save(userToSave);
            return jwtTokenProvider.createToken(user.getUsername(), user.getRoleList());
        } else {
            throw new ExistingUsernameException();
        }
    }

    @Override
    public List<Users> findAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<Users> findUserByUserName(String username) {
        return userRepository.findUserByUsername(username);
    }
}
