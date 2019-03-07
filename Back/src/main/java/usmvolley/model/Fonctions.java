package usmvolley.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Fonctions implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id_fonction")
	private Integer idFonction;
	
	@Column(name = "libelle_fonction")
	private String libelleFonction;

	public Fonctions() {
		super();
	}

	public Fonctions(Integer idFonction, String libelleFonction) {
		super();
		this.idFonction = idFonction;
		this.libelleFonction = libelleFonction;
	}

	public Integer getIdFonction() {
		return idFonction;
	}

	public void setIdFonction(Integer idFonction) {
		this.idFonction = idFonction;
	}

	public String getLibelleFonction() {
		return libelleFonction;
	}

	public void setLibelleFonction(String libelleFonction) {
		this.libelleFonction = libelleFonction;
	}

	@Override
	public String toString() {
		return "Fonctions [idFonction=" + idFonction + ", libelleFonction=" + libelleFonction + "]";
	}
}
