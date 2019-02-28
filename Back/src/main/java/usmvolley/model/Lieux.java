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
public class Lieux implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_lieu")
	private Integer idLieu;
	
	@Column(name = "lieu")
	private String lieu;
	
	@ManyToOne
	@JoinColumn(name = "id_manifestation")
	private Manifestations manifestation;

	public Lieux() {
	}
	
	public Lieux(Integer idLieu, String lieu, Manifestations manifestation) {
		super();
		this.idLieu = idLieu;
		this.lieu = lieu;
		this.manifestation = manifestation;
	}

	public Integer getIdLieu() {
		return idLieu;
	}
	
	public void setIdLieu(Integer idLieu) {
		this.idLieu = idLieu;
	}
	
	public String getLieu() {
		return lieu;
	}
	
	public void setLieu(String lieu) {
		this.lieu = lieu;
	}

	public Manifestations getManifestation() {
		return manifestation;
	}

	public void setManifestation(Manifestations manifestation) {
		this.manifestation = manifestation;
	}

	@Override
	public String toString() {
		return "Lieux [idLieu=" + idLieu + ", lieu=" + lieu + ", manifestation=" + manifestation + "]";
	}
}
