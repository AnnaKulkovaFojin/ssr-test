import React from 'react';
import { useLoaderData } from 'react-router-dom';
import './cat-facts.css';

export default function CatFact() {
  const { catFact, catImage } = useLoaderData();
  return (
    <div className="cat-facts-container">
      <h1>Рандомный котячий факт</h1>
      <div className="cat-card">
        {catImage && <img className="cat" src={catImage} alt="random cat" />}
        <p>{catFact}</p>
      </div>
    </div>
  );
}
