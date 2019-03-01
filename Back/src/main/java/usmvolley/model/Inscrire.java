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
public class Inscrire implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_inscrire")
	private Integer idInscrire;
	
	@Column(name = "disponibe")
	private String disponible;
	
	@Column(name = "is_selectionne")
	private Boolean isSelectionne;
	
	@ManyToOne
	@JoinColumn(name = "id_joueur")
	private Joueurs joueur;
	
	@ManyToOne
	@JoinColumn(name = "id_manifestation")
	private Manifestations manifestation;

	public Inscrire() {
	}

	public Inscrire(Integer idInscrire, String disponible, Boolean isSelectionne, Joueurs joueur,
			Manifestations manifestation) {
		super();
		this.idInscrire = idInscrire;
		this.disponible = disponible;
		this.isSelectionne = isSelectionne;
		this.joueur = joueur;
		this.manifestation = manifestation;
	}

	public Integer getIdInscrire() {
		return idInscrire;
	}

	public void setIdInscrire(Integer idInscrire) {
		this.idInscrire = idInscrire;
	}

	public String getDisponible() {
		return disponible;
	}

	public void setDisponible(String disponible) {
		this.disponible = disponible;
	}

	public Boolean getIsSelectionne() {
		return isSelectionne;
	}

	public void setIsSelectionne(Boolean isSelectionne) {
		this.isSelectionne = isSelectionne;
	}
	public Joueurs getJoueur() {
		return joueur;
	}

	public void setJoueur(Joueurs joueur) {
		this.joueur = joueur;
	}

	public Manifestations getManifestation() {
		return manifestation;
	}

	public void setManifestation(Manifestations manifestation) {
		this.manifestation = manifestation;
	}

	@Override
	public String toString() {
		return "Inscrire [idInscrire=" + idInscrire + ", disponible=" + disponible + ", isSelectionne=" + isSelectionne
				+ ", joueur=" + joueur + ", manifestation=" + manifestation + "]";
	}
}
