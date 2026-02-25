import { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import { fetchTopHeadlines, searchNews } from "../services/newsService";
import "./NewsList.css";

const NewsList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("general");
  const [isSearching, setIsSearching] = useState(false);

  const categories = [
    "general",
    "business",
    "technology",
    "entertainment",
    "health",
    "science",
    "sports",
  ];

  // useEffect hook - Fetch news when category changes
  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchTopHeadlines(category);
        setArticles(data.articles);
      } catch (err) {
        setError("Failed to load news. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (!isSearching) {
      loadNews();
    }
  }, [category, isSearching]);

  // useState hook for search functionality
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setLoading(true);
      setError(null);
      setIsSearching(true);
      const data = await searchNews(searchQuery);
      setArticles(data.articles);
    } catch (err) {
      setError("Failed to search news. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setIsSearching(false);
    setSearchQuery("");
  };

  const handleReset = () => {
    setCategory("general");
    setIsSearching(false);
    setSearchQuery("");
  };

  return (
    <div className="news-list-container">
      <div className="controls">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
          {isSearching && (
            <button
              type="button"
              onClick={handleReset}
              className="reset-button"
            >
              Reset
            </button>
          )}
        </form>

        {!isSearching && (
          <div className="categories">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`category-button ${category === cat ? "active" : ""}`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading news...</p>
        </div>
      )}

      {error && (
        <div className="error">
          <p>{error}</p>
          <button onClick={handleReset} className="retry-button">
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && articles.length === 0 && (
        <div className="no-results">
          <p>No articles found. Try a different search or category.</p>
        </div>
      )}

      <div className="news-grid">
        {articles.map((article, index) => (
          <NewsCard key={`${article.url}-${index}`} article={article} />
        ))}
      </div>
    </div>
  );
};

export default NewsList;
