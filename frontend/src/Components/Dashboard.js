import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MyGames from '../lib/sanity/MyGames';
import Login from '../lib/sanity/Login';
export default function Dashboard({ games }) {
  const [favoriteGames, setFavoriteGames] = useState([]);
  const slicedFavoriteGames = favoriteGames.slice(0, 2); // Slice the favoriteGames array to get only two games
  const [favoriteGamesCount, setFavoriteGamesCount] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false); // Add state for login status

  useEffect(() => {
    const favorites = Object.keys(localStorage)
      .filter((key) => key !== "user")
      .map((key) => JSON.parse(localStorage.getItem(key)));
      
    setFavoriteGames(favorites);
    setFavoriteGamesCount(favorites.length);
  }, []);

  const handleBuyClick = (game) => {
    const searchTerm = encodeURIComponent(game.name);
    const steamUrl = `https://store.steampowered.com/search/?term=${searchTerm}`;
    window.open(steamUrl, '_blank');
  };

  const handleRemoveFromFavorites = (id) => {
    // remove game from localStorage
    localStorage.removeItem(id);
    // remove game from favoriteGames state
    setFavoriteGames(favoriteGames.filter((game) => game.id !== id));
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const isLoggedin = () => {
    // Check if there is a user in localStorage
    const user = localStorage.getItem('user');
    return !!user;
  };

  if (!isLoggedin()) {
    return (
      <div>
        <h2>Please log in</h2>
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <main>
      <div id="dashboardContainer">
        <section id="gameshop">
          <div className="gridt">
            <h2>GAMESHOP</h2>
            <div id="linkdiv" >
              <Link to="/gameshop" >
                <button type="button">Visit shop</button>
              </Link>
            </div>

          </div>
          <div className="gameshop-grid" id="dashboardBorder">
            {games
              ?.sort((a, b) => new Date(b.released) - new Date(a.released))
              .slice(3, 6)
              .map((game, index) => (
                <div key={index} className="game-card-wrapper" >
                  <div className="game-card-img">
                    <img src={game.background_image} alt={game.name} />
                  </div>
                  <div className="game-card-details">
                    <h2>{game.name}</h2>
                    <p>{game.genres.map((genreList) => genreList.name).join(", ")}</p>
                    <a href={`/game/${game.slug}`} className="link">
                      <button >More info</button><button onClick={() => handleBuyClick(game)}>BUY</button>
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </section>

        <section id="myGames" >
          <div id="libraryView">
            <MyGames games={games} displayCount={4} />
          </div>
          <Link to="/mygames">
            <button type="button">Go to library</button>
          </Link>
        </section>

        <section id="my-favorites">
          <div className="vl">
            <h2>MY FAVOURITES ({favoriteGamesCount} GAMES)</h2>
            {slicedFavoriteGames.map((game) => (
              <div key={game.id} className="game-card-wrapper">
                <div className="game-card-img">
                  <h3>{game.name}</h3>
                  <img src={game.background_image} alt={game.name} />
                  <button onClick={() => handleRemoveFromFavorites(game.id)}>
                    Remove from Favorites
                  </button>
                  
                </div>
                <div className="game-card-details">
                </div>
              </div>
            ))}
            <Link to="/myfavourites">
              <button type="button">Go to favourites</button>
            </Link>
          </div>

        </section>
      </div>
    </main>
  );
}