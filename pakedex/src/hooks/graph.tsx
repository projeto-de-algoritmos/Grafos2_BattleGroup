import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { fill, get } from 'lodash';
import { PokemonType, PokemonTypeConnect } from '../common';
import { findCircuits } from './algorithmJohnson.js';

interface GraphContextData {
  matrix: number[][];
  strengthsList: number[][] | undefined;
}

const GraphContext = createContext<GraphContextData>({} as GraphContextData);

const GraphProvider: React.FC = ({ children }) => {
  const [matrix, setMatrix] = useState<number[][]>({} as number[][]);
  const [strengthsList, setStrengthsList] = useState<number[][] | undefined>(
    undefined,
  );

  // TODO: construindo matriz de adjacência e definindo peso nas arestas do grafo.
  const buildAdjacencyMatrix = useCallback(() => {
    const matrixTemp = PokemonTypeConnect.map((item) => {
      const rowMatrix = fill(Array(PokemonTypeConnect.length), 1);
      item.weaknesses.forEach((element) => {
        rowMatrix[get(PokemonType, `${element}`)] = 0.5;
      });

      item.strengths.forEach((element) => {
        rowMatrix[get(PokemonType, `${element}`)] = 2;
      });

      item.immunes.forEach((element) => {
        rowMatrix[get(PokemonType, `${element}`)] = 0;
      });

      return rowMatrix;
    });

    // console.log(matrixTemp);
    setMatrix(matrixTemp);
  }, []);

  // TODO: construindo lista de adjacência para força
  // TODO: salvando os ciclos relacionados à força

  const buildAdjacencyList = useCallback(() => {
    const listTemp = PokemonTypeConnect.map((item) => {
      let list: number[] = [];

      item.strengths.forEach((element) => {
        list = [...list, get(PokemonType, `${element}`)];
      });

      return list;
    });

    setStrengthsList(findCircuits(listTemp));
  }, []);

  useEffect(() => {
    buildAdjacencyList();
    buildAdjacencyMatrix();
  }, [buildAdjacencyList, buildAdjacencyMatrix]);

  return (
    <GraphContext.Provider
      value={{
        matrix,
        strengthsList,
      }}
    >
      {children}
    </GraphContext.Provider>
  );
};

function useGraph(): GraphContextData {
  const context = useContext(GraphContext);

  if (!context) {
    throw new Error('useGraph must be user within  an AuthProviver');
  }

  return context;
}

export { GraphContext, GraphProvider, useGraph };
