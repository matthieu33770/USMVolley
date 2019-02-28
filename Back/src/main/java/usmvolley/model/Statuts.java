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
public class Statuts implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_statut")
	private Integer idStatut;
	
	@Column(name = "libelle_statut")
	private String libelleStatut;
	
	@ManyToOne
	@JoinColumn(name = "id_manifestation")
	private Manifestations manifestation;

	public Statuts() {
	}

	public Statuts(Integer idStatut, String libelleStatut, Manifestations manifestation) {
		super();
		this.idStatut = idStatut;
		this.libelleStatut = libelleStatut;
		this.manifestation = manifestation;
	}

	public Integer getIdStatut() {
		return idStatut;
	}

	public void setIdStatut(Integer idStatut) {
		this.idStatut = idStatut;
	}

	public String getLibelleStatut() {
		return libelleStatut;
	}

	public void setLibelleStatut(String libelleStatut) {
		this.libelleStatut = libelleStatut;
	}

	public Manifestations getManifestation() {
		return manifestation;
	}

	public void setManifestation(Manifestations manifestation) {
		this.manifestation = manifestation;
	}

	@Override
	public String toString() {
		return "Statuts [idStatut=" + idStatut + ", libelleStatut=" + libelleStatut + ", manifestation=" + manifestation
				+ "]";
	}
}
