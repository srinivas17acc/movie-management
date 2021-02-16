package com.movies.app.services;

import com.movies.app.model.MovieInfoModel;
import com.movies.app.repositories.MovieInfoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
public class MovieInfoService {
    @Autowired
    MovieInfoRepo movieInfoRepo;

    public Optional<MovieInfoModel> createMovieInfo(MovieInfoModel movieInfo) {
        if (movieInfo.getName() != null)
            movieInfo.setSlug(createSlug(movieInfo.getName()));

        MovieInfoModel movieIn = movieInfoRepo.findBySlug(movieInfo.getSlug());
        if (movieIn == null) {
            MovieInfoModel mInfoCreate =  movieInfoRepo.save(movieInfo);
            return Optional.of(mInfoCreate);
        }
          return Optional.empty();
    }

    public List<MovieInfoModel> getAllMovies(Integer page, Integer size) {
        Pageable firstPageWithTwoElements = PageRequest.of(page, size);

         Page<MovieInfoModel> movieList = movieInfoRepo.findAll(firstPageWithTwoElements);
         return movieList.toList();
    }

    public MovieInfoModel findBySlug(String slug) {

        MovieInfoModel movieSlug = movieInfoRepo.findBySlug(slug);
        return movieSlug;
    }

    private String createSlug(String slug) {
       return slug.toLowerCase().replaceAll(" ", "-");
    }

}
