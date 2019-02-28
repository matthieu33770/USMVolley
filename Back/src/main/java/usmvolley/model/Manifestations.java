package usmvolley.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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

	public Manifestations() {
	}

	public Manifestations(Integer idManifestation, String libelleManifestation, String periodicite) {
		this.idManifestation = idManifestation;
		this.libelleManifestation = libelleManifestation;
		this.periodicite = periodicite;
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

	@Override
	public String toString() {
		return "Manifestations [idManifestation=" + idManifestation + ", libelleManifestation=" + libelleManifestation
				+ ", periodicite=" + periodicite + "]";
	}
}
