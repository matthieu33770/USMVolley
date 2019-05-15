package usmvolley.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Articles implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id_article")
	private Integer idArticle;
	
	@Column(name = "titre_Article")
	private String titreArticle;
	
	@Column(name = "photo_Article")
	private String photoArticle;
	
	@Column(name = "contenu_Article", length= 650000)
	private String contenuArticle;

	public Articles() {
	}

	public Articles(Integer idArticle, String titreArticle, String photoArticle, String contenuArticle) {
		this.idArticle = idArticle;
		this.titreArticle = titreArticle;
		this.photoArticle = photoArticle;
		this.contenuArticle = contenuArticle;
	}

	public Integer getIdArticle() {
		return idArticle;
	}

	public void setIdArticle(Integer idArticle) {
		this.idArticle = idArticle;
	}

	public String getTitreArticle() {
		return titreArticle;
	}

	public void setTitreArticle(String titreArticle) {
		this.titreArticle = titreArticle;
	}

	public String getPhotoArticle() {
		return photoArticle;
	}

	public void setPhotoArticle(String photoArticle) {
		this.photoArticle = photoArticle;
	}

	public String getContenuArticle() {
		return contenuArticle;
	}

	public void setContenuArticle(String contenuArticle) {
		this.contenuArticle = contenuArticle;
	}

	@Override
	public String toString() {
		return "Articles [idArticle=" + idArticle + ", titreArticle=" + titreArticle + ", photoArticle=" + photoArticle
				+ ", contenuArticle=" + contenuArticle + "]";
	}
}
