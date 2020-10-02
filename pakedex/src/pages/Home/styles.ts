import  styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex:1;   
  justify-content:center;
  align-items: center;
  z-index:2;
`;

export const Title = styled.p`
  font-size: 24px;  
  margin-left:25px;
  margin-bottom:20px;
`;

export const Column = styled.div`
  display: flex;
  flex:1;   
  flex-direction:column;
  justify-content:center;
  align-items: flex-start;
  margin-left: 80px;
`;
