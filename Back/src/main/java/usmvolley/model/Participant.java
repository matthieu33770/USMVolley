//package usmvolley.model;
//
//import java.io.Serializable;
//
//import javax.persistence.Entity;
//import javax.persistence.Id;
//import javax.persistence.IdClass;
//import javax.persistence.JoinColumn;
//import javax.persistence.OneToMany;
//
//@Entity
//@IdClass(ParticipationPK.class)
//public class Participant implements Serializable {
//
//	private static final long serialVersionUID = 1L;
//
//	private Joueurs joueur;
//    private Manifestations manifestation;
//    private Disponibilite disponibilite;
//    
//    @OneToMany
//    @JoinColumn(name="idJoueur", insertable=false, updatable=false)
//    public Joueurs getJoueur()
//    {
//        return this.joueur;
//    }
//    
//    @OneToMany
//    @JoinColumn(name="idManifestation", insertable=false, updatable=false)
//    public Manifestations getManifestation()
//    {
//        return this.manifestation;
//    }
//    
//    @OneToMany
//    @JoinColumn(name="idDisponibilite", insertable=false, updatable=false)
//    public Disponibilite getDisponibilite()
//    {
//        return this.disponibilite;
//    }
//    
//    @Id
//    public int getIdJoueur()
//    {
//        return this.joueur.getIdJoueur();
//    }
//    
//    @Id
//    public int getIdManifestation()
//    {
//        return this.manifestation.getIdManifestation();
//    }
//    
//    @Id
//    public int getIdDisponibilite()
//    {
//        return this.disponibilite.getIdDisponibilite();
//    }
//}
