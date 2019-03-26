package usmvolley.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

@Entity
public class Users implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "id_user")
	private Integer idUser;
	
	@NotNull
	@Column(name = "username", unique = true)
	private String username;
	
	@NotNull
	@Column(name = "mdp")
	private String mdp;
	
	@Column(name = "is_Valide")
	private boolean isValide;

	@ElementCollection(fetch = FetchType.EAGER)
	@Enumerated(EnumType.STRING)
	private List<RoleUser> roleList;
	
	@ManyToOne
	@JoinColumn(name = "fonction")
	private Fonctions fonction;

	public Users() {
	}

	public Users(@NotNull String username,@NotNull String mdp) {
		this.username = username;
		this.mdp = mdp;
	}
	
	public Users(@NotNull String username,@NotNull String mdp, List<RoleUser> roleList) {
		this.username = username;
		this.mdp = mdp;
		this.roleList = roleList;
	}

	public Users(Integer idUser, String username, String mdp, boolean isValide, List<RoleUser> roleList,
			Fonctions fonction) {
		super();
		this.idUser = idUser;
		this.username = username;
		this.mdp = mdp;
		this.isValide = isValide;
		this.roleList = roleList;
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

	public List<RoleUser> getRoleList() {
		return roleList;
	}

	public void setRole(List<RoleUser> roleList) {
		this.roleList = roleList;
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
				+ ", role=" + roleList + "]";
	}
}
