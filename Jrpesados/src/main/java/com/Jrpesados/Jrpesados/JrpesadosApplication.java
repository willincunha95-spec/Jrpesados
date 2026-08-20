package com.Jrpesados.Jrpesados;

import com.Jrpesados.Jrpesados.domain.User.User;
import com.Jrpesados.Jrpesados.domain.User.UserRole;
import com.Jrpesados.Jrpesados.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@EnableScheduling
public class JrpesadosApplication {

	public static void main(String[] args) {
		SpringApplication.run(JrpesadosApplication.class, args);
	}
}

