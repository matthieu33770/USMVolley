package usmvolley;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

//@Configuration
//@EnableWebSecurity
//@EnableGlobalMethodSecurity(prePostEnabled = true)
public class JDBCWebSecurity extends WebSecurityConfigurerAdapter{
	
	@Autowired
	DataSource dataSource;
    
    @Autowired
    public void configAuthentication(AuthenticationManagerBuilder auth) throws Exception {
        auth.jdbcAuthentication().dataSource(dataSource)
        		.usersByUsernameQuery(
        				"select username,mdp,is_Valide from users where username=?")
        		.authoritiesByUsernameQuery(
        				"select libelle_role,username from role where username=?");
    }
    
    @Override
	protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
    	.antMatchers("/").permitAll()
    	.antMatchers("/public").permitAll()
    	.antMatchers("/joueurs/get/joueurs").permitAll()
    	.antMatchers("/deny").denyAll()
    	.antMatchers("/manifestations").hasAnyAuthority("Captaine", "Bureau")
    	.antMatchers("/users").hasAnyAuthority("Bureau")
    	.anyRequest().authenticated()
    	.and()
    	.formLogin().permitAll()
    	.and()
    	.logout().logoutRequestMatcher(new AntPathRequestMatcher("/logout")).logoutSuccessUrl("/login");
	}

}
