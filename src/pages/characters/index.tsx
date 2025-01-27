import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import './character.scss';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Characters: React.FC = () => {

  interface Character {
    id: number;
    name: string;
    image: string;
  }

  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character', {
      params: {
        page: currentPage,
      },
    }).then((response) => {
      setCharacters(response.data.results);
      setTotalPages(response.data.info.pages);
    });
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <h1>Liste des personnages</h1>
      <div className="container_characters">
        {characters.map((elem) => (
          <Link key={elem.id} href={`/characters/${elem.id}`}>
            <p>{elem.name}</p>
            <Image src={elem.image} alt={elem.name} width={200} height={200} priority />
          </Link>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          {currentPage !==1 &&<FaArrowLeft />}
        </button>
        <span>Page {currentPage} sur {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          {currentPage !== totalPages &&<FaArrowRight />}
        </button>
      </div>
    </>
  );
};

export default Characters;
