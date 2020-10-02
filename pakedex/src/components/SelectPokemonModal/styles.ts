import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  max-height: 500px;
  padding: 20px;
`;

export const Column = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: #fefefe;
  height: 500px;
  overflow-y: auto;
`;

export const Divider = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1px;
  height: 100%;
  background-color: #dd412e;
`;

export const PokeRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;

export const PokeTitle = styled.p`
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 20px;
`;

export const PokeDisplay = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 65px;
  width: 65px;
  background-color: #edededed;
  border: 2px solid #dd412e;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
`;

export const PokeDisplayStats = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  width: 150px;
  background-color: #edededed;
  border: 2px solid #dd412e;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
`;

export const StatsList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const Stats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const Status = styled.p`
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const ConfirmButton = styled.button`
  margin: 15px;
  background-color: #dd412e;
  height: 35px;
  width: 100%;
  border: none;
`;

export const ContainerEnemy = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const TitleEnemy = styled.p`
  color: ${(props) => props.color};
  text-align: center;
  margin: 30px 0 10px 0px;
  font-size: 15px;
`;

export const NameEnemy = styled.p`
  text-align: center;
  font-size: 10px;
`;
