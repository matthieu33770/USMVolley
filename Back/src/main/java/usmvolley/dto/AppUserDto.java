package usmvolley.dto;

import javax.validation.constraints.NotNull;

import usmvolley.model.Fonctions;

/**
 * Specific App User DTO to be able to send user data without password through REST responses.
 */
public class AppUserDto {

    private String username;

    private Fonctions fonction;

    private AppUserDto() {}

    public AppUserDto(@NotNull String username) {
        this.username = username;
    }

    public AppUserDto(@NotNull String username, Fonctions fonction) {
        this.username = username;
        this.fonction = fonction;
    }
}
