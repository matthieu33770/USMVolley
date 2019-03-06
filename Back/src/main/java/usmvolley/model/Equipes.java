package usmvolley.model;

import java.io.Serializable;
import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Equipes implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_equipe")
	private Integer idEquipe;
	
	@Column(name = "libelle_equipe")
	private String libelleEquipe;
	
	@ManyToMany(cascade = CascadeType.REMOVE, mappedBy = "equipes")
	@JsonIgnore
	private Collection<Joueurs> joueurs;

	public Equipes() {
	}

	public Equipes(Integer idEquipe, String libelleEquipe, Collection<Joueurs> joueurs) {
		super();
		this.idEquipe = idEquipe;
		this.libelleEquipe = libelleEquipe;
		this.joueurs = joueurs;
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

	public Collection<Joueurs> getJoueurs() {
		return joueurs;
	}

	public void setJoueurs(Collection<Joueurs> joueurs) {
		this.joueurs = joueurs;
	}

	@Override
	public String toString() {
		return "Equipes [idEquipe=" + idEquipe + ", libelleEquipe=" + libelleEquipe + ", joueurs=" + joueurs
				+ "]";
	}

}
