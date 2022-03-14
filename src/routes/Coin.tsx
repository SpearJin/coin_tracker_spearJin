import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CoinInfo from '../components/CoinInfo';
import CoinList from '../components/CoinList';
import ToggleBtn from '../components/ToggleBtn';

function Coin() {
  return (
    <Container>
      <Header>
        <Home>
          <Link to='/'>🏠</Link>
        </Home>
        <Title>코인</Title>
        <ToggleBtn />
      </Header>
      <CoinContainer>
        <CoinInfo />
        <CoinList />
      </CoinContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 0 auto;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15vh;
`;

const Home = styled.div`
  margin-right: 20px;
  a {
    font-size: 28px;
  }
`;

const Title = styled.h1`
  font-size: 48px;
`;

const CoinContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

export default Coin;
