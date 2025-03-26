package com.QuickShare.api.Controller;

import com.QuickShare.api.Models.Dto.UserDto;
import com.QuickShare.api.Models.User;
import com.QuickShare.api.Service.UserService;
import com.QuickShare.api.Utils.PasswordConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.QuickShare.api.Utils.PasswordConfig.*;

import static com.QuickShare.api.Utils.UserDataValidation.validateData;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordConfig passwordConfig;

    @GetMapping("/")
    public List<User> getAllUsers()
    {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserByEmail(@PathVariable String email)
    {
        return userService.findByEmail(email);
    }

    @PostMapping("/auth/register")
    public ResponseEntity<String> createUser(@RequestBody UserDto userDto)
    {
        String validateMessage = validateData(userDto);
        if (!validateMessage.equals("Valid"))
            return new ResponseEntity<>(validateMessage, HttpStatus.BAD_REQUEST);

        if(userService.doesEmailExist(userDto.getEmail()))
            return new ResponseEntity<>("Email already exists", HttpStatus.BAD_REQUEST);

        User user = new User();

        user.setName(userDto.getFirstName());
        user.setSurname(userDto.getLastName());
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordConfig.passwordEncoder().encode(userDto.getPassword()));
        user.setPhone(userDto.getPhoneNumber());
        user.setGender(userDto.getGender());

        userService.createUser(user);

        return new ResponseEntity<>("Registered Successfully", HttpStatus.OK);
    }
}
