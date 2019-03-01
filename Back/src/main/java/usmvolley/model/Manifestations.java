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
public class Manifestations implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_manifestation")
	private Integer idManifestation;
	
	@Column(name = "libelle_manifestation")
	private String libelleManifestation;
	
	@Column(name = "periodicite")
	private String periodicite;
	
	@ManyToOne
	@JoinColumn(name = "id_equipe")
	private Equipes equipe;
	
	@ManyToOne
	@JoinColumn(name = "id_lieu")
	private Lieux lieu;
	
	@ManyToOne
	@JoinColumn(name = "id_inscrire")
	private Inscrire inscrire;
	
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

	public Manifestations(Integer idManifestation, String libelleManifestation, String periodicite, Equipes equipe,
			Lieux lieu, Inscrire inscrire, Statuts statut, Horaire horaire, Creneau creneau) {
		super();
		this.idManifestation = idManifestation;
		this.libelleManifestation = libelleManifestation;
		this.periodicite = periodicite;
		this.equipe = equipe;
		this.lieu = lieu;
		this.inscrire = inscrire;
		this.statut = statut;
		this.horaire = horaire;
		this.creneau = creneau;
	}

	public Integer getIdManifestation() {
		return idManifestation;
	}

	public void setIdManifestation(Integer idManifestation) {
		this.idManifestation = idManifestation;
	}

	public String getLibelleManifestation() {
		return libelleManifestation;
	}

	public void setLibelleManifestation(String libelleManifestation) {
		this.libelleManifestation = libelleManifestation;
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

	public Inscrire getInscrire() {
		return inscrire;
	}

	public void setInscrire(Inscrire inscrire) {
		this.inscrire = inscrire;
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
		return "Manifestations [idManifestation=" + idManifestation + ", libelleManifestation=" + libelleManifestation
				+ ", periodicite=" + periodicite + ", equipe=" + equipe + ", lieu=" + lieu + ", inscrire=" + inscrire
				+ ", statut=" + statut + ", horaire=" + horaire + ", creneau=" + creneau + "]";
	}
}
