import './css/main.css';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react';

import Layout from './Components/Layout';
import GameShop from './Components/GameShop';
import MyGames from './Components/MyGames';
import MyFavourites from './Components/MyFavourites';
import GamePage from './Components/GamePage';
import Dashboard from './Components/Dashboard';

export default function App() {
  const [games, setGames] = useState([]);

  async function getGames(type) {
    let url;
    if (type === "all") {
      url = "https://api.rawg.io/api/games?key=e00c96374e5247b58471e9ee8f5e4770";
    } else if (type === "gameshop") {
      url = "https://api.rawg.io/api/games?key=e00c96374e5247b58471e9ee8f5e4770&ordering=-released&page_size=3";
    }
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  }

  //Henter alle:
  useEffect(() => {
    getGames("all").then((data) => {
      setGames(data);
      console.log(data);
    });
  }, []);

  //Henter de tre nyeste: 
  useEffect(() => {
    getGames("gameshop").then((data) => {
      setGames(data);
      console.log(data);
    });
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard games={games} getGames={getGames} />} />
        <Route path=':slug' element={<GamePage games={games} />} />
        <Route path="/gameshop" element={<GameShop games={games} getGames={getGames} />} />
        <Route path="/mygames" element={<MyGames />} />
        <Route path="/favourites" element={<MyFavourites />} />
      </Route>
    </Routes >
  );
}
