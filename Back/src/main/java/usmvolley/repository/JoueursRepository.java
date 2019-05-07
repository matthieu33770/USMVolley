package usmvolley.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import usmvolley.model.Joueurs;
import usmvolley.model.Users;

public interface JoueursRepository extends JpaRepository<Joueurs, Integer> {
	
	Optional<Joueurs> findJoueurByNom(String nom);
	
	Optional<Joueurs> findJoueurBySexe(String sexe);

	Joueurs findJoueurByUser(Users user);
}
