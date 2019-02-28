package usmvolley.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Avoir implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_avoir")
	private Integer idAvoir;
	
	@Column(name = "annee_avoir")
	private Integer anneeAvoir;
	
	@Column(name = "is_valide")
	private Boolean isValide;
	
	@ManyToOne
	@JoinColumn(name = "id_licence")
	private Licence licence;
	
	@ManyToOne
	@JoinColumn(name = "id_joueur")
	private Joueurs joueur;

	public Avoir() {
	}

	public Avoir(Integer idAvoir, Integer anneeAvoir, Boolean isValide, Licence licence, Joueurs joueur) {
		this.idAvoir = idAvoir;
		this.anneeAvoir = anneeAvoir;
		this.isValide = isValide;
		this.licence = licence;
		this.joueur = joueur;
	}

	public Integer getIdAvoir() {
		return idAvoir;
	}

	public void setIdAvoir(Integer idAvoir) {
		this.idAvoir = idAvoir;
	}

	public Integer getAnneeAvoir() {
		return anneeAvoir;
	}

	public void setAnneeAvoir(Integer anneeAvoir) {
		this.anneeAvoir = anneeAvoir;
	}

	public Boolean getIsValide() {
		return isValide;
	}

	public void setIsValide(Boolean isValide) {
		this.isValide = isValide;
	}

	public Licence getLicence() {
		return licence;
	}

	public void setLicence(Licence licence) {
		this.licence = licence;
	}

	public Joueurs getJoueur() {
		return joueur;
	}

	public void setJoueur(Joueurs joueur) {
		this.joueur = joueur;
	}

	@Override
	public String toString() {
		return "Avoir [idAvoir=" + idAvoir + ", anneeAvoir=" + anneeAvoir + ", isValide=" + isValide + ", licence="
				+ licence + ", joueur=" + joueur + "]";
	}
}
