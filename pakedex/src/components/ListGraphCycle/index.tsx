import React, { useEffect, useState } from 'react';

import { get, includes, head } from 'lodash';
import { Container } from './styles';
import GraphCycle from '../GraphCycle';
import { useGraph } from '../../hooks/graph';
import { Pokemons, PokemonType } from '../../common';

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

interface ListGraphCycleProps {
  selectedPokemon: Pokemon | undefined;
}

const ListGraphCycle: React.FC<ListGraphCycleProps> = ({ selectedPokemon }) => {
  const { strengthsList } = useGraph();
  const [listGraph, setListGraph] = useState<number[][] | undefined>(undefined);

  useEffect(() => {
    setListGraph(
      strengthsList?.filter((item) =>
        includes(item, get(PokemonType, `${selectedPokemon?.type[0]}`)),
      ),
    );
  }, [selectedPokemon, strengthsList]);

  return (
    <Container>
      {listGraph &&
        listGraph.map((item) => (
          <GraphCycle
            cycle={item}
            type={get(PokemonType, `${selectedPokemon?.type[0]}`)}
            pokemon={selectedPokemon}
          />
        ))}
    </Container>
  );
};

export default ListGraphCycle;
