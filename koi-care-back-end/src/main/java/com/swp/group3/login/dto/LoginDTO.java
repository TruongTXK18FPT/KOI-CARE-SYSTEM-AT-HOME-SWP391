package com.swp.group3.login.dto;

import jakarta.validation.constraints.NotBlank;

public class LoginDTO {

    @NotBlank(message = "Account name cannot be empty")
    private String email;

    @NotBlank(message = "Password cannot be empty")
    private String password;

    public LoginDTO() {
    }

    public LoginDTO(@NotBlank(message = "Account name cannot be empty") String email,
            @NotBlank(message = "Password cannot be empty") String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "LoginDTO [email=" + email + ", password=" + password + "]";
    }

}
