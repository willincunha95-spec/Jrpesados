package com.Jrpesados.Jrpesados.domain.DTO;

import com.Jrpesados.Jrpesados.domain.User.UserRole;

public record RegisterDTO (String email , String password , UserRole role) {
}
