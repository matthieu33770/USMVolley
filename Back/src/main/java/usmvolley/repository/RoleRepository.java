package usmvolley.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import usmvolley.model.RoleFonction;

public interface RoleRepository extends JpaRepository<RoleFonction, Integer>{

	Optional<RoleFonction> findRoleByUsername (String username);
}
