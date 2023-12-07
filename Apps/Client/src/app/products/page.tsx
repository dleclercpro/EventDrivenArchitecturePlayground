'use client'

import TestButton from '@/components/buttons/TestButton';
import styles from '../page.module.css';
import { Suspense, useState } from 'react';
import Loader from '@/components/Loader';
import { getPokemonList } from '@/utils';

interface HomePageProps {

}

const HomePage: React.FC<HomePageProps> = () => {
  const [pokemonList, setPokemonList] = useState([]);

  const handleClick = async () => {
    const limit = 151; // # of Pokémon in first generation
    
    console.log(`Will load ${limit} Pokemon...`);

    setPokemonList(await getPokemonList(limit));
  }
  
  return (
    <Suspense fallback={<Loader />}>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>Pokemon - 1st Generation</p>
          <TestButton onClick={handleClick}>Load Pokemon List</TestButton>
        </div>
        <ol>
          {pokemonList.map((item: string) => (
            <li>{item}</li>
          ))}
        </ol>
      </main>
    </Suspense>
  )
}

export default HomePage;