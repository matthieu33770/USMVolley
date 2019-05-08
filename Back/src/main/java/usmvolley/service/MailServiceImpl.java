package usmvolley.service;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.stereotype.Service;

@Service
public class MailServiceImpl implements MailService{
	
	private static final String MAIL_FROM = "david.sylvestre.lp2@gmail.com";
	
	/**
	 * Methode d'envoi d'un email
	 * @param String to l'adresse mail du destinataire
	 * @param String from l'adresse mail de l'expediteur
	 * @param String title le sujet du mail
	 * @param String mail Le corps du mail
	 */
	public void send(String to, String from, String title, String mail) {
		
		final String username = "david.sylvestre.lp2@gmail.com";// change accordingly
		final String password = "Myriamelenajeremy24";// change accordingly
		// Assuming you are sending email through relay.jangosmtp.net
				String host = "smtp.gmail.com";

				Properties props = new Properties();
//				props.put("mail.smtp.auth", "true");
				props.put("mail.smtp.starttls.enable", "true");
				props.put("mail.smtp.host", host);
				props.put("mail.smtp.port", "587");

				// Get the Session object.
				Session session = Session.getInstance(props, new javax.mail.Authenticator() {
					protected PasswordAuthentication getPasswordAuthentication() {
						return new PasswordAuthentication(username, password);
					}
				});

				try {
					// Create a default MimeMessage object.
					Message message = new MimeMessage(session);

					// Set From: header field of the header.
					message.setFrom(new InternetAddress(from));
					
					message.setReplyTo(new javax.mail.Address[]
							{
							    new javax.mail.internet.InternetAddress(from)
							});

					// Set To: header field of the header.
					message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));

					// Set Subject: header field
					message.setSubject(title);

					// Send the actual HTML message, as big as you like
					message.setContent(mail, "text/html; charset=UTF-8");

					// Send message
					Transport.send(message);

					System.out.println("Sent message successfully....");

				} catch (MessagingException e) {
					e.printStackTrace();
					throw new RuntimeException(e);
				}
	}
	
	/**
	 * envoi du lien de changement de mot de passe
	 */
	@Override
	public void sendPasswordMail(String mail) {
		final String MAIL = "<p>Vous venez de faire une demande de changement de mot de passe.</p>"
				+ "<p>Merci de <a href='http://powersell.eu-west-3.elasticbeanstalk.com/connexion/changePassword/" + "toto"
				+ "'>cliquer ici</a>.</p>"
				+ "<p>Si vous n'etes pas à l'origine de cette demande, merci de nous en informer";

		send(mail, MAIL_FROM, "Votre demande de changement de mot de passe.", MAIL);

		
	}

}
