import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import './character.scss'
import Link from 'next/link';

const Characters: React.FC = () => {
  const [characters, setCharacters] = useState<any[]>([]);

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character').then((response) => {
        setCharacters(response.data.results);
    });
  }, []);

  return (
    <>
    <h1>Liste des personnages</h1>
    <div className='container_characters'>
      {characters.map((elem) => (
        <Link key={elem.id} href={`/characters/${elem.id}`}>
          <p>{elem.name}</p>
          <Image src={elem.image} alt={elem.name} width={200} height={200} />
        </Link>
      ))}
    </div>
    </>
  );
};

export default Characters;
