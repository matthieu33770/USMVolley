package usmvolley;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import usmvolley.service.UserService;

@SpringBootApplication
public class UsmVolleyApplication {
	
    @Autowired
    UserService userService;

	public static void main(String[] args) {
		SpringApplication.run(UsmVolleyApplication.class, args);
	}
	
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
