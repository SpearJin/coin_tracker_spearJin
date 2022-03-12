import React, { useEffect, useRef, useState } from 'react';
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
  const { isLoading, data } = useQuery<ICoins[]>('allCoins', fetchCoins);
  const [coins, setCoins] = useState(data);
  const [myText, setMyTest] = useState('');

  useEffect(() => {
    const coinFilter = data?.filter((coin) => coin.name.toLocaleLowerCase().includes(myText.toLocaleLowerCase()));
    setCoins(coinFilter);
  }, [myText, data]);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setMyTest(value);
  };

  return (
    <Container>
      <Header>
        <Title>코인리스트</Title>
        <Search>
          <input type='text' value={myText} placeholder='티커검색...' onChange={onChange} />
        </Search>
      </Header>
      <Coinitems>
        {coins?.slice(0, 100).map((coin) => (
          <CoinItem key={coin.id}>
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
  width: 25vw;
  border-radius: 15px;
  box-shadow: 4px 4px 6px #51585a, -4px -4px 6px #a0a8ab;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const Title = styled.h2`
  font-size: 32px;
`;

const Search = styled.form`
  display: flex;
  align-items: center;
  margin-left: 10px;
  input {
    height: 30px;
    outline: none;
    border: none;
    border-radius: 10px;
    text-align: center;
  }
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
  border-radius: 10px;
  background-color: ${(props) => props.theme.cardColor};
  box-shadow: 4px 4px 6px #51585a, -4px -4px 6px #a0a8ab;
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
