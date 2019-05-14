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
	
	public Participation (Joueurs joueur, Manifestations manifestation, Disponibilite disponibilite) {
		this.participationPK = new ParticipationPK();
		participationPK.setJoueur(joueur);
		participationPK.setManifestation(manifestation);
		participationPK.setDisponibilite(disponibilite);
//		setParticipationPK(participationPK);
	}
	
	@EmbeddedId
	public ParticipationPK getParticipationPK() {
		return participationPK;
	}
	
	public void setParticipationPK(ParticipationPK participationPK) {
		this.participationPK = participationPK;
	}
}
