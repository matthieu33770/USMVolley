package usmvolley.dto;

import javax.validation.constraints.NotNull;

import usmvolley.model.Fonctions;

/**
 * Specific App User DTO to be able to send user data without password through REST responses.
 */
public class AppUserDto {

    private String username;

    private Fonctions fonction;

    public AppUserDto(@NotNull String username) {
        this.setUsername(username);
    }

    public AppUserDto(@NotNull String username, Fonctions fonction) {
        this.setUsername(username);
        this.setFonction(fonction);
    }

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Fonctions getFonction() {
		return fonction;
	}

	public void setFonction(Fonctions fonction) {
		this.fonction = fonction;
	}
}
