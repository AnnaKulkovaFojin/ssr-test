import React, { useEffect, useState } from 'react';
import './cats-list.css';
import { Link } from 'react-router-dom';

export default function CatsList() {
  const [catsImages, setCatsImages] = useState([]);

  const getCatImages = async () => {
    const response = await fetch(
      'https://api.thecatapi.com/v1/images/search?limit=9'
    );
    const catsResponse = await response.json();
    setCatsImages(catsResponse.slice(0, 9));
  };

  useEffect(() => {
    getCatImages();
  }, []);

  return (
    <div>
      <h1>Котеечки</h1>
      <div className="grid">
        {catsImages.map((cat) => (
          <Link key={cat.id} to={`/cat-fact/${cat.id}`}>
            <img
              src={cat.url}
              width={200}
              height={200}
              className="cat"
              alt="cat"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
