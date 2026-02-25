import "./NewsCard.css";

const NewsCard = ({ article }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="news-card">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="news-image"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      )}
      <div className="news-content">
        <h3 className="news-title">
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            {article.title}
          </a>
        </h3>
        <p className="news-description">{article.description}</p>
        <div className="news-meta">
          <span className="news-source">{article.source.name}</span>
          <span className="news-date">{formatDate(article.publishedAt)}</span>
          {article.author && (
            <span className="news-author">By {article.author}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
