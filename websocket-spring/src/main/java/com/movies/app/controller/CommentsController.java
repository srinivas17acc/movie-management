package com.movies.app.controller;

import com.movies.app.model.CommentsModel;
import com.movies.app.model.MovieInfoModel;
import com.movies.app.repositories.CommentsRepo;
import com.movies.app.services.MovieInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CommentsController {

    @Autowired
    CommentsRepo commentsRepo;

    @Autowired
    MovieInfoService movieInfoService;

    @RequestMapping(value="/comments", method = RequestMethod.POST)
    public CommentsModel createComment(CommentsModel comments) {

        if (comments != null) {
            CommentsModel comment = new CommentsModel();
            comment.setDesc(comment.getDesc());

            CommentsModel saveComments = commentsRepo.save(comment);
            return saveComments;
        }

        return null;

    }

    @RequestMapping(value="/comments", method = RequestMethod.GET)
    public CommentsModel getComments(String movieId) {

        if (movieId != null  && movieId.isEmpty()) {
            CommentsModel saveComments = commentsRepo.findByMovieId(movieId);
            return saveComments;
        }
        return null;
    }


}
