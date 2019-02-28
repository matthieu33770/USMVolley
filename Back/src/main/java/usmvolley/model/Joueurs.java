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
public class Joueurs implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_joueur")
	private Integer idJoueur;
	
	@Column(name = "nom")
	private String nom;
	
	@Column(name = "prenom")
	private String prenom;
	
	@Column(name = "numero_adresse")
	private Integer numeroAdresse;
	
	@Column(name = "rue")
	private String rue;
	
	@Column(name = "code_postal")
	private Integer codePostal;
	
	@Column(name = "ville")
	private String ville;
	
	@Column(name = "mail")
	private String mail;
	
	@Column(name = "telephone_1")
	private String telephone1;
	
	@Column(name = "telephone_2")
	private String telephone2;
	
	@Column(name = "date_naissance")
	private Date dateNaissance;
	
	@ManyToOne
	@JoinColumn(name = "id_user")
	private Users user;

	public Joueurs() {
	}

	public Joueurs(Integer idJoueur, String nom, String prenom, Integer numeroAdresse, String rue, Integer codePostal,
			String ville, String mail, String telephone1, String telephone2, Date dateNaissance, Users user) {
		this.idJoueur = idJoueur;
		this.nom = nom;
		this.prenom = prenom;
		this.numeroAdresse = numeroAdresse;
		this.rue = rue;
		this.codePostal = codePostal;
		this.ville = ville;
		this.mail = mail;
		this.telephone1 = telephone1;
		this.telephone2 = telephone2;
		this.dateNaissance = dateNaissance;
		this.user = user;
	}

	public Integer getIdJoueur() {
		return idJoueur;
	}

	public void setIdJoueur(Integer idJoueur) {
		this.idJoueur = idJoueur;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public Integer getNumeroAdresse() {
		return numeroAdresse;
	}

	public void setNumeroAdresse(Integer numeroAdresse) {
		this.numeroAdresse = numeroAdresse;
	}

	public String getRue() {
		return rue;
	}

	public void setRue(String rue) {
		this.rue = rue;
	}

	public Integer getCodePostal() {
		return codePostal;
	}

	public void setCodePostal(Integer codePostal) {
		this.codePostal = codePostal;
	}

	public String getVille() {
		return ville;
	}

	public void setVille(String ville) {
		this.ville = ville;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public String getTelephone1() {
		return telephone1;
	}

	public void setTelephone1(String telephone1) {
		this.telephone1 = telephone1;
	}

	public String getTelephone2() {
		return telephone2;
	}

	public void setTelephone2(String telephone2) {
		this.telephone2 = telephone2;
	}

	public Date getDateNaissance() {
		return dateNaissance;
	}

	public void setDateNaissance(Date dateNaissance) {
		this.dateNaissance = dateNaissance;
	}

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Joueurs [idJoueur=" + idJoueur + ", nom=" + nom + ", prenom=" + prenom + ", numeroAdresse="
				+ numeroAdresse + ", rue=" + rue + ", codePostal=" + codePostal + ", ville=" + ville + ", mail=" + mail
				+ ", telephone1=" + telephone1 + ", telephone2=" + telephone2 + ", dateNaissance=" + dateNaissance
				+ ", user=" + user + "]";
	}
	
	
}
