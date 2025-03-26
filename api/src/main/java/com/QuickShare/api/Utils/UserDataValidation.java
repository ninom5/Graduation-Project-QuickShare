package com.QuickShare.api.Utils;
import com.QuickShare.api.Models.Dto.UserDto;
import com.QuickShare.api.Repository.UserRepository;

public class UserDataValidation {
    public UserRepository userRepository;
    public static String validateData(UserDto userDto)
    {
        String firstName = userDto.getFirstName();
        String lastName = userDto.getLastName();
        String username = userDto.getUsername();
        String password = userDto.getPassword();
        String phoneNumber = userDto.getPhoneNumber();
        String email = userDto.getEmail();

        String[] userData = {firstName, lastName, username, password, email};

        for (String data : userData)
        {
            if(data == null || data.trim().isEmpty())
                return (data + " is required"); // ovde vraca vrijednost
        }

        if(phoneNumber != null && !phoneNumber.trim().isEmpty() && !phoneNumber.matches("-?\\d+(\\.\\d+)?"))
            return (phoneNumber + " is not a valid phone number");

        if(password.length() < 8)
            return ("Password is too short");

        return "Valid";
    }
}
