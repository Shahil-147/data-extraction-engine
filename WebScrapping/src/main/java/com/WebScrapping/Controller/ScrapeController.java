package com.WebScrapping.Controller;

import com.WebScrapping.Service.ScraperService;
import com.WebScrapping.model.AnalyticsResponse;
import com.WebScrapping.model.ScrapeHistory;
import com.WebScrapping.model.ScrapeResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ScrapeController {

    @Autowired
    private ScraperService scraperService;

    // SCRAPE API
    @GetMapping("/scrape")
    public ResponseEntity<?> scrape(@RequestParam String url) {

        try {

            // Validate URL
            validateUrl(url);

            ScrapeResponse response = scraperService.webScrape(url);

            return ResponseEntity.ok(response);

        } catch (MalformedURLException e) {

            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Invalid URL format.");

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Scraping failed: " + e.getMessage());
        }
    }

    // HISTORY API
    @GetMapping("/history")
    public ResponseEntity<List<ScrapeHistory>> getHistory() {
        return ResponseEntity.ok(scraperService.getHistory());
    }

    // ANALYTICS API
    @GetMapping("/analytics")
    public ResponseEntity<AnalyticsResponse> getAnalytics() {
        return ResponseEntity.ok(scraperService.getAnalytics());
    }

    // URL VALIDATION
    private void validateUrl(String url) throws MalformedURLException {

        URL parsedUrl = new URL(url);

        if (
                !parsedUrl.getProtocol().equals("http") &&
                        !parsedUrl.getProtocol().equals("https")
        ) {
            throw new MalformedURLException("Only HTTP/HTTPS URLs are allowed.");
        }
    }
}