import React, { useState } from 'react';
import styled from 'styled-components';

const coinData = [
  {
    id: '1',
    name: '비트코인',
  },
  {
    id: '2',
    name: '비트코코',
  },
  {
    id: '3',
    name: '비트코로나',
  },
  {
    id: '4',
    name: '비트코끼리',
  },
  {
    id: '5',
    name: '비트코코볼',
  },
  {
    id: '6',
    name: '비트코난',
  },
  {
    id: '3',
    name: '비트코로나',
  },
  {
    id: '4',
    name: '비트코끼리',
  },
  {
    id: '5',
    name: '비트코코볼',
  },
  {
    id: '6',
    name: '비트코난',
  },
];

function Coins() {
  const [coins, setCoins] = useState(coinData);

  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      <CoinInfo>
        <SubTitle>Top 10</SubTitle>
        <CoinList>
          {coins.map((coin) => (
            <Coin key={coin.id}>{coin.name}</Coin>
          ))}
        </CoinList>
      </CoinInfo>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15vh;
`;

const Title = styled.h1`
  font-size: 48px;
`;

const CoinInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 800px;
`;

const SubTitle = styled.h2`
  margin-bottom: 40px;
  font-size: 32px;
`;

const CoinList = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 20px;
`;

const Coin = styled.li`
  display: flex;
  padding: 40px;
  width: 30%;
  border-radius: 15px;
  background-color: ${(props) => props.theme.cardColor};
  box-shadow: 0px 0px 5px 3px #303030;
`;

export default Coins;
