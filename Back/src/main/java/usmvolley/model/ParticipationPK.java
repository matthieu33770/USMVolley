package usmvolley.model;

import java.io.Serializable;

import javax.persistence.Embeddable;

@Embeddable
public class ParticipationPK implements Serializable {

	private static final long serialVersionUID = 1L;

	private Joueurs joueur;
	private Manifestations manifestation;
	private Disponibilite disponibilite;
	
	public ParticipationPK() {}

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

	public Disponibilite getDisponibilite() {
		return disponibilite;
	}

	public void setDisponibilite(Disponibilite disponibilite) {
		this.disponibilite = disponibilite;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((disponibilite == null) ? 0 : disponibilite.hashCode());
		result = prime * result + ((joueur == null) ? 0 : joueur.hashCode());
		result = prime * result + ((manifestation == null) ? 0 : manifestation.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ParticipationPK other = (ParticipationPK) obj;
		if (disponibilite == null) {
			if (other.disponibilite != null)
				return false;
		} else if (!disponibilite.equals(other.disponibilite))
			return false;
		if (joueur == null) {
			if (other.joueur != null)
				return false;
		} else if (!joueur.equals(other.joueur))
			return false;
		if (manifestation == null) {
			if (other.manifestation != null)
				return false;
		} else if (!manifestation.equals(other.manifestation))
			return false;
		return true;
	}

	
}
