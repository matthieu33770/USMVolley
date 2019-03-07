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
public class Users implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id_user")
	private Integer idUser;
	
	@Column(name = "username", unique = true)
	private String username;
	
	@Column(name = "mdp")
	private String mdp;
	
	@Column(name = "is_Valide")
	private boolean isValide;

	@Column(name = "id_role")
	private Integer role;
	
	@ManyToOne
	@JoinColumn(name = "fonction")
	private Fonctions fonction;

	public Users() {
	}

	public Users(Integer idUser, String username, String mdp, boolean isValide, Integer role, Fonctions fonction) {
		super();
		this.idUser = idUser;
		this.username = username;
		this.mdp = mdp;
		this.isValide = isValide;
		this.role = role;
		this.fonction = fonction;
	}

	public Integer getIdUser() {
		return idUser;
	}

	public void setIdUser(Integer idUser) {
		this.idUser = idUser;
	}

	public String getMdp() {
		return mdp;
	}

	public void setMdp(String mdp) {
		this.mdp = mdp;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public boolean isValide() {
		return isValide;
	}

	public void setValide(boolean isValide) {
		this.isValide = isValide;
	}

	public Integer getRole() {
		return role;
	}

	public void setRole(Integer role) {
		this.role = role;
	}

	public Fonctions getFonction() {
		return fonction;
	}

	public void setIdFonction(Fonctions fonction) {
		this.fonction = fonction;
	}

	@Override
	public String toString() {
		return "Users [idUser=" + idUser + ", username=" + username + ", mdp=" + mdp + ", isValide=" + isValide
				+ ", role=" + role + "]";
	}
}
