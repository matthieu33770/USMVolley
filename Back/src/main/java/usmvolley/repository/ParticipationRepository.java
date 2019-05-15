package usmvolley.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import usmvolley.model.Participation;
import usmvolley.model.ParticipationPK;

public interface ParticipationRepository extends JpaRepository<Participation, ParticipationPK>{

	Participation save(ParticipationPK participationPK);

	@Query(value="SELECT * FROM participation WHERE id_manifestation = ?", nativeQuery=true)
	List<Participation> findAllParManifestation(int idManifestation);

}
