package com.movies.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class Application{

    private static Class applicationClass = Application.class;

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}