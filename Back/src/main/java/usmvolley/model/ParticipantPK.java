package usmvolley.model;

import java.io.Serializable;

import javax.persistence.Embeddable;

@Embeddable
public class ParticipantPK implements Serializable {

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
}
