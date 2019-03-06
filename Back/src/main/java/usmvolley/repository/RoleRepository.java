package usmvolley.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import usmvolley.model.Role;

public interface RoleRepository extends JpaRepository<Role, Integer>{

	Optional<Role> findRoleByUsername (String username);
}
