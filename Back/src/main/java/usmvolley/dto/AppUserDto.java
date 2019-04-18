package usmvolley.dto;

import java.util.List;

import javax.validation.constraints.NotNull;

import usmvolley.model.Role;

/**
 * Specific App User DTO to be able to send user data without password through REST responses.
 */
public class AppUserDto {

    private Integer id;

    private String username;

    private List<Role> roleList;

    private AppUserDto() {

    }

    public AppUserDto(@NotNull String username) {
        this.username = username;
    }

    public AppUserDto(@NotNull String username, List<Role> roleList) {
        this.username = username;
        this.roleList = roleList;
    }
}
