package usmvolley.dto;

import usmvolley.model.Fonctions;

import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * Specific App User DTO to be able to send user data without password through REST responses.
 */
public class AppUserDto {

    private Integer id;

    private String username;

    private List<Fonctions> fonctionList;

    private AppUserDto() {

    }

    public AppUserDto(@NotNull String username) {
        this.username = username;
    }

    public AppUserDto(@NotNull String username, List<Fonctions> fonctionList) {
        this.username = username;
        this.fonctionList = fonctionList;
    }
}
