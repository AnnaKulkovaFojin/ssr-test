import React, { useCallback, useEffect, useState } from 'react';
import './cat-facts.css';
import { useParams } from 'react-router-dom';

export default function CatFact() {
  const { catId } = useParams();
  const [catImage, setCatImage] = useState();
  const [catFact, setCatFact] = useState();

  const getCatImage = useCallback(async () => {
    const catImgResponse = await fetch(
      `https://api.thecatapi.com/v1/images/${catId}`
    );
    const catImage = await catImgResponse.json();
    setCatImage(catImage.url);
  }, [catId]);

  const getCatFact = useCallback(async () => {
    const catFactResponse = await fetch(
      'https://meowfacts.herokuapp.com?lang=rus-ru'
    );
    const catFact = await catFactResponse.json();
    setCatFact(catFact.data);
  }, []);

  useEffect(() => {
    getCatFact();
    getCatImage();
  }, [getCatImage, getCatFact]);

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
