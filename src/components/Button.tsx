"use client";
import styled from "@emotion/styled";

interface Props {
  title: string;
  onClick: () => void;
}

export default function Button(props: Props) {
  const { title, onClick } = props;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick();
  }

  return (
    <StyledButton onClick={handleClick}>{title}</StyledButton>
  )
}

const StyledButton = styled.button`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #333;
  cursor: pointer;
  font-size: 1rem;
  margin: 0.5rem;
  padding: 0.5rem 1rem;
`
