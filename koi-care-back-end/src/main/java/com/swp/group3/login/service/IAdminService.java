package com.swp.group3.login.service;

import java.util.List;

import com.swp.group3.login.pojo.Account;

public interface IAdminService {
    List<Account> getAllUsers();
    Account getUserById(int id);
    Account addMember(Account account);
    boolean deleteUser(int id);
    boolean reactivateUser(int id);
    List<Account> getInactiveUsers();
    Account updateUser(int id, Account account); // Add this method
}