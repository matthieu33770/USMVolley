package usmvolley.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import usmvolley.model.Articles;

public interface ArticlesRepository extends JpaRepository<Articles, Integer>{

}
