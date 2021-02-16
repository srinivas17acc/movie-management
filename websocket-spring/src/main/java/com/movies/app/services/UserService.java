package com.movies.app.services;

import com.movies.app.model.UserModel;
import com.movies.app.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;

    public Optional<UserModel> createUser(UserModel userReq) {
        Optional<UserModel> usr = userRepo.findById(userReq.getId());
        if (!usr.isPresent()) {
            UserModel createdUser = userRepo.save(usr.get());
            return Optional.of(createdUser);
        }
        return Optional.empty();
    }


    public Optional<UserModel> getUsers(UserModel userReq) {
        Optional<UserModel> usr = userRepo.findById(userReq.getId());
        return usr;
    }

}
