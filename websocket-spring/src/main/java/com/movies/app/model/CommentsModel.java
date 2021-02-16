package com.movies.app.model;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity(name="comments")
public class CommentsModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String desc;
    private String userId;
    private String username;
    @ManyToOne()
    @JoinColumn(name="uuid", insertable = false, updatable = false)
    private MovieInfoModel movieInfo;
    private String movieId;
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public MovieInfoModel getMovieInfo() {
        return movieInfo;
    }

    public void setMovieInfo(MovieInfoModel movieInfo) {
        this.movieInfo = movieInfo;
    }

    public String getMovieId() {
        return movieId;
    }

    public void setMovieId(String movieId) {
        this.movieId = movieId;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    @Override
    public String toString() {
        return "Comments{" +
                "uuid=" + id +
                ", desc='" + desc + '\'' +
                ", userId='" + userId + '\'' +
                ", movieInfo=" + movieInfo +
                ", movieId='" + movieId + '\'' +
                ", createdDate=" + createdDate +
                '}';
    }
}
