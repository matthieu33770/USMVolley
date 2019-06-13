package usmvolley.model;

import java.io.Serializable;
import java.util.Collection;
import java.sql.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
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
	
	@Column(name = "sexe")
	private String sexe;
	
	@Column(name = "taille")
	private String taille;
	
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
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "id_user")
	private Users user;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "id_avoir")
	private Avoir avoir;
	
	@ManyToMany(mappedBy = "joueurs")
	private Collection<Equipes> equipes;
	
	public Joueurs() {
	}

	public Joueurs(Integer idJoueur, String nom, String prenom, String sexe, String taille, Integer numeroAdresse,
			String rue, Integer codePostal, String ville, String mail, String telephone1, String telephone2,
			Date dateNaissance, Users user, Avoir avoir, Collection<Equipes> equipes) {
		this.idJoueur = idJoueur;
		this.nom = nom;
		this.prenom = prenom;
		this.sexe = sexe;
		this.taille = taille;
		this.numeroAdresse = numeroAdresse;
		this.rue = rue;
		this.codePostal = codePostal;
		this.ville = ville;
		this.mail = mail;
		this.telephone1 = telephone1;
		this.telephone2 = telephone2;
		this.dateNaissance = dateNaissance;
		this.user = user;
		this.avoir = avoir;
		this.equipes = equipes;
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

	public String getSexe() {
		return sexe;
	}

	public void setSexe(String sexe) {
		this.sexe = sexe;
	}

	public String getTaille() {
		return taille;
	}

	public void setTaille(String taille) {
		this.taille = taille;
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

	public Avoir getAvoir() {
		return avoir;
	}

	public void setAvoir(Avoir avoir) {
		this.avoir = avoir;
	}

	public Collection<Equipes> getEquipes() {
		return equipes;
	}

	public void setEquipes(Collection<Equipes> equipes) {
		this.equipes = equipes;
	}

	@Override
	public String toString() {
		return "Joueurs [idJoueur=" + idJoueur + ", nom=" + nom + ", prenom=" + prenom + ", sexe=" + sexe + ", taille="
				+ taille + ", numeroAdresse=" + numeroAdresse + ", rue=" + rue + ", codePostal=" + codePostal
				+ ", ville=" + ville + ", mail=" + mail + ", telephone1=" + telephone1 + ", telephone2=" + telephone2
				+ ", dateNaissance=" + dateNaissance + ", user=" + user + ", avoir=" + avoir + ", equipes=" + equipes
				+ "]";
	}

}
