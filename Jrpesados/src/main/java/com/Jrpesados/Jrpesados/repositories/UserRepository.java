package com.Jrpesados.Jrpesados.repositories;

import com.Jrpesados.Jrpesados.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;
@Repository
public interface UserRepository extends JpaRepository<User , String> {


    UserDetails findByEmail(String email);


}

