import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { fetchTickers } from '../api';
import { Link } from 'react-router-dom';
import { PriceData } from '../type';

function CoinList() {
  const { data } = useQuery<PriceData[]>('allTicker', fetchTickers, {
    refetchInterval: 5000,
  });

  const [tickers, setTickers] = useState(data);
  const [myText, setMyTest] = useState('');

  useEffect(() => {
    const coinFilter = data?.filter((coin) =>
      coin.name.toLocaleLowerCase().includes(myText.toLocaleLowerCase())
    );
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
          <input
            type='text'
            value={myText}
            placeholder='티커검색...'
            onChange={onChange}
          />
        </Search>
      </Header>
      <Coinitems>
        {tickers?.slice(0, 100).map((ticker) => (
          <CoinItem
            key={ticker.id}
            percent={ticker.quotes.USD.percent_change_24h > 0}
          >
            <Link
              to={{ pathname: `/${ticker.id}/price` }}
              state={{ name: ticker.name }}
            >
              <Img
                src={`https://cryptocurrencyliveprices.com/img/${ticker.id}.png`}
              />
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
  @media (max-width: 1020px) {
    width: 25vw;
    max-height: 600px;
  }
  @media (max-width: 680px) {
    width: 100%;
    min-width: 200px;
    margin-top: 30px;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  @media (max-width: 1020px) {
    flex-direction: column;
    row-gap: 8px;
  }
  @media (max-width: 680px) {
    flex-direction: row;
  }
`;

const Title = styled.h2`
  font-size: 24px;
`;

const Search = styled.form`
  display: flex;
  align-items: center;
  margin-left: 10px;
  border-radius: 10px;
  box-shadow: 2px 2px 3px #51585a, -2px -2px 3px #a0a8ab;
  input {
    height: 30px;
    outline: none;
    border: none;
    border-radius: 10px;
    color: #2f4858;
    text-align: center;
    letter-spacing: 1.5px;
  }
`;

const Coinitems = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-height: 650px;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 22px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #918b8a;
    background-clip: padding-box;
    border: 3px solid transparent;
    border-radius: 15px;
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
    color: ${(props) =>
      props.percent ? props.theme.chartUpColor : props.theme.chartDownColor};
    font-size: 14px;
    font-weight: 800;
  }
  @media (max-width: 1020px) {
    a {
      flex-direction: column;
      justify-content: center;
      row-gap: 5px;
    }
    span:last-child {
      margin: 0;
    }
  }
  @media (max-width: 680px) {
    a {
      flex-direction: row;
      justify-content: flex-start;
    }
    span:last-child {
      margin-left: 10px;
    }
  }
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
  @media (max-width: 1020px) {
    margin: 0;
  }
  @media (max-width: 680px) {
    margin-right: 10px;
  }
`;

export default CoinList;
