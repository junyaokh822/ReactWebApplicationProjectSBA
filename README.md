# News Dashboard

A React-based news aggregator that pulls live headlines from the [NewsAPI](https://newsapi.org/) and presents them in a clean, browsable interface.

---

## Technologies Used

**React 19** — UI is built entirely with React functional components, using the `useState` and `useEffect` hooks to manage application state and side effects (data fetching).

**Vite** — Used as the build tool and dev server. Vite provides near-instant hot module replacement (HMR) and fast production builds. Environment variables (like the API key) are handled via Vite's `import.meta.env` convention.

**Axios** — Promise-based HTTP client used to make requests to the NewsAPI REST endpoints. Chosen over the native `fetch` API for its cleaner error handling and automatic JSON parsing.

**NewsAPI** — Third-party REST API that provides access to top headlines and search across thousands of news sources. Two endpoints are used:

- `/v2/top-headlines` — for category-based browsing
- `/v2/everything` — for keyword search

**CSS Modules (plain CSS files)** — Styles are scoped to components using co-located `.css` files (e.g. `NewsCard.css`, `NewsList.css`), keeping concerns close together without a full CSS-in-JS solution.

**ESLint** — Configured with `eslint-plugin-react-hooks` to catch common React hook mistakes, and `eslint-plugin-react-refresh` to ensure compatibility with Vite's HMR.

---

## Approach

The app is structured around three layers:

**Service layer** (`src/services/newsService.jsx`) abstracts all API calls into two exported async functions — `fetchTopHeadlines` and `searchNews`. This keeps components free of HTTP logic and makes the API integration easy to swap out or mock.

**Container component** (`NewsList.jsx`) owns all state: the current articles, loading/error status, the active category, the search query, and whether the user is in "search mode" or "browse mode". It coordinates between the service layer and the presentational components below it.

**Presentational component** (`NewsCard.jsx`) receives a single `article` object as a prop and renders it. It has no knowledge of how data is fetched — it only handles display logic (formatting dates, hiding broken images, linking out to the full article).

The two browsing modes — category filtering and keyword search — are kept mutually exclusive via an `isSearching` boolean flag. Switching to a category clears the search, and performing a search hides the category buttons to avoid ambiguity about which mode is active.

---

## Usage Instructions

### Prerequisites

- Node.js 20+ (required by Vite 7)
- A free API key from [https://newsapi.org](https://newsapi.org)

### Setup

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root:

```
VITE_NEWS_API_KEY=your_api_key_here
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Known / Unsolved Problems

**No pagination** — Results are capped at 20 articles per request (`pageSize: 20`). There is no "load more" or pagination UI, so users cannot browse beyond the first page of results.

**No API key validation** — If the `.env` file is missing or the key is invalid, the app shows a generic "Failed to load news" error with no guidance on the likely cause.

**Images are inconsistent** — News sources provide image URLs of varying quality and availability. Broken images are hidden via an `onError` handler, which can leave cards with no visual at the top and inconsistent heights across the grid.
