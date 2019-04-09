package usmvolley.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Manifestations implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_manifestation")
	private Integer idManifestation;
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "date")
	private Date start;
	
	@Column(name = "periodicite")
	private String periodicite;
	
	@ManyToOne
	@JoinColumn(name = "id_equipe")
	private Equipes equipe;
	
	@ManyToOne
	@JoinColumn(name = "id_lieu")
	private Lieux lieu;
	
	@ManyToOne
	@JoinColumn(name = "id_statut")
	private Statuts statut;
	
	@ManyToOne
	@JoinColumn(name = "id_horaire")
	private Horaire horaire;
	
	@ManyToOne
	@JoinColumn(name = "id_creneau")
	private Creneau creneau;

	public Manifestations() {
	}
	

	public Manifestations(Integer idManifestation, String title, Date start, String periodicite, Equipes equipe,
			Lieux lieu, Statuts statut, Horaire horaire, Creneau creneau) {
		super();
		this.idManifestation = idManifestation;
		this.title = title;
		this.start = start;
		this.periodicite = periodicite;
		this.equipe = equipe;
		this.lieu = lieu;
		this.statut = statut;
		this.horaire = horaire;
		this.creneau = creneau;
	}

	public Date getStart() {
		return start;
	}

	public void setStart(Date start) {
		this.start = start;
	}


	public Integer getIdManifestation() {
		return idManifestation;
	}

	public void setIdManifestation(Integer idManifestation) {
		this.idManifestation = idManifestation;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getPeriodicite() {
		return periodicite;
	}

	public void setPeriodicite(String periodicite) {
		this.periodicite = periodicite;
	}

	public Equipes getEquipe() {
		return equipe;
	}

	public void setEquipe(Equipes equipe) {
		this.equipe = equipe;
	}

	public Lieux getLieu() {
		return lieu;
	}

	public void setLieu(Lieux lieu) {
		this.lieu = lieu;
	}

	public Statuts getStatut() {
		return statut;
	}

	public void setStatut(Statuts statut) {
		this.statut = statut;
	}

	public Horaire getHoraire() {
		return horaire;
	}

	public void setHoraire(Horaire horaire) {
		this.horaire = horaire;
	}

	public Creneau getCreneau() {
		return creneau;
	}

	public void setCreneau(Creneau creneau) {
		this.creneau = creneau;
	}

	@Override
	public String toString() {
		return "Manifestations [idManifestation=" + idManifestation + ", title=" + title + ", start=" + start
				+ ", periodicite=" + periodicite + ", equipe=" + equipe + ", lieu=" + lieu + ", statut=" + statut
				+ ", horaire=" + horaire + ", creneau=" + creneau + "]";
	}

}
