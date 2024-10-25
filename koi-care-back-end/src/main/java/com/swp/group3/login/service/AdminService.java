package com.swp.group3.login.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.swp.group3.login.pojo.Account;
import com.swp.group3.login.repository.AdminRepository;

@Service
public class AdminService implements IAdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public List<Account> getAllUsers() {
        return adminRepository.findByStatusOrderByAccountIdDesc(Account.Status.active);
    }

    @Override
    public Account getUserById(int id) {
        return adminRepository.findById(id).orElse(null);
    }

    @Override
    public Account addMember(Account account) {
        return adminRepository.save(account);
    }

    @Override
    public boolean deleteUser(int id) {
        try {
            Account account = adminRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            account.setStatus(Account.Status.inactive);
            adminRepository.save(account);

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean reactivateUser(int id) {
        try {
            Account account = adminRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            account.setStatus(Account.Status.active);
            adminRepository.save(account);

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<Account> getInactiveUsers() {
        return adminRepository.findByStatusOrderByAccountIdDesc(Account.Status.inactive);
    }

    @Override
    public Account updateUser(int id, Account updatedAccount) {
        return adminRepository.findById(id)
                .map(account -> {
                    account.setEmail(updatedAccount.getEmail());
                    account.setPassword(updatedAccount.getPassword());
                    account.setAccountImg(updatedAccount.getAccountImg());
                    account.setRole(updatedAccount.getRole());
                    account.setFullName(updatedAccount.getFullName());
                    account.setGender(updatedAccount.getGender());
                    account.setBirthDay(updatedAccount.getBirthDay());
                    account.setPhone(updatedAccount.getPhone());
                    account.setAddress(updatedAccount.getAddress());
                    account.setStatus(updatedAccount.getStatus());
                    return adminRepository.save(account);
                })
                .orElse(null);
    }
}
