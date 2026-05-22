package com.WebScrapping.model;

import java.time.LocalDateTime;

public class ScrapeHistory {
    private String url;
    private LocalDateTime timestamp;
    private int linksCount;
    private int imagesCount;
    private int videosCount;
    private int totalDataPoints;

    public ScrapeHistory(String url, LocalDateTime timestamp, int linksCount, int imagesCount, int videosCount, int totalDataPoints) {
        this.url = url;
        this.timestamp = timestamp;
        this.linksCount = linksCount;
        this.imagesCount = imagesCount;
        this.videosCount = videosCount;
        this.totalDataPoints = totalDataPoints;
    }

    // Getters and Setters
    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public int getLinksCount() { return linksCount; }
    public void setLinksCount(int linksCount) { this.linksCount = linksCount; }

    public int getImagesCount() { return imagesCount; }
    public void setImagesCount(int imagesCount) { this.imagesCount = imagesCount; }

    public int getVideosCount() { return videosCount; }
    public void setVideosCount(int videosCount) { this.videosCount = videosCount; }

    public int getTotalDataPoints() { return totalDataPoints; }
    public void setTotalDataPoints(int totalDataPoints) { this.totalDataPoints = totalDataPoints; }
}