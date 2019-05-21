package usmvolley.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import usmvolley.model.Categories;
import usmvolley.repository.CategoriesRepository;

@RestController
@RequestMapping("/categories")
public class CategoriesController {

	@Autowired
	private CategoriesRepository categorieRepo;
	
	/**
	 * Methode Voir toutes les cat�gories
	 * @return liste de toutes les cat�gories
	 */
	@GetMapping("/get/categories")
//	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine') or hasAuthority('Licencie')")
	public ResponseEntity<List<Categories>> getListeCategories() {
		
		List<Categories> listeCategories = null;
		
		try {
			listeCategories = categorieRepo.findAll();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(listeCategories);
	}
	
	/**
	 * Methode Voir une cat�gorie
	 * @return liste une cat�gorie
	 */
	@GetMapping("/get/uneCategorie/{idCategorie}")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<?> getUneCategorie(@PathVariable Integer idCategorie) {
		
		Optional<Categories> categorie = null;
		
		try {
			categorie = categorieRepo.findById(idCategorie);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if (categorie == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(categorie);
	}
	
	/**
	 * Methode CREATE
	 * @param information cat�gorie
	 * @return ajoute une cat�gorie
	 */
	@PostMapping("/create")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<?> addCategorie(@RequestBody Categories categorie) {
		
		Categories newCategorie = null;
		String libelleCategorie = categorie.getLibelleCategorie();
		
		if ((libelleCategorie == null) || (libelleCategorie.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le libell� de la cat�gorie");
		}
		
		newCategorie = categorieRepo.save(categorie);
		return ResponseEntity.status(HttpStatus.CREATED).body(newCategorie);
	}
	
	/**
	 * Methode DELETE
	 * @param idRole
	 * @return supprime une cat�gorie
	 */
	@DeleteMapping("/delete/{idCategorie}")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<?> deleteCategorie(@PathVariable Integer idCategorie)
	{
		try
		{
			categorieRepo.deleteById(idCategorie);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}
	
	/**
	 * Methode UPDATE
	 * @param information cat�gorie et idCat�gorie
	 * @return modifie une cat�gorie
	 */
	@PutMapping("/update/{idCategorie}")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<?> updateCategorie(@RequestBody Categories categorie, @PathVariable Integer idCategorie) throws Exception
	{
		Categories modificationCategorie = null;
		String libelleCategorie = categorie.getLibelleCategorie();
		if ((libelleCategorie == null) || (libelleCategorie.isEmpty()))
		{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le libell� de la cat�gorie");
		}
		try
		{
			modificationCategorie = categorieRepo.save(categorie);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(modificationCategorie);
	}
}
