import React, { useRef, useEffect } from 'react';

import { drop } from 'lodash';
import { Container, CicleGraph, Cicle } from './styles';
import { Icons } from '../../assets';

interface GraphCycleProp {
  cycle: any;
  pokemon: any;
  type: any;
}
const GraphCycle: React.FC<GraphCycleProp> = ({ cycle, pokemon, type }) => {
  const graph = useRef<any>(null);
  useEffect(() => {
    const ciclegraph = graph.current;
    const circleElements = ciclegraph?.childNodes;

    let angle = 360 - 90;
    const dangle = 360 / circleElements.length;

    for (let i = 0; i < circleElements.length; i += 1) {
      const circle = circleElements[i];
      angle += dangle;
      circle.style.transform = `rotate(${angle}deg) translate(${
        ciclegraph?.clientWidth / 2
      }px) rotate(-${angle}deg)`;
    }
  }, [cycle]);

  return (
    <Container>
      <CicleGraph ref={graph}>
        {cycle.length &&
          drop(cycle).map((item) => (
            <Cicle
              key={String(item)}
              style={{
                backgroundSize: type === item ? 90 : 50,
                backgroundColor:
                  type === item ? 'transparent' : Icons[Number(item)].color,
              }}
              image={type === item ? pokemon.img : Icons[Number(item)].image}
            />
          ))}
      </CicleGraph>
    </Container>
  );
};

export default GraphCycle;
