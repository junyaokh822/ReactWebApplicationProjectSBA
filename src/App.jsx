import NewsList from "./components/NewsList";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>News Dashboard</h1>
      </header>
      <main>
        <NewsList />
      </main>
    </div>
  );
}

export default App;
