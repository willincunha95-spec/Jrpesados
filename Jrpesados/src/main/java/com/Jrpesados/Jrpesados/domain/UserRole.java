package com.Jrpesados.Jrpesados.domain;

public enum UserRole {
    CLIENT("client"),
    ADMIN("admin"),
    MECANIC("mecanico");

    private String role;

    UserRole(String role){
        this.role = role;
    }

    public String getRole(){
        return role;
    }
}
