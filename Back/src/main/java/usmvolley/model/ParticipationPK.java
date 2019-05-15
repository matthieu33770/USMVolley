package usmvolley.model;

import java.io.Serializable;

import javax.persistence.Embeddable;

@Embeddable
public class ParticipationPK implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private int idJoueur;
	private int idManifestation;
	private int idDisponibilite;
	
	public int getIdJoueur() {
		return idJoueur;
	}
	public void setIdJoueur(int idJoueur) {
		this.idJoueur = idJoueur;
	}
	public int getIdManifestation() {
		return idManifestation;
	}
	public void setIdManifestation(int idManifestation) {
		this.idManifestation = idManifestation;
	}
	public int getIdDisponibilite() {
		return idDisponibilite;
	}
	public void setIdDisponibilite(int idDisponibilite) {
		this.idDisponibilite = idDisponibilite;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + idDisponibilite;
		result = prime * result + idJoueur;
		result = prime * result + idManifestation;
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
		if (idDisponibilite != other.idDisponibilite)
			return false;
		if (idJoueur != other.idJoueur)
			return false;
		if (idManifestation != other.idManifestation)
			return false;
		return true;
	}
}
