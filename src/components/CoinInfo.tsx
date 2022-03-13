import styled from 'styled-components';
import { Link, Outlet, useParams, useMatch } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchCoinInfo, fetchTickerInfo } from '../api';

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
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

function CoinInfo() {
  const { coinId } = useParams();
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(['coinInfo', coinId], () =>
    fetchCoinInfo(coinId)
  );
  const { isLoading: tickerLoading, data: tickerData } = useQuery<PriceData>(
    ['tickerInfo', coinId],
    () => fetchTickerInfo(coinId),
    { refetchInterval: 5000 }
  );
  const isLoading = infoLoading || tickerLoading;

  const chartMatch = useMatch('/:coinId/chart');
  const priceMatch = useMatch('/:coinId/price');

  const percent = tickerData?.quotes?.USD?.percent_change_24h ? tickerData?.quotes?.USD?.percent_change_24h : false;

  return (
    <Container>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItemPercent percent={percent > 0 ? true : false}>
              <span>현재가:</span>
              <span>{tickerData?.quotes.USD.price.toFixed(3)} USD</span>
            </OverviewItemPercent>
            <OverviewItemPercent percent={percent > 0 ? true : false}>
              <span>전일 대비:</span>
              <span>{tickerData?.quotes?.USD?.percent_change_24h}%</span>
            </OverviewItemPercent>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>차트</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>정보</Link>
            </Tab>
          </Tabs>
        </>
      )}
      <Outlet context={{ coinId }} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  width: 480px;
  height: 800px;
  overflow-y: auto;
`;

const Loader = styled.h2`
  font-size: 38px;
  text-align: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    margin-bottom: 5px;
    font-size: 12px;
    text-transform: uppercase;
  }
`;

const OverviewItemPercent = styled.div<{ percent: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    margin-bottom: 5px;
    font-size: 12px;
    text-transform: uppercase;
  }
  span:last-child {
    color: ${(props) => (props.percent ? props.theme.chartUpColor : props.theme.chartDownColor)};
  }
`;

const Description = styled.p`
  padding: 10px;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const Tab = styled.div<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? props.theme.accentColor : props.theme.textColor)};
  a {
    display: block;
  }
`;

export default CoinInfo;
