import React from 'react';
import { useQuery } from 'react-query';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import { fetchTickerInfo } from '../api';

interface ChartProps {
  coinId: string;
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

function Price() {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data: tickerInfo } = useQuery<PriceData>(['tickerInfo', coinId], () => fetchTickerInfo(coinId), {
    refetchInterval: 10000,
  });

  return (
    <>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <PriceList>
          <PriceItem>
            <PriceName>현재가</PriceName>
            <PriceInfo percent={tickerInfo?.quotes?.USD?.price ? tickerInfo?.quotes.USD.price : 0}>
              $ {tickerInfo?.quotes.USD.price.toFixed(3)}
            </PriceInfo>
          </PriceItem>
          <PriceItem>
            <PriceName>15분전</PriceName>
            <PriceInfo
              percent={tickerInfo?.quotes?.USD?.percent_change_15m ? tickerInfo?.quotes.USD.percent_change_15m : 0}
            >
              {tickerInfo?.quotes.USD.percent_change_15m} %
            </PriceInfo>
          </PriceItem>
          <PriceItem>
            <PriceName>1시간전</PriceName>
            <PriceInfo
              percent={tickerInfo?.quotes.USD.percent_change_1h ? tickerInfo?.quotes.USD.percent_change_1h : 0}
            >
              {tickerInfo?.quotes.USD.percent_change_1h} %
            </PriceInfo>
          </PriceItem>
          <PriceItem>
            <PriceName>12시간전</PriceName>
            <PriceInfo
              percent={tickerInfo?.quotes.USD.percent_change_12h ? tickerInfo?.quotes.USD.percent_change_12h : 0}
            >
              {tickerInfo?.quotes.USD.percent_change_12h} %
            </PriceInfo>
          </PriceItem>
          <PriceItem>
            <PriceName>1주일전</PriceName>
            <PriceInfo
              percent={tickerInfo?.quotes.USD.percent_change_7d ? tickerInfo?.quotes.USD.percent_change_7d : 0}
            >
              {tickerInfo?.quotes.USD.percent_change_7d} %
            </PriceInfo>
          </PriceItem>
          <PriceItem>
            <PriceName>1달전</PriceName>
            <PriceInfo
              percent={tickerInfo?.quotes.USD.percent_change_30d ? tickerInfo?.quotes.USD.percent_change_30d : 0}
            >
              {tickerInfo?.quotes.USD.percent_change_30d} %
            </PriceInfo>
          </PriceItem>
        </PriceList>
      )}
    </>
  );
}

const Loader = styled.h2`
  margin-top: 20px;
  font-size: 16px;
  text-align: center;
`;

const PriceList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  font-weight: 600;
  li:first-child {
    h3:last-child {
      color: #61b07c;
    }
  }
`;

const PriceItem = styled.li`
  display: flex;
  align-items: center;
  width: 80%;
  margin-top: 20px;
  padding: 15px;
  border-radius: 15px;
  box-shadow: 4px 4px 6px #51585a, -4px -4px 6px #a0a8ab;
`;

const PriceName = styled.h3`
  flex-basis: 50%;
  font-size: 12px;
`;

const PriceInfo = styled.h3<{ percent: number }>`
  color: ${(props) => (props.percent > 0 ? props.theme.chartUpColor : props.theme.chartDownColor)};
  font-size: 22px;
  flex-basis: 50%;
  @media (max-width: 1020px) {
    font-size: 18px;
  }
`;

export default Price;
