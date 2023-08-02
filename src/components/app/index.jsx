import React, { useEffect, useState } from 'react';
import './App.css';

export default function App() {
  const [catsImages, setCatsImages] = useState([]);

  const getCatImages = async () => {
    const response = await fetch(
      'https://api.thecatapi.com/v1/images/search?limit=9'
    );
    const catsResponse = await response.json();
    setCatsImages(catsResponse);
  };

  useEffect(() => {
    getCatImages();
  }, []);

  return (
    <div className="main">
      <h1>Kotiki</h1>
      <div className="grid">
        {catsImages.map((cat) => (
          <img
            src={cat.url}
            width={200}
            height={200}
            key={cat.id}
            className="cat"
            alt="cat"
          />
        ))}
      </div>
    </div>
  );
}
