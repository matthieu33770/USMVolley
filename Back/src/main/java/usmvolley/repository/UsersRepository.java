package usmvolley.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import usmvolley.model.Users;

public interface UsersRepository extends JpaRepository<Users, Integer>{
	
	Optional<Users> findUserByUsername(String userName);

}
