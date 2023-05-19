<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;

class NewsController extends Controller
{
    public function fetchNews(Request $request)
    {
       

        Log::info('Request parameters:', $request->all());
        
        
        
        $apiKey = env('NEWS_API_KEY');
        $url = 'https://newsapi.org/v2/';

        // Determine the endpoint based on the query parameter
        $endpoint = $request->input('endpoint', 'top-headlines');

        // Set the default endpoint to 'top-headlines' if not specified or invalid
        if (!in_array($endpoint, ['top-headlines', 'everything', 'sources'])) {
            $endpoint = 'top-headlines';
        }
        $queryParams = [
            'q' => $request->input('q'), // Keywords or phrases to search for in the article title and body
            'category' => $request->input('category'), // Category of news
            'country' => $request->input('country'), // Country for news headlines
            'sources' => $request->input('sources'), // Comma-separated string of source identifiers
            'language' => $request->input('language', 'en'), // Language code
            'pageSize' => $request->input('pageSize', 20), // Number of results to return per page
            'page' => $request->input('page', 1), // Page number to retrieve
            'from' => $request->input('from'), // Oldest article allowed (ISO 8601 format)
            'to' => $request->input('to'), // Newest article allowed (ISO 8601 format)
            'sortBy' => $request->input('sortBy', 'publishedAt'), // Sort order of articles
            'apiKey' => $apiKey
        ];

       

        // Prepare query parameters
        $q = $request->input('q');
        $category = $request->input('category');
        $country = $request->input('country');
        $sources = $request->input('sources');
        $language = $request->input('language', 'en');
        $pageSize = $request->input('pageSize', 20);
        $page = $request->input('page', 1);
        $from = $request->input('from');
        $to = $request->input('to');
        $sortBy = $request->input('sortBy', 'relevancy');
        $apiKey = env('NEWS_API_KEY');
        
        $queryParams = http_build_query([
            'q' => $q,
            'category' => $request->input('category'),
            'country' => $request->input('category'),
            'sources' => $request->input('sources'),
            'language' => $request->input('language'),
            'pageSize' => $pageSize,
            'page' => $page,
            'from' => $from,
            'to' => $to,
            'sortBy' => $sortBy,
            'apiKey' => $apiKey
        ]);
         
        
       
        // Append the endpoint path to the base URL
        $url .= $endpoint;

        // Send GET request to News API
        $response = Http::get($url, $queryParams);
        
        /* dd($url); */
        // Check if the request was successful
        if ($response->successful()) {
            $responseData = $response->json();

            // Check if the necessary array keys exist
            if (isset($responseData['status']) && isset($responseData['articles'])) {
                $status = $responseData['status'];
                $articles = $responseData['articles'];

                // Process the articles as needed
                // ...

                return response()->json([
                    'status' => $status,
                    'articles' => $articles,
                ]);
            } else {
                // Handle the case when the necessary array keys are missing
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid response format',
                ], 500);
            }
        } else {
            $error = $response->json();
            $errorCode = $error['code'] ?? null;
            $errorMessage = $error['message'] ?? null;

            return response()->json([
                'status' => 'error',
                'code' => $errorCode,
                'message' => $errorMessage,
            ], $response->status());
        }
    }
}
