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
	
	@Column(name = "prix")
	private Double prixLicence;
	
	@OneToOne
	@JoinColumn(name = "id_categorie")
	private Categories categories;
	
	@Column(name = "formulaire")
	private String formulaire;
	
	@Column(name = "certificat_medical")
	private String certificatMedical;
	
	@Column(name = "is_paye")
	private Boolean isPaye;
	
	@Column(name = "id_paiement")
	private String idPaiement;
	
	@Column(name = "montant_paye")
	private Double montantPaye;

	public Licence() {
	}

	public Licence(Integer idLicence, Double prixLicence, Categories categories, String formulaire,
			String certificatMedical, Boolean isPaye, String idPaiement, Double montantPaye) {
		this.idLicence = idLicence;
		this.prixLicence = prixLicence;
		this.categories = categories;
		this.formulaire = formulaire;
		this.certificatMedical = certificatMedical;
		this.isPaye = isPaye;
		this.idPaiement = idPaiement;
		this.montantPaye = montantPaye;
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

	public Boolean getIsPaye() {
		return isPaye;
	}

	public void setIsPaye(Boolean isPaye) {
		this.isPaye = isPaye;
	}

	public String getIdPaiement() {
		return idPaiement;
	}

	public void setIdPaiement(String idPaiement) {
		this.idPaiement = idPaiement;
	}

	public Double getMontantPaye() {
		return montantPaye;
	}

	public void setMontantPaye(Double montantPaye) {
		this.montantPaye = montantPaye;
	}

	@Override
	public String toString() {
		return "Licence [idLicence=" + idLicence + ", prixLicence=" + prixLicence + ", categories=" + categories
				+ ", formulaire=" + formulaire + ", certificatMedical=" + certificatMedical + ", isPaye=" + isPaye
				+ ", idPaiement=" + idPaiement + ", montantPaye=" + montantPaye + "]";
	}
}
