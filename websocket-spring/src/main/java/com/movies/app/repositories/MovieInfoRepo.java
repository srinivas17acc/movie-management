package com.movies.app.repositories;

import com.movies.app.model.MovieInfoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface MovieInfoRepo extends PagingAndSortingRepository<MovieInfoModel, UUID> {
    //@Query("select * from movie_info where slug =?1 ")
    MovieInfoModel findBySlug(String slug);
}
