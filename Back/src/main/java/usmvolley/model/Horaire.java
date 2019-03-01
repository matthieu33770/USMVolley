package usmvolley.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Horaire implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_horaire")
	private Integer idHoraire;
	
	@Column(name = "date_horaire")
	private Date dateHoraire;

	public Horaire() {
	}

	public Horaire(Integer idHoraire, Date dateHoraire) {
		this.idHoraire = idHoraire;
		this.dateHoraire = dateHoraire;
	}

	public Integer getIdHoraire() {
		return idHoraire;
	}

	public void setIdHoraire(Integer idHoraire) {
		this.idHoraire = idHoraire;
	}

	public Date getDateHoraire() {
		return dateHoraire;
	}

	public void setDateHoraire(Date dateHoraire) {
		this.dateHoraire = dateHoraire;
	}

	@Override
	public String toString() {
		return "Horaire [idHoraire=" + idHoraire + ", dateHoraire=" + dateHoraire + "]";
	}
}
