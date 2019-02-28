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
public class Posseder implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_posseder")
	private Integer idPosseder;
	
	@Column(name = "saison")
	private String saison;
	
	@ManyToOne
	@JoinColumn(name = "id_agenda")
	private Agenda agenda;
	
	@ManyToOne
	@JoinColumn(name = "id_manifestation")
	private Manifestations manifestation;

	public Posseder() {
	}

	public Posseder(Integer idPosseder, String saison, Agenda agenda, Manifestations manifestation) {
		this.idPosseder = idPosseder;
		this.saison = saison;
		this.agenda = agenda;
		this.manifestation = manifestation;
	}

	public Integer getIdPosseder() {
		return idPosseder;
	}

	public void setIdPosseder(Integer idPosseder) {
		this.idPosseder = idPosseder;
	}

	public String getSaison() {
		return saison;
	}

	public void setSaison(String saison) {
		this.saison = saison;
	}

	public Agenda getAgenda() {
		return agenda;
	}

	public void setAgenda(Agenda agenda) {
		this.agenda = agenda;
	}

	public Manifestations getManifestation() {
		return manifestation;
	}

	public void setManifestation(Manifestations manifestation) {
		this.manifestation = manifestation;
	}

	@Override
	public String toString() {
		return "Posseder [idPosseder=" + idPosseder + ", saison=" + saison + ", agenda=" + agenda + ", manifestation="
				+ manifestation + "]";
	}	
}
