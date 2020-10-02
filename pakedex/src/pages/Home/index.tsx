import React, { useState } from 'react';

import { Title, Container, Column } from './styles';

import { ButtonPokemon, SelectPokemonModal } from '../../components';

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

const Home: React.FC = () => {
  const [enemyTeam, setEnemyTeam] = useState<Array<Pokemon | undefined>>([]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '15%' }}>
      <Column>
        <Title>Seu time</Title>
        <Container>
          <ButtonPokemon
            isEnemy={false}
            enemyTeam={enemyTeam}
            setEnemyTeam={setEnemyTeam}
          />
          <ButtonPokemon
            isEnemy={false}
            enemyTeam={enemyTeam}
            setEnemyTeam={setEnemyTeam}
          />
          <ButtonPokemon
            isEnemy={false}
            enemyTeam={enemyTeam}
            setEnemyTeam={setEnemyTeam}
          />
        </Container>
      </Column>

      <Column>
        <Title>Time inimigo</Title>
        <Container>
          <ButtonPokemon
            isEnemy
            enemyTeam={enemyTeam}
            setEnemyTeam={setEnemyTeam}
          />
          <ButtonPokemon
            isEnemy
            enemyTeam={enemyTeam}
            setEnemyTeam={setEnemyTeam}
          />
          <ButtonPokemon
            isEnemy
            enemyTeam={enemyTeam}
            setEnemyTeam={setEnemyTeam}
          />
        </Container>
      </Column>
    </div>
  );
};
export default Home;
