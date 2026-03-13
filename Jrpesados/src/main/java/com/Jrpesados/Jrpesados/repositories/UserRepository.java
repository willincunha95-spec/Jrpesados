package com.Jrpesados.Jrpesados.repositories;

import com.Jrpesados.Jrpesados.domain.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User , String> {


    User findByEmail(String email);


}

