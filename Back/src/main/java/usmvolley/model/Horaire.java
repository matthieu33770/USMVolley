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
public class Horaire implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_horaire")
	private Integer idHoraire;
	
	@Column(name = "date_horaire")
	private Date dateHoraire;
	
	@Column(name = "heure_horaire")
	private Integer heureHoraire;

	public Horaire() {
	}

	public Horaire(Integer idHoraire, Date dateHoraire, Integer heureHoraire) {
		this.idHoraire = idHoraire;
		this.dateHoraire = dateHoraire;
		this.heureHoraire = heureHoraire;
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

	public Integer getHeureHoraire() {
		return heureHoraire;
	}

	public void setHeureHoraire(Integer heureHoraire) {
		this.heureHoraire = heureHoraire;
	}

	@Override
	public String toString() {
		return "Horaire [idHoraire=" + idHoraire + ", dateHoraire=" + dateHoraire + ", heureHoraire=" + heureHoraire
				+ "]";
	}
}
