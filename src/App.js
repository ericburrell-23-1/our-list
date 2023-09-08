import "./App.css";
import AppHeader from "./Components/Header/Header";
import SearchBar from "./Components/SearchBar/SearchBar";
import FiltersBar from "./Components/Filters/FiltersBar";
import ResultsArea from "./Components/Results/ResultsArea";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <SearchBar />
      <FiltersBar />
      <ResultsArea />
    </div>
  );
}

export default App;
