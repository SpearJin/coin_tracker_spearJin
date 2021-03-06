import styled from 'styled-components';
import { Link, Outlet, useParams, useMatch } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchCoinInfo, fetchTickerInfo } from '../api';
import { InfoData, PriceData } from '../type';
import { Helmet } from 'react-helmet-async';

function CoinInfo() {
  const { coinId } = useParams();

  // 티커에 대략적인 정보
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ['coinInfo', coinId],
    () => fetchCoinInfo(coinId)
  );

  // 티커에 가격 정보 자세히
  const { isLoading: tickerLoading, data: tickerData } = useQuery<PriceData>(
    ['tickerInfo', coinId],
    () => fetchTickerInfo(coinId),
    { refetchInterval: 5000 }
  );

  // true 경우 화면에 나타나도록 함
  const isLoading = infoLoading || tickerLoading;

  // 정보, 차트 어떤걸 보여줄지
  const chartMatch = useMatch('/:coinId/chart');
  const priceMatch = useMatch('/:coinId/price');

  // 상승, 하락 글자색
  const percent = tickerData?.quotes?.USD?.percent_change_24h
    ? tickerData?.quotes?.USD?.percent_change_24h
    : false;

  return (
    <Container>
      <Helmet>
        <title>{infoData ? `스피어진_${infoData?.name}` : 'Loading...'}</title>
      </Helmet>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Title>{infoData?.name}</Title>
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
          <Description>
            <span>상품설명</span>
            <p>{infoData?.description}</p>
          </Description>
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
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>정보</Link>
            </Tab>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>차트</Link>
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
  padding: 10px 20px;
  width: 600px;
  max-height: 800px;
  border-radius: 15px;
  box-shadow: 4px 4px 6px #51585a, -4px -4px 6px #a0a8ab;
  overflow-y: auto;
  @media (max-width: 1020px) {
    width: 350px;
    max-height: 600px;
  }
  @media (max-width: 680px) {
    width: 100%;
    min-width: 200px;
  }
`;

const Loader = styled.h2`
  font-size: 38px;
  text-align: center;
`;

const Title = styled.h2`
  padding: 10px;
  font-size: 32px;
  text-align: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.textColor};
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
  font-weight: 800;
  span:first-child {
    margin-bottom: 5px;
    font-size: 10px;
    text-transform: uppercase;
    font-weight: 400;
  }
`;

const OverviewItemPercent = styled.div<{ percent: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 800;
  span:first-child {
    margin-bottom: 5px;
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
  }
  span:last-child {
    color: ${(props) =>
      props.percent ? props.theme.chartUpColor : props.theme.chartDownColor};
  }
`;

const Description = styled.div`
  padding: 10px;
  font-weight: 800;
  span {
    font-weight: 400;
    font-size: 10px;
  }
  p {
    margin-top: 5px;
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const Tab = styled.div<{ isActive: boolean }>`
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  font-weight: 800;
  a {
    display: block;
  }
  &:hover {
    opacity: 0.8;
  }
`;

export default CoinInfo;
