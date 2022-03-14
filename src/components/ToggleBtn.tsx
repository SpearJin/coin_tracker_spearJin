import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { isDarkAtom } from '../atoms';

function ToggleBtn() {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);

  const toggleHanlder = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <Container>
      <Label isDark={isDark}>
        <Input onInput={toggleHanlder} />
        <Span>{isDark ? '🌙' : '🌞'}</Span>
      </Label>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 50px;
  height: 25px;
  margin-left: 10px;
`;

const Label = styled.label<{ isDark: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${(props) => (props.isDark ? '#444E56' : '#E1D3D5')};
  border-radius: 20px;
  transition: all 250ms ease-in;
  cursor: pointer;
`;

const Input = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  :checked ~ Span {
    transform: translate(100%, -50%);
  }
`;

const Span = styled.span`
  position: absolute;
  top: 50%;
  left: 0;
  border-radius: 50%;
  font-size: 20px;
  transform: translateY(-50%);
  transition: all 300ms ease-in;
`;

export default ToggleBtn;
