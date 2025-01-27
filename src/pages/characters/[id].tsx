import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import './character.scss';
import { FaArrowLeft } from "react-icons/fa";

const CharacterElem: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [character, setCharacter] = useState<any | null>(null);

  useEffect(() => {
    if (id) {
      axios.get(`https://rickandmortyapi.com/api/character/${id}`).then((response) => {
        setCharacter(response.data);
      });
    }
  }, [id]);

  return (
    <div className='container-one-character'>
      <Link href="/characters" passHref>
        <button className="back-button"><FaArrowLeft /> Retour à l'accueil</button>
      </Link>

      {character ? (
        <>
        <div className='container-character-infos'>
          <p><span className='important'>Nom:</span> {character.name}</p>
            <p><span className='important'>Status:</span>  {character.status}</p>
            <p><span className='important'>Espèce:</span>  {character.species}</p>
            {character.image && (
              <Image src={character.image} alt={character.name} width={150} height={150} />
            )}
            <p><span className='important'>Origine: </span> {character.origin.name}</p>
            <p><span className='important'>Location: </span> {character.location.name}</p>
        </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CharacterElem;
