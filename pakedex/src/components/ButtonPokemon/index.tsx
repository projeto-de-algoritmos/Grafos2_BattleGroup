import React, { useState, useEffect } from 'react';
import SelectPokemonModal from '../SelectPokemonModal';
import { Pokemons, PokemonType } from '../../common';

import { Container } from './styles';

interface Pokemon {
  id: number;
  num: string;
  name: string;
  img: string;
  type: string[];
  height: string;
  weight: string;
  candy: string;
  candy_count?: number | null;
  egg: string;
  spawn_chance: number;
  avg_spawns: number;
  spawn_time: string;
  multipliers: number[] | null;
  weaknesses: string[];
  next_evolution?: {
    num: string;
    name: string;
  }[];
  prev_evolution?: {
    num: string;
    name: string;
  }[];
}

const ButtonPokemon: React.FC<{
  isEnemy: boolean;
  enemyTeam: (Pokemon | undefined)[];
  setEnemyTeam: React.Dispatch<React.SetStateAction<(Pokemon | undefined)[]>>;
}> = ({ isEnemy, enemyTeam, setEnemyTeam }) => {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | undefined>(
    undefined,
  );
  const [isVisible, setIsVisible] = useState(false);

  const [pokeNumber, setPokeNumber] = useState('');
  const pokemon: Pokemon[] = Pokemons;

  useEffect(() => {
    if (isEnemy === true) {
      const index = Math.floor(Math.random() * 151) + 1;
      setSelectedPokemon(pokemon[index]);
      setEnemyTeam((enemyTeam) => [...enemyTeam, pokemon[index]]);
    }
  }, []);

  const handleModal = (): void => {
    if (isEnemy == true) {
      setIsVisible(false);
    } else {
      setIsVisible(!isVisible);
    }
  };

  return (
    <Container onClick={handleModal}>
      {selectedPokemon ? (
        <>
          <img src={selectedPokemon.img} />
          <p>{selectedPokemon.name}</p>
        </>
      ) : (
        <>
          <p style={{ fontSize: 40, marginBottom: 20 }}>+</p>
          <p>Select Pokemon</p>
        </>
      )}
      <SelectPokemonModal
        open={isVisible}
        selectedPokemon={selectedPokemon}
        setSelectedPokemon={setSelectedPokemon}
        handleModal={handleModal}
        enemyTeam={enemyTeam}
      />
    </Container>
  );
};

export default ButtonPokemon;
