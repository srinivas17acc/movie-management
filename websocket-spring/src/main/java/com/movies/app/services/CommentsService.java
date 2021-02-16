package com.movies.app.services;

import com.movies.app.model.CommentsModel;
import com.movies.app.repositories.CommentsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CommentsService {
    @Autowired
    CommentsRepo commentsRepo;

    public CommentsModel commentsCreate(String desc, String userId, String movieId) {

        CommentsModel com = new CommentsModel();
        com.setDesc(desc);
        com.setMovieId(movieId);
        com.setUserId(userId);
        //com.setUuid(UUID.randomUUID());
        CommentsModel cms = commentsRepo.save(com);
        return cms;
    }
}
