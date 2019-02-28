package usmvolley.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Role implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_role")
	private Integer idRole;
	
	@Column(name = "libelle_role")
	private String libelleRole;

	public Role() {
	}

	public Role(Integer idRole, String libelleRole) {
		this.idRole = idRole;
		this.libelleRole = libelleRole;
	}

	public Integer getIdRole() {
		return idRole;
	}

	public void setIdRole(Integer idRole) {
		this.idRole = idRole;
	}

	public String getLibelleRole() {
		return libelleRole;
	}

	public void setLibelleRole(String libelleRole) {
		this.libelleRole = libelleRole;
	}

	@Override
	public String toString() {
		return "Role [idRole=" + idRole + ", libelleRole=" + libelleRole + "]";
	}
}
