import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { fetchCoins, fetchTickerInfo, fetchTickers } from '../api';
import { Link, useParams } from 'react-router-dom';

interface ICoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function CoinList() {
  const { isLoading, data } = useQuery<PriceData[]>('allTicker', fetchTickers, { refetchInterval: 5000 });

  const [tickers, setTickers] = useState(data);
  const [myText, setMyTest] = useState('');

  useEffect(() => {
    const coinFilter = data?.filter((coin) => coin.name.toLocaleLowerCase().includes(myText.toLocaleLowerCase()));
    setTickers(coinFilter);
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
        {tickers?.slice(0, 100).map((ticker) => (
          <CoinItem key={ticker.id} percent={ticker.quotes.USD.percent_change_24h > 0}>
            <Link to={{ pathname: `/${ticker.id}` }} state={{ name: ticker.name }}>
              <Img src={`https://cryptoicon-api.vercel.app/api/icon/${ticker.symbol.toLowerCase()}`} />
              <span>{ticker.name}</span>
              <span>{ticker.quotes.USD.percent_change_24h} %</span>
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
  width: 30vw;
  height: 100%;
  border-radius: 15px;
  box-shadow: 4px 4px 6px #51585a, -4px -4px 6px #a0a8ab;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

const Title = styled.h2`
  font-size: 24px;
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
  ::-webkit-scrollbar {
    width: 22px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #7bb4c3;
    background-clip: padding-box;
    border: 2px solid transparent;
    border-radius: 50%;
    cursor: pointer;
  }
  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #fff;
    cursor: pointer;
  }
`;

const CoinItem = styled.li<{ percent: boolean }>`
  width: 80%;
  padding: 5px;
  margin: 20px 0;
  border-radius: 10px;
  background-color: ${(props) => props.theme.cardColor};
  box-shadow: 4px 4px 6px #51585a, -4px -4px 6px #a0a8ab;
  a {
    display: flex;
    align-items: center;
    padding: 10px;
    font-size: 16px;
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
  span:last-child {
    margin-left: 10px;
    color: ${(props) => (props.percent ? props.theme.chartUpColor : props.theme.chartDownColor)};
    font-size: 14px;
  }
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

export default CoinList;
