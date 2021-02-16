package com.movies.app.repositories;

import com.movies.app.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface UserRepo extends JpaRepository<UserModel, Integer> {

    UserModel findByUsername(String username);
}
