package com.swp.group3.login.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public class RegisterDTO {

    @NotBlank(message = "Account name cannot be empty")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password cannot be empty")
    private String password;

    @NotBlank(message = "Confirm password cannot be empty")
    private String confirmPassword;

    @NotBlank(message = "Full name cannot be empty")
    private String fullName;

    @NotBlank(message = "Gender cannot be empty")
    private String gender; // You might want to use Enum or String based on your preference

    @NotNull(message = "Birthday cannot be empty")
    private LocalDate birthday;

    @NotBlank(message = "Phone cannot be empty")
    private String phone;

    @NotBlank(message = "Address cannot be empty")
    private String address;

    @NotBlank(message = "Image URL cannot be empty")
    private String accountImg; // Add imageUrl field

    public enum Gender {
        male, female, other
    }

    public RegisterDTO() {
    }

    public RegisterDTO(
            @NotBlank(message = "Account name cannot be empty") @Email(message = "Invalid email format") String email,
            @NotBlank(message = "Password cannot be empty") String password,
            @NotBlank(message = "Confirm password cannot be empty") String confirmPassword,
            @NotBlank(message = "Full name cannot be empty") String fullName,
            @NotBlank(message = "Gender cannot be empty") String gender,
            @NotNull(message = "Birthday cannot be empty") LocalDate birthday,
            @NotBlank(message = "Phone cannot be empty") String phone,
            @NotBlank(message = "Address cannot be empty") String address,
            @NotBlank(message = "Image URL cannot be empty") String accountImg) {
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.fullName = fullName;
        this.gender = gender;
        this.birthday = birthday;
        this.phone = phone;
        this.address = address;
        this.accountImg = accountImg;
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

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAccountImg() {
        return accountImg;
    }

    public void setAccountImg(String accountImg) {
        this.accountImg = accountImg;
    }

    @Override
    public String toString() {
        return "RegisterDTO [email=" + email + ", password=" + password + ", confirmPassword=" + confirmPassword
                + ", fullName=" + fullName + ", gender=" + gender + ", birthday=" + birthday + ", phone=" + phone
                + ", address=" + address + ", accountImg=" + accountImg + "]";
    }
}
