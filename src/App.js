import "./App.css";
import AppHeader from "./Components/Header/header";
import SearchBar from "./Components/SearchBar/searchBar";
import FiltersBar from "./Components/Filters/filtersBar";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <SearchBar />
      <FiltersBar />
    </div>
  );
}

export default App;
