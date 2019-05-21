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
import usmvolley.model.Licence;
import usmvolley.repository.LicenceRepository;

@RestController
@RequestMapping("/licences")
public class LicenceController {

	@Autowired
	private LicenceRepository licenceRepo;
	
	/**
	 * Methode Voir toutes les licences
	 * @return liste de toutes les licences
	 */
	@GetMapping("/get/licences")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<List<Licence>> getListeLicences() {
		
		List<Licence> listeLicences = null;
		
		try {
			listeLicences = licenceRepo.findAll();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(listeLicences);
	}
	
	/**
	 * Methode Voir une licence
	 * @return liste une licence
	 */
	@GetMapping("/get/uneLicence/{idLicence}")
	@PreAuthorize("hasAuthority('Bureau') or hasAuthority('Capitaine')")
	public ResponseEntity<?> getUneLicence(@PathVariable Integer idLicence) {
		
		Optional<Licence> licence = null;
		
		try {
			licence = licenceRepo.findById(idLicence);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
		if (licence == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(licence);
	}
	
	/**
	 * Methode CREATE
	 * @param information licence
	 * @return ajoute une licence
	 */
	@PostMapping("/create")
	@PreAuthorize("hasAuthority('Bureau')")
	public ResponseEntity<?> addLicence(@RequestBody Licence licence) {
		
		Licence newLicence = null;
		Double prixLicence = licence.getPrixLicence();
		Categories categorieLicence = licence.getCategories();
		String formulaireLicence = licence.getFormulaire();
		String certificatMedicalLicence = licence.getCertificatMedical();
		
		if (prixLicence == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le prix de la licence");
		}
		if (categorieLicence == null)
		{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque la cat�gorie de la licence");
		}
		if ((formulaireLicence == null) || (formulaireLicence.isEmpty()))
		{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le formulaire");
		}
		if ((certificatMedicalLicence == null) || (certificatMedicalLicence.isEmpty()))
		{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le certificat m�dical");
		}
		
		newLicence = licenceRepo.save(licence);
		return ResponseEntity.status(HttpStatus.CREATED).body(newLicence);
	}
	
	/**
	 * Methode DELETE
	 * @param idRole
	 * @return supprime une licence
	 */
	@DeleteMapping("/delete/{idLicence}")
	@PreAuthorize("hasAuthority('Bureau')")
	public ResponseEntity<?> deleteLicence(@PathVariable Integer idLicence)
	{
		try
		{
			licenceRepo.deleteById(idLicence);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}
	
	/**
	 * Methode UPDATE
	 * @param information licence et idLicence
	 * @return modifie une licence
	 */
	@PutMapping("/update/{idLicence}")
	@PreAuthorize("hasAuthority('Bureau')")
	public ResponseEntity<?> updateLicence(@RequestBody Licence licence, @PathVariable Integer idLicence) throws Exception
	{
		Licence modificationLicence = null;
		Double prixLicence = licence.getPrixLicence();
		Categories categorieLicence = licence.getCategories();
		String formulaireLicence = licence.getFormulaire();
		String certificatMedicalLicence = licence.getCertificatMedical();
		
		if (prixLicence == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le prix de la licence");
		}
		if (categorieLicence == null)
		{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque la cat�gorie de la licence");
		}
		if ((formulaireLicence == null) || (formulaireLicence.isEmpty()))
		{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le formulaire");
		}
		if ((certificatMedicalLicence == null) || (certificatMedicalLicence.isEmpty()))
		{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Il manque le certificat m�dical");
		}
		
		try
		{
			modificationLicence = licenceRepo.save(licence);
		} catch (Exception e)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(modificationLicence);
	}
}
