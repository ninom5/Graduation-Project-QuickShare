package com.QuickShare.api.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User{
    @Getter
    @Id
    @UuidGenerator
    private UUID id;

    private String name;
    private String surname;
    private String username;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String phone;
    private Date dateOfBirth;
    private Date createdAt;
    private Date updatedAt;
}

enum Gender{
    M, F
}