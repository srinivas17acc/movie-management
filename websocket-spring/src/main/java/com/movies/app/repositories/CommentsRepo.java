package com.movies.app.repositories;

import com.movies.app.model.CommentsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CommentsRepo extends JpaRepository<CommentsModel, UUID> {

    CommentsModel findByMovieId(String id);
}
