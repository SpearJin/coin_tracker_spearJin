import styled from 'styled-components';
import { fetchCoins } from '../api';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import ToggleBtn from '../components/ToggleBtn';

interface ICoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data: coins } = useQuery<ICoins[]>('allCoins', fetchCoins);

  return (
    <Container>
      <Header>
        <Title>코인</Title>
        <ToggleBtn />
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinInfo>
          <CoinInfoHeader>
            <SubTitle>Top 10</SubTitle>
            <Link to='/btc-bitcoin'>코인 리스트</Link>
          </CoinInfoHeader>
          <CoinList>
            {coins?.slice(0, 10).map((coin) => (
              <Coin key={coin.id}>
                <Link to={{ pathname: `/${coin.id}/price` }} state={{ name: coin.name }}>
                  <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                  <span>{coin.name}</span>
                </Link>
              </Coin>
            ))}
          </CoinList>
        </CoinInfo>
      )}
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

const Loader = styled.h3`
  font-size: 28px;
  text-align: center;
`;

const CoinInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 800px;
`;

const CoinInfoHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    font-size: 14px;
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
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
  align-items: center;
  padding: 20px;
  margin: 10px 0;
  width: 35%;
  border-radius: 15px;
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

export default Coins;
