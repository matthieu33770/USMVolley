package usmvolley.security;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class JDBCWebSecurity extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	
    @Bean
    public UserDetailsService userDetailsService() {
        return super.userDetailsService();
    }
	
	@Autowired
	DataSource dataSource;
	
	@Bean(name = BeanIds.AUTHENTICATION_MANAGER)
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}
    
//    @Autowired
//    public void configAuthentication(AuthenticationManagerBuilder auth) throws Exception {
//        auth.jdbcAuthentication().dataSource(dataSource)
//        		.usersByUsernameQuery(
//        				"select username,mdp,is_Valide from users where username=?")
//        		.authoritiesByUsernameQuery(
//        				"select libelle_role,username from role where username=?");
//    }
    
    @Override
	protected void configure(HttpSecurity http) throws Exception {
    	
    	//Premet de d'affranchir du CrossOrigin dans les controllers
    	http.cors();
    	
    	//Disable CSRF
    	http.csrf().disable();
    	
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
        
        //Apply JWT v�rifie la requ�te avant envoi vers le controller
        http.addFilterBefore(new JwtTokenFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);
	}
    
    /**
     * Method that configures web security. Useful here for development purposes to allow h2 console access.
     * @param web the WebSecurity object to configure.
     * @throws Exception
     */
    @Override
    public void configure(WebSecurity web) throws Exception {
    	web.ignoring().antMatchers("");
    	web.ignoring().antMatchers("");
    }

}