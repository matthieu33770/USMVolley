package usmvolley.model;

import java.io.Serializable;

import javax.persistence.CascadeType;
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
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "id_licence")
	private Licence licence;

	public Avoir() {
	}

	public Avoir(Integer idAvoir, Integer anneeAvoir, Boolean isValide, Licence licence) {
		this.idAvoir = idAvoir;
		this.anneeAvoir = anneeAvoir;
		this.isValide = isValide;
		this.licence = licence;
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

	@Override
	public String toString() {
		return "Avoir [idAvoir=" + idAvoir + ", anneeAvoir=" + anneeAvoir + ", isValide=" + isValide + ", licence="
				+ licence + "]";
	}
}
