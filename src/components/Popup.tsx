import React from "react";
import styled from "@emotion/styled";

interface Props {
  children: React.ReactNode;
  visible: boolean;
  onclose: () => void;
}
export default function Popup({ children, visible, onclose }: Props) {
  const handleClose = () => {
    onclose()
  }

  if (!visible) {
    return null
  }
  return (
    <Container>
     <Body>
      <h1>{"test"}</h1>
      <button onClick={handleClose}>Close X</button>
      {children}
     </Body>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
`;

const Body = styled.div`
  position: absolute;
  left: 30%;
  right: 30%;
  bottom: 30%;
  top: 30%;
  text-align: center;
  margin: auto;
  border-radius: 15px;
  border-color: black;
  background: white;
  box-shadow: rgba(0,0,0,0.35) 0px 5px 15px;
`;