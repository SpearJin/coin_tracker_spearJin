import React from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { fetchCoins } from '../api';
import { Link } from 'react-router-dom';

interface ICoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function CoinList() {
  const { isLoading, data: coins } = useQuery<ICoins[]>('allCoins', fetchCoins);

  return (
    <Container>
      <Header>
        <Title>코인리스트</Title>
      </Header>
      <Coinitems>
        {coins?.slice(0, 100).map((coin) => (
          <CoinItem>
            <Link to={{ pathname: `/${coin.id}` }} state={{ name: coin.name }}>
              <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
              <span>{coin.name}</span>
            </Link>
          </CoinItem>
        ))}
      </Coinitems>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 15px;
  box-shadow: 4px 4px 12px #51585a, -4px -4px 12px #a0a8ab;
`;

const Header = styled.header`
  padding: 10px;
`;

const Title = styled.h2`
  font-size: 32px;
`;

const Coinitems = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-height: 500px;
  overflow: auto;
`;

const CoinItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  padding: 5px;
  margin: 20px 0;
  border-radius: 15px;
  background-color: ${(props) => props.theme.cardColor};
  box-shadow: 0px 0px 5px 3px #fff;
  a {
    display: flex;
    padding: 10px;
    align-items: center;
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

export default CoinList;
