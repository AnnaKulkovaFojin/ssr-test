import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import './cats-list.css';

export default function CatsList() {
  const catsImages = useLoaderData();

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
