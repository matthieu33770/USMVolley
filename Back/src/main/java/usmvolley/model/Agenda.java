package usmvolley.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Agenda implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_agenda")
	private Integer idAgenda;

	public Agenda() {
	}

	public Agenda(Integer idAgenda) {
		this.idAgenda = idAgenda;
	}

	public Integer getIdAgenda() {
		return idAgenda;
	}

	public void setIdAgenda(Integer idAgenda) {
		this.idAgenda = idAgenda;
	}

	@Override
	public String toString() {
		return "Agenda [idAgenda=" + idAgenda + "]";
	}
}
