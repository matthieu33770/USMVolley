package usmvolley.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import usmvolley.model.Articles;
import usmvolley.repository.ArticlesRepository;
import usmvolley.service.PhotoStorageService;
import usmvolley.upload.FileInformation;
import usmvolley.upload.exception.UploadFileException;

@RestController
@RequestMapping("/articles")
//@CrossOrigin("http://localhost:4200")
public class ArticlesController {

	@Autowired
	private ArticlesRepository articlesRepo;
	
	@Autowired
	private PhotoStorageService photoStorageService;
	
	/**
	 * Methode Voir tous les articles
	 * @return liste de tous les articles
	 */
	@GetMapping("/get/articles")
	public ResponseEntity<List<Articles>> getListeArticles() {
		
		List<Articles> listeArticles = null;
		
		try {
			listeArticles = articlesRepo.findAll();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(listeArticles);
	}
	
	/**
	 * Methode Voir un article
	 * @return liste un articles
	 */
	@GetMapping("/get/unArticle/{idArticle}")
	public ResponseEntity<?> getUnArticle(@PathVariable Integer idArticle) {
		
		Optional<Articles> article = null;
		
		try {
			article = articlesRepo.findById(idArticle);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if (article == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(article);
	}
	
	/**
	 * Methode CREATE
	 * @param information article
	 * @return ajoute un article
	 */
	@PostMapping("/create")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<?> addArticle(@RequestBody Articles article) {
		
		Articles newArticle = null;
		String titreArticle = article.getTitreArticle();
		String photoArticle = article.getPhotoArticle();
		String contenuArticle = article.getContenuArticle();
		
		if ((titreArticle == null) || (titreArticle.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le titre de l'article");
		}
		if ((contenuArticle == null) || (contenuArticle.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le contenu de l'article");
		}
		
		newArticle = articlesRepo.save(article);
		return ResponseEntity.status(HttpStatus.CREATED).body(newArticle);
	}
	
	/**
	 * Methode DELETE
	 * @param idArticle
	 * @return supprime une equipe
	 */
	@DeleteMapping("/delete/{idArticle}")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<?> deleteArticle(@PathVariable Integer idArticle)
	{
		try
		{
			System.out.println("article supprimé : " + idArticle);
			articlesRepo.deleteById(idArticle);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}
	
	/**
	 * Methode UPDATE
	 * @param information article et idArticle
	 * @return modifie un articles
	 */
	@PutMapping("/update/{idArticle}")	
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<?> updateArticle(@RequestBody Articles article, @PathVariable Integer idArticle) throws Exception
	{
		Articles modificationArticle = null;
		String titreArticle = article.getTitreArticle();
		String contenuArticle = article.getContenuArticle();
		
		if (article.getPhotoArticle() != null ) {
			String photoArticle = article.getPhotoArticle();
		}
		
		System.out.println("Article Modifié : " + article);
		
		if ((titreArticle == null) || (titreArticle.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le titre de l'article");
		}
		if ((contenuArticle == null) || (contenuArticle.isEmpty())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le contenu de l'article");
		}

		try
		{
			modificationArticle = articlesRepo.save(article);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(modificationArticle);
	}
	
	// upload a file and put it in D:\\eclipse-workspace\\USMVolley\\Front\\src\\assets\\documents\\ and memorize its name in DB   
	@PostMapping(value = "/upload", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
		public ResponseEntity<?> uploadFile(@RequestParam("data") MultipartFile multipartFile) throws UploadFileException, IllegalStateException, IOException {
				
			    if (multipartFile == null || multipartFile.isEmpty()) {
			      throw new UploadFileException();
			    }
			    
			    this.photoStorageService.storeFile(multipartFile);
			    System.out.println(multipartFile.getOriginalFilename());
			    System.out.println(multipartFile.getSize());
			    
//			    multipartFile.transferTo(new File("D:\\eclipse-workspace\\USMVolley\\Front\\src\\assets\\documents\\" + multipartFile.getOriginalFilename()));
			    return new ResponseEntity<>(new FileInformation(multipartFile.getOriginalFilename(), multipartFile.getSize()), HttpStatus.CREATED);
			}
}
