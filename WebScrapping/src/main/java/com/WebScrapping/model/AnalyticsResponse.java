package com.WebScrapping.model;

public class AnalyticsResponse {
    private int totalScrapes;
    private int totalLinks;
    private int totalImages;
    private int totalVideos;

    // Getters and Setters
    public int getTotalScrapes() { return totalScrapes; }
    public void setTotalScrapes(int totalScrapes) { this.totalScrapes = totalScrapes; }

    public int getTotalLinks() { return totalLinks; }
    public void setTotalLinks(int totalLinks) { this.totalLinks = totalLinks; }

    public int getTotalImages() { return totalImages; }
    public void setTotalImages(int totalImages) { this.totalImages = totalImages; }

    public int getTotalVideos() { return totalVideos; }
    public void setTotalVideos(int totalVideos) { this.totalVideos = totalVideos; }
}