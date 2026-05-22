package com.WebScrapping.Service;

import com.WebScrapping.model.ScrapeResponse;
import com.WebScrapping.model.ScrapeHistory;
import com.WebScrapping.model.AnalyticsResponse;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class ScraperService {

    // In-memory list to act as our temporary database
    private final List<ScrapeHistory> historyDatabase = new ArrayList<>();

    public ScrapeResponse webScrape(String url) throws Exception {
        Document doc = Jsoup.connect(url)
                .userAgent("Mozilla/5.0")
                .header("Accept-Language", "en-US,en;q=0.9")
                .header("Referer", "https://google.com")
                .timeout(10000)
                .followRedirects(true)
                .get();

        List<String> images = new ArrayList<>();
        List<String> videos = new ArrayList<>();
        List<String> links = new ArrayList<>();

        for (Element img : doc.select("img")) {

            String bestSrc = "";

            // 1. Try srcset (BEST QUALITY)
            if (!img.attr("srcset").isEmpty()) {

                String[] sources = img.attr("srcset").split(",");

                int maxWidth = 0;

                for (String source : sources) {

                    String[] parts = source.trim().split(" ");

                    if (parts.length >= 2) {

                        String imageUrl = parts[0];

                        String sizePart = parts[1]
                                .replace("w", "")
                                .replace("x", "");

                        try {

                            int width = Integer.parseInt(sizePart);

                            if (width > maxWidth) {
                                maxWidth = width;
                                bestSrc = imageUrl;
                            }

                        } catch (Exception ignored) {}
                    }
                }
            }

            // 2. Lazy-loaded HD images
            if (bestSrc.isEmpty() && !img.attr("data-src").isEmpty()) {
                bestSrc = img.absUrl("data-src");
            }

            // 3. Alternative lazy loading
            if (bestSrc.isEmpty() && !img.attr("data-lazy-src").isEmpty()) {
                bestSrc = img.absUrl("data-lazy-src");
            }

            // 4. Fallback normal src
            if (bestSrc.isEmpty()) {
                bestSrc = img.absUrl("src");
            }

            if (bestSrc.isEmpty()) continue;

            // Ignore useless images
            String lower = bestSrc.toLowerCase();

            if (
                    lower.contains("icon") ||
                            lower.contains("logo") ||
                            lower.contains("avatar") ||
                            lower.contains("placeholder") ||
                            lower.contains(".svg")
            ) {
                continue;
            }

            // Avoid duplicates
            if (!images.contains(bestSrc)) {
                images.add(bestSrc);
            }
        }
        for (Element video : doc.select("video")) {
            String src = video.absUrl("src");
            if (!src.isEmpty()) videos.add(src);
        }
        for (Element link : doc.select("a[href]")) {
            String href = link.absUrl("href");
            if (!href.isEmpty()) links.add(href);
        }

        ScrapeResponse response = new ScrapeResponse();
        response.setImages(images);
        response.setVideos(videos);
        response.setLinks(links);

        // --- NEW: Save the results to our History Database ---
        int totalData = links.size() + images.size() + videos.size();
        ScrapeHistory historyEntry = new ScrapeHistory(
                url,
                LocalDateTime.now(),
                links.size(),
                images.size(),
                videos.size(),
                totalData
        );
        historyDatabase.add(historyEntry);

        return response;
    }

    // --- NEW: Method to fetch History ---
    public List<ScrapeHistory> getHistory() {
        // Return a reversed list so the newest scrapes show up first
        List<ScrapeHistory> reversedHistory = new ArrayList<>(historyDatabase);
        Collections.reverse(reversedHistory);
        return reversedHistory;
    }

    // --- NEW: Method to calculate Analytics ---
    public AnalyticsResponse getAnalytics() {
        AnalyticsResponse analytics = new AnalyticsResponse();
        analytics.setTotalScrapes(historyDatabase.size());

        int totalLinks = 0, totalImages = 0, totalVideos = 0;

        for (ScrapeHistory h : historyDatabase) {
            totalLinks += h.getLinksCount();
            totalImages += h.getImagesCount();
            totalVideos += h.getVideosCount();
        }

        analytics.setTotalLinks(totalLinks);
        analytics.setTotalImages(totalImages);
        analytics.setTotalVideos(totalVideos);

        return analytics;
    }
}