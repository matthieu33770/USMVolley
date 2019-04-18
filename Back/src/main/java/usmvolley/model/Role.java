package usmvolley.model;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority{
	
	ROLE_LICENCIE, ROLE_CAPITAINE, ROLE_BUREAU;

	@Override
	public String getAuthority() {
		return name();
	}

}
