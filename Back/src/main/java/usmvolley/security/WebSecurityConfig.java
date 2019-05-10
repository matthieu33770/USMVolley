package usmvolley.security;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AnyRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Bean(name = BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    /**
     * Method that configures HTTP security.
     * @param http the HttpSecurity object to configure.
     * @throws Exception
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {

    	// Permet de se passer du CrossOrigin dans les controllers se rapporte à corsConfigurationSource()
        http.cors();

        // Disable CSRF (cross site request forgery as our token will be stored in session storage) pour stocker le JWT dans le session storage
        http.csrf().disable();

        // No session will be created or used by spring security
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // Entry points
        http.authorizeRequests()//
        		.antMatchers("/**").permitAll()
                .antMatchers("/users/signin").permitAll()
                .antMatchers("/users/sign-up").permitAll()
                .antMatchers("/users/update/**").permitAll()
                
                .antMatchers("/joueurs/create").permitAll()
                .antMatchers("/email/reinit/**").permitAll()
//                .antMatchers("/users/**").permitAll()
                .antMatchers("/roles/**").permitAll()
                .antMatchers("/fonctions/**").permitAll()
//                .antMatchers("/equipes/**").hasAnyAuthority("ROLE_CAPITAINE")
//                .antMatchers("/articles/**").permitAll()
                .antMatchers("/statuts/**").permitAll()
                .antMatchers("/lieux/**").permitAll()
                .antMatchers("/creneaux/**").permitAll()
                .antMatchers("/disponibilite/**").permitAll()
                .antMatchers("/categories/**").permitAll()
                .antMatchers("/manifestations/**").permitAll()
                // Disallow everything else...
                .anyRequest().authenticated();
//        		.anyRequest().permitAll();
        
//      // Apply JWT vérifie la requete avant envoie vers le controller
        http.addFilterBefore(new JwtTokenFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);
    }

    /**
     * Method that configures web security. Useful here for development purposes to allow h2 console access.
     * @param web the WebSecurity object to configure.
     * @throws Exception
     */
    @Override
    public void configure(WebSecurity web) throws Exception {
//        web.ignoring().antMatchers("/users/**");
        web.ignoring().antMatchers("/email");
//        web.ignoring().antMatchers("/joueurs/**");
        web.ignoring().antMatchers("/roles/**");
        web.ignoring().antMatchers("/fonctions/**");
//        web.ignoring().antMatchers("/equipes/**");
//        web.ignoring().antMatchers("/articles/**");
        web.ignoring().antMatchers("/statuts/**");
        web.ignoring().antMatchers("/lieux/**");
        web.ignoring().antMatchers("/creneaux/**");
        web.ignoring().antMatchers("/disponibilite/**");
        web.ignoring().antMatchers("/categories/**");
        web.ignoring().antMatchers("/manifestations/**");
        web.ignoring().antMatchers("/resources/**");
        //.anyRequest();
    }

    /**
     * Generic configuration for CORS. Useful here for development purposes as front is developed with Angular.
     * @return the CorsConfigurationSource object.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        final CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Collections.singletonList("http://localhost:4200"));

        configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH"));

        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));

        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
