package usmvolley.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Equipes implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_equipe")
	private Integer idEquipe;
	
	@Column(name = "libelle_equipe")
	private String libelleEquipe;

	public Equipes() {
	}

	public Equipes(int idEquipe, String libelleEquipe) {
		this.idEquipe = idEquipe;
		this.libelleEquipe = libelleEquipe;
	}

	public int getIdEquipe() {
		return idEquipe;
	}

	public void setIdEquipe(int idEquipe) {
		this.idEquipe = idEquipe;
	}

	public String getLibelleEquipe() {
		return libelleEquipe;
	}

	public void setLibelleEquipe(String libelleEquipe) {
		this.libelleEquipe = libelleEquipe;
	}

	@Override
	public String toString() {
		return "Equipes [idEquipe=" + idEquipe + ", libelleEquipe=" + libelleEquipe + "]";
	}
}
