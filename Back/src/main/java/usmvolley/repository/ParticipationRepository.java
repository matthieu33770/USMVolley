package usmvolley.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import usmvolley.model.Participation;
import usmvolley.model.ParticipationPK;

public interface ParticipationRepository extends JpaRepository<Participation, ParticipationPK>{

	Participation save(ParticipationPK participationPK);

}
