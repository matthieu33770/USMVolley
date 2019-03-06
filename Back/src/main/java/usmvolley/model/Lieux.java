package usmvolley.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Lieux implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_lieu")
	private Integer idLieu;
	
	@Column(name = "lieu")
	private String lieu;

	public Lieux() {
	}
	
	public Lieux(Integer idLieu, String lieu) {
		super();
		this.idLieu = idLieu;
		this.lieu = lieu;
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

	@Override
	public String toString() {
		return "Lieux [idLieu=" + idLieu + ", lieu=" + lieu + "]";
	}
}
