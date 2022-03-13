import styled from 'styled-components';
import CoinInfo from '../components/CoinInfo';
import CoinList from '../components/CoinList';

function Coin() {
  return (
    <Container>
      <Header>
        <Title>코인</Title>
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

const Title = styled.h1`
  font-size: 48px;
`;

const CoinContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
`;

export default Coin;
