package com.Jrpesados.Jrpesados.controller;

import com.Jrpesados.Jrpesados.domain.DTO.UserResponseDTO;
import com.Jrpesados.Jrpesados.domain.User.User;
import com.Jrpesados.Jrpesados.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/clientes")
    public ResponseEntity<List<UserResponseDTO>> listarClientes() {
        // Retorna todos os usuários no formato DTO para não expor a senha e outras infos sensíveis
        List<UserResponseDTO> clientes = userRepository.findAll().stream()
                .map(u -> new UserResponseDTO(u.getId(), u.getEmail()))
                .toList();
        
        return ResponseEntity.ok(clientes);
    }
}
