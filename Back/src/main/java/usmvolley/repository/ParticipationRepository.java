package usmvolley.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import usmvolley.model.Participation;
import usmvolley.model.ParticipationPK;

public interface ParticipationRepository extends JpaRepository<Participation, ParticipationPK>{

	Participation save(ParticipationPK participationPK);

	@Query(value="SELECT * FROM participation WHERE id_manifestation = ?", nativeQuery=true)
	List<Participation> findAllParManifestation(int idManifestation);
	
	@Transactional
	@Modifying
	@Query(value="DELETE FROM participation WHERE id_manifestation = ? AND id_joueur = ? AND id_disponibilite = ?;", nativeQuery=true)
	void deleteParticipation(int idManifestation, int idJoueur, int idDisponibilite);

}
