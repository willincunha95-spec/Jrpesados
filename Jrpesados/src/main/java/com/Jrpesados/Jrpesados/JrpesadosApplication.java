package com.Jrpesados.Jrpesados;

import com.Jrpesados.Jrpesados.domain.User.User;
import com.Jrpesados.Jrpesados.domain.User.UserRole;
import com.Jrpesados.Jrpesados.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class JrpesadosApplication {

	public static void main(String[] args) {
		SpringApplication.run(JrpesadosApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder, com.Jrpesados.Jrpesados.repositories.VeiculoRepository veiculoRepository) {
		return args -> {
			if (userRepository.findByEmail("admin@jrpesados.com.br") == null) {
				User admin = new User("admin@jrpesados.com.br", passwordEncoder.encode("123456"), UserRole.ADMIN);
				userRepository.save(admin);
				System.out.println("=== SYSTEM: Created default admin account: admin@jrpesados.com.br / 123456 ===");
			}
			if (userRepository.findByEmail("cliente@gmail.com") == null) {
				User client = new User("cliente@gmail.com", passwordEncoder.encode("123456"), UserRole.CLIENT);
				userRepository.save(client);
				System.out.println("=== SYSTEM: Created default client account: cliente@gmail.com / 123456 ===");
			}
			
			// Deletar dados de teste (ABC-1234)
			veiculoRepository.findAll().stream()
				.filter(v -> "ABC-1234".equals(v.getPlaca()))
				.findFirst()
				.ifPresent(v -> {
					veiculoRepository.delete(v);
					System.out.println("=== SYSTEM: Removendo veículo de teste: ABC-1234");
				});
		};
	}
}

