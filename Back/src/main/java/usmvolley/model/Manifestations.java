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
	
	@Column(name = "adversaire")
	private String adversaire;
	
	@Column(name = "date")
	private Date start;
	
	@ManyToOne
	@JoinColumn(name = "id_equipe")
	private Equipes equipe;
	
	@ManyToOne
	@JoinColumn(name = "id_lieu")
	private Lieux lieu;
	
	@ManyToOne
	@JoinColumn(name = "id_statut")
	private Statuts statut;

	public Manifestations() {
	}
	

	public Manifestations(Integer idManifestation, String title, String adversaire, Date start, Equipes equipe,
			Lieux lieu, Statuts statut) {
		super();
		this.idManifestation = idManifestation;
		this.title = title;
		this.adversaire = adversaire;
		this.start = start;
		this.equipe = equipe;
		this.lieu = lieu;
		this.statut = statut;
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

	public String getAdversaire() {
		return adversaire;
	}

	public void setAdversaire(String adversaire) {
		this.adversaire = adversaire;
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

	@Override
	public String toString() {
		return "Manifestations [idManifestation=" + idManifestation + ", title=" + title + ", start=" + start
				+ ", equipe=" + equipe + ", lieu=" + lieu + ", statut=" + statut
				+ "]";
	}

}
