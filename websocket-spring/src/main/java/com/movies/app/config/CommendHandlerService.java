package com.movies.app.config;

import com.google.gson.Gson;
import com.movies.app.model.MovieInfoModel;
import com.movies.app.services.MovieInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Component
public class CommendHandlerService {
    @Autowired
    MovieInfoService movieInfoService;

    public Object execute(String payload) {
        System.out.println(new String(payload.getBytes(StandardCharsets.UTF_8)));
        MovieInfoModel movieInfo = new MovieInfoModel();
        Map<String, String> value = new Gson().fromJson(payload, Map.class);
        String command_type = value.get("command") ;
        String message = value.get("message");
        Object obj = null;
        Map<String, Object> map = new HashMap<>();
        map.put("code",400);
        map.put("error", "command not found");

     try {
         switch (command_type) {
             case Constans.CREATE_MOVIE:
                 MovieInfoModel createMovie = new Gson().fromJson(message, MovieInfoModel.class);
                 movieInfoService.createMovieInfo(createMovie);
                 Map<String, Integer> msg = new Gson().fromJson(message, Map.class);
                 obj = movieInfoService.getAllMovies(msg.getOrDefault("page",0), msg.getOrDefault("size",2));
                 break;

             case Constans.MOVIE_GET_ALL:
                 Map<String, String> msge = new Gson().fromJson(message, Map.class);
                 obj = movieInfoService.getAllMovies(Integer.parseInt(msge.get("page")), Integer.parseInt(msge.get("size")));
                 break;

             case Constans.MOVIE_GET_SLUG:
                 MovieInfoModel findSlug = new Gson().fromJson(message, MovieInfoModel.class);
                 obj = movieInfoService.findBySlug(findSlug.getName());
                 break;

             default:
                 obj = map;
         }
     }catch (Exception e) {
         e.printStackTrace();
     }

        return obj;
    }


}
