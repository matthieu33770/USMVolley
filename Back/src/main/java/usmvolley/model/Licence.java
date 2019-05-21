package usmvolley.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
public class Licence implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_licence")
	private Integer idLicence;
	
	@Column(name = "numero_licence")
	private String numeroLicence;
	
	@Column(name = "prix")
	private Double prixLicence;
	
	@OneToOne
	@JoinColumn(name = "id_categorie")
	private Categories categories;
	
	@Column(name = "formulaire")
	private String formulaire;
	
	@Column(name = "certificat_medical")
	private String certificatMedical;
	
	public Licence() {
	}

	public Licence(Integer idLicence, String numeroLicence, Double prixLicence, Categories categories,
			String formulaire, String certificatMedical) {
		super();
		this.idLicence = idLicence;
		this.numeroLicence = numeroLicence;
		this.prixLicence = prixLicence;
		this.categories = categories;
		this.formulaire = formulaire;
		this.certificatMedical = certificatMedical;
	}

	public Integer getIdLicence() {
		return idLicence;
	}

	public void setIdLicence(Integer idLicence) {
		this.idLicence = idLicence;
	}

	public Double getPrixLicence() {
		return prixLicence;
	}

	public void setPrixLicence(Double prixLicence) {
		this.prixLicence = prixLicence;
	}

	public Categories getCategories() {
		return categories;
	}

	public void setCategories(Categories categories) {
		this.categories = categories;
	}

	public String getFormulaire() {
		return formulaire;
	}

	public void setFormulaire(String formulaire) {
		this.formulaire = formulaire;
	}

	public String getCertificatMedical() {
		return certificatMedical;
	}

	public void setCertificatMedical(String certificatMedical) {
		this.certificatMedical = certificatMedical;
	}

	public String getNumeroLicence() {
		return numeroLicence;
	}

	public void setNumeroLicence(String numeroLicence) {
		this.numeroLicence = numeroLicence;
	}

	@Override
	public String toString() {
		return "Licence [idLicence=" + idLicence + ", numeroLicence=" + numeroLicence + ", prixLicence=" + prixLicence
				+ ", categories=" + categories + ", formulaire=" + formulaire + ", certificatMedical="
				+ certificatMedical + "]";
	}
}
