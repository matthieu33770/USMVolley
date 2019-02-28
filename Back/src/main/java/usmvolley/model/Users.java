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
	
	@Column(name = "mdp")
	private String mdp;
	
	@Column(name = "username")
	private String username;
	
	@ManyToOne
	@JoinColumn(name = "id_role")
	private Role role;

	public Users() {
	}

	public Users(Integer idUser, String mdp, String username, Role role) {
		this.idUser = idUser;
		this.mdp = mdp;
		this.username = username;
		this.role = role;
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

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	@Override
	public String toString() {
		return "Users [idUser=" + idUser + ", mdp=" + mdp + ", username=" + username + ", role=" + role + "]";
	}
}
