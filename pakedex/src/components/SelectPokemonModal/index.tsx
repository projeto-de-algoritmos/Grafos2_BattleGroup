import React, { useState, useEffect, useCallback } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { get, drop, head } from 'lodash';
import GraphCycle from '../GraphCycle';
import ListGraphCycle from '../ListGraphCycle';

import { Pokemons, PokemonType } from '../../common';
import {
  Container,
  Column,
  Divider,
  PokeRow,
  PokeDisplay,
  PokeTitle,
  StatsList,
  PokeDisplayStats,
  Stats,
  Status,
  ConfirmButton,
  ContainerEnemy,
  TitleEnemy,
  NameEnemy,
} from './styles';
import { useGraph } from '../../hooks/graph';

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

const SelectPokemonModal: React.FC<{
  open: boolean;
  handleModal: () => void;
  selectedPokemon: Pokemon | undefined;
  setSelectedPokemon: React.Dispatch<React.SetStateAction<Pokemon | undefined>>;
  enemyTeam: (Pokemon | undefined)[];
}> = ({
  open,
  handleModal,
  selectedPokemon,
  setSelectedPokemon,
  enemyTeam,
}) => {
  const pokemon: Pokemon[] = Pokemons;
  const { strengthsList, matrix } = useGraph();

  function handleClick(item: Pokemon): void {
    setSelectedPokemon(item);
  }

  function renderPokemon(item: Pokemon): JSX.Element {
    return (
      <PokeDisplay onClick={() => handleClick(item)}>
        <img src={item.img} />
      </PokeDisplay>
    );
  }

  const renderEffective = (enemy: Pokemon | undefined): JSX.Element => {
    if (
      matrix[get(PokemonType, `${selectedPokemon?.type[0]}`)][
        get(PokemonType, `${enemy?.type[0]}`)
      ] === 0.5
    ) {
      return <TitleEnemy color="red">Não muito eficaz contra</TitleEnemy>;
    }
    if (
      matrix[get(PokemonType, `${selectedPokemon?.type[0]}`)][
        get(PokemonType, `${enemy?.type[0]}`)
      ] === 2
    ) {
      return <TitleEnemy color="green">Super eficaz contra</TitleEnemy>;
    }
    if (
      matrix[get(PokemonType, `${selectedPokemon?.type[0]}`)][
        get(PokemonType, `${enemy?.type[0]}`)
      ] === 1
    ) {
      return <TitleEnemy color="gray">Normal contra</TitleEnemy>;
    }
    if (
      matrix[get(PokemonType, `${selectedPokemon?.type[0]}`)][
        get(PokemonType, `${enemy?.type[0]}`)
      ] === 0
    ) {
      return <TitleEnemy color="black">Sem efeito contra</TitleEnemy>;
    }
    return <TitleEnemy>Super eficaz</TitleEnemy>;
  };

  return (
    <div>
      <Dialog
        fullWidth
        onClose={handleModal}
        aria-labelledby="simple-dialog-title"
        open={open}
        maxWidth="md"
        scroll="paper"
        PaperProps={{ style: { maxWidth: '100%' } }}
        onClick={(e) => e.stopPropagation()}
      >
        <DialogContent>
          <Container>
            <Column>
              <PokeTitle>Selecione um Pokemon</PokeTitle>
              <PokeRow>{pokemon.map((item) => renderPokemon(item))}</PokeRow>
            </Column>
            <Divider />
            <Column>
              {get(selectedPokemon, 'img', null) ? (
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <PokeTitle>Pokemon Selecionado</PokeTitle>
                  </div>
                  <StatsList>
                    <PokeDisplayStats>
                      <img
                        style={{ height: 150, width: 150 }}
                        src={get(selectedPokemon, 'img', '')}
                      />
                    </PokeDisplayStats>
                    <Stats>
                      <Status>Nome : {get(selectedPokemon, 'name', '')}</Status>
                      <Status>Id : #{get(selectedPokemon, 'id', '')}</Status>
                      <Status>Tipos :</Status>
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        {selectedPokemon?.type.map((type) => (
                          <p style={{ marginLeft: 5, marginRight: 5 }}>
                            {type}
                          </p>
                        ))}
                      </div>
                    </Stats>
                  </StatsList>
                  <ContainerEnemy>
                    {enemyTeam.map((enemy) => (
                      <div
                        style={{
                          justifyContent: 'center',
                          maxWidth: 150,
                          alignItems: 'center',
                        }}
                      >
                        {matrix && renderEffective(enemy)}
                        <img
                          style={{ height: 150, width: 150 }}
                          src={get(enemy, 'img', '')}
                        />
                        <NameEnemy>{get(enemy, 'name', '')}</NameEnemy>
                      </div>
                    ))}
                  </ContainerEnemy>
                  <ConfirmButton onClick={handleModal}>
                    <p>Selecionar pokemon</p>
                  </ConfirmButton>
                </div>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <PokeTitle>Nenhum Selecionado</PokeTitle>
                </div>
              )}
              <ListGraphCycle selectedPokemon={selectedPokemon} />
            </Column>
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SelectPokemonModal;
