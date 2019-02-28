package usmvolley.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import usmvolley.model.Lieux;

@Repository
public interface LieuxRepository extends JpaRepository<Lieux, Integer> {

}
