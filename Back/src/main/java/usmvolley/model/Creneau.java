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
public class Creneau implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_creneau")
	private Integer idCreneau;

	
	@Column(name = "creneau")
	private String creneau;
	
	@ManyToOne
	@JoinColumn(name = "id_categorie")
	private Categories categorie;

	public Creneau() {
	}

	public Creneau(Integer idCreneau, String creneau, Categories categorie) {
		this.idCreneau = idCreneau;
		this.creneau = creneau;
		this.categorie = categorie;
	}

	public Integer getIdCreneau() {
		return idCreneau;
	}

	public void setIdCreneau(Integer idCreneau) {
		this.idCreneau = idCreneau;
	}

	public String getCreneau() {
		return creneau;
	}

	public void setCreneau(String creneau) {
		this.creneau = creneau;
	}

	public Categories getCategorie() {
		return categorie;
	}

	public void setCategorie(Categories categorie) {
		this.categorie = categorie;
	}

	@Override
	public String toString() {
		return "Creneau [idCreneau=" + idCreneau + ", creneau=" + creneau + ", categorie=" + categorie + "]";
	}
}
