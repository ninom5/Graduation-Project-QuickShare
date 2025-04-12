package com.QuickShare.api.Service;

import com.QuickShare.api.Models.User;
import com.QuickShare.api.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public User createUser(User user){return userRepository.save(user);}

    public boolean doesEmailExist(String email)
    {
        User user = userRepository.findByEmail(email);

        return (user != null);
    }
}
