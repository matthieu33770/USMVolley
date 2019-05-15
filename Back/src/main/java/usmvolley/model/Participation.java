package usmvolley.model;

import java.io.Serializable;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Entity
public class Participation implements Serializable {

	private static final long serialVersionUID = 1L;

	private ParticipationPK participationPK;
	
	protected Participation () {
		this.participationPK = new ParticipationPK();
	}
	
	public Participation (int idJoueur, int idManifestation, int idDisponibilite) {
		
		this.participationPK = new ParticipationPK();
		
		participationPK.setIdJoueur(idJoueur);
		participationPK.setIdManifestation(idManifestation);
		participationPK.setIdDisponibilite(idDisponibilite);
	}
	
	@EmbeddedId
	public ParticipationPK getParticipationPK() {
		return participationPK;
	}
	
	public void setParticipationPK(ParticipationPK participationPK) {
		this.participationPK = participationPK;
	}
}
