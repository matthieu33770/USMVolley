package usmvolley.model;

import java.io.Serializable;
import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class Equipes implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_equipe")
	private Integer idEquipe;
	
	@Column(name = "libelle_equipe")
	private String libelleEquipe;

	@Column(name = "couleur_equipe")
	private String couleur;
	
	@ManyToOne
	@JoinColumn(name = "id_categorie")
	private Categories categorie;
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "Equipes_Joueurs", joinColumns = @JoinColumn(name = "id_equipe"), inverseJoinColumns = @JoinColumn(name = "id_joueur"))
	@JsonIgnoreProperties("equipes")
	private Collection<Joueurs> joueurs;
	
	

	public Equipes() {
	}

	public Equipes(Integer idEquipe, String libelleEquipe, String couleur, Categories categorie, Collection<Joueurs> joueurs) {
		this.idEquipe = idEquipe;
		this.libelleEquipe = libelleEquipe;
		this.couleur = couleur;
		this.categorie = categorie;
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

	public String getCouleur() {
		return couleur;
	}

	public void setCouleur(String couleur) {
		this.couleur = couleur;
	}

	public Categories getCategorie() {
		return categorie;
	}

	public void setCategorie(Categories categorie) {
		this.categorie = categorie;
	}

	public Collection<Joueurs> getJoueurs() {
		return joueurs;
	}

	public void setJoueurs(Collection<Joueurs> joueurs) {
		this.joueurs = joueurs;
	}

	@Override
	public String toString() {
		return "Equipes [idEquipe=" + idEquipe + ", libelleEquipe=" + libelleEquipe + ", categorie=" + categorie
				+ ", joueurs=" + joueurs + "]";
	}

}
