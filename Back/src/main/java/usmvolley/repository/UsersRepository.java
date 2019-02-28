package usmvolley.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import usmvolley.model.Users;

public interface UsersRepository extends JpaRepository<Users, Integer>{

}
