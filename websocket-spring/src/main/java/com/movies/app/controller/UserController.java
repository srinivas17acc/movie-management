package com.movies.app.controller;

import com.movies.app.model.UserModel;
import com.movies.app.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController()
public class UserController {

    @Autowired
    UserService userService;

    @RequestMapping(value="/healthcheck", method = RequestMethod.GET)
     public String healthCheck()
    {
        return "Hi.. My health was good and auth success";
    }

    @RequestMapping(method = RequestMethod.POST, value="/create")
    public UserModel createUser(UserModel user) {
        Optional<UserModel> usr = userService.createUser(user);
        return usr.get();
    }

    @RequestMapping(method = RequestMethod.GET, value="/user/{id}")
    public UserModel getUser(UserModel user) {
        Optional<UserModel> usr = userService.createUser(user);
        return usr.get();
    }
}
