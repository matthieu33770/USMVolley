package usmvolley.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Disponibilite implements Serializable{

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_disponibilite")
	private Integer idDisponibilite;
	
	@Column(name = "libelle_disponibilite")
	private String libelleDisponibilite;

	public Disponibilite() {
	}

	public Disponibilite(Integer idDisponibilite, String libelleDisponibilite) {
		this.idDisponibilite = idDisponibilite;
		this.libelleDisponibilite = libelleDisponibilite;
	}

	public Integer getIdDisponibilite() {
		return idDisponibilite;
	}

	public void setIdDisponibilite(Integer idDisponibilite) {
		this.idDisponibilite = idDisponibilite;
	}

	public String getLibelleDisponibilite() {
		return libelleDisponibilite;
	}

	public void setLibelleDisponibilite(String libelleDisponibilite) {
		this.libelleDisponibilite = libelleDisponibilite;
	}

	@Override
	public String toString() {
		return "Disponibilite [idDisponibilite=" + idDisponibilite + ", libelleDisponibilite=" + libelleDisponibilite
				+ "]";
	}
}
