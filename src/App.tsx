import SearchPage from './components/SearchPage';
import DetailsPage from './components/DetailsPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import FilterContext from './FilterContext';

export type Media = {
  id: number,
  title: string,
  name: string,
  overview: string,
  poster_path: string,
  vote_average: number,
  release_date: string,
  first_air_date: string
}

function App() {
  const [query, setQuery] = useState<string>('');
  const [chosenTab, setChosenTab] = useState<number>(1);
  return (
    <FilterContext.Provider value={{query, setQuery, chosenTab, setChosenTab}}>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<SearchPage />} />
          <Route path='/:type/:id' element={<DetailsPage />} />
      </Routes>
    </BrowserRouter>
    </FilterContext.Provider>
  );
}

export default App;
