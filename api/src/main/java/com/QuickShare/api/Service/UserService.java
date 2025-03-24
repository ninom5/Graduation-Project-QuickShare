package com.QuickShare.api.Service;

import com.QuickShare.api.Entity.User;
import com.QuickShare.api.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public List<User> getAllUsers()
    {
        return userRepository.findAll();
    }

    public User findByEmail(String email)
    {
        return userRepository.findByEmail(email);
    }
}
