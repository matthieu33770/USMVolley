package usmvolley.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Categories implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_categorie")
	private Integer idCategorie;
	
	@Column(name = "libelle_categoriee")
	private String libelleCategorie;
	
	@Column(name = "age_max")
	private Integer ageMax;

	public Categories() {
	}

	public Categories(Integer idCategorie, String libelleCategorie, Integer ageMax) {
		this.idCategorie = idCategorie;
		this.libelleCategorie = libelleCategorie;
		this.ageMax = ageMax;
	}

	public Integer getIdCategorie() {
		return idCategorie;
	}

	public void setIdCategorie(Integer idCategorie) {
		this.idCategorie = idCategorie;
	}

	public String getLibelleCategorie() {
		return libelleCategorie;
	}

	public void setLibelleCategorie(String libelleCategorie) {
		this.libelleCategorie = libelleCategorie;
	}

	public Integer getAgeMax() {
		return ageMax;
	}

	public void setAgeMax(Integer ageMax) {
		this.ageMax = ageMax;
	}

	@Override
	public String toString() {
		return "Categories [idCategorie=" + idCategorie + ", libelleCategorie=" + libelleCategorie + ", ageMax="
				+ ageMax + "]";
	}
	
}