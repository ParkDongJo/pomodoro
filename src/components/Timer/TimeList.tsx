"use client";
import { useState } from 'react';
import styled from "@emotion/styled";
import { Time } from '@/types';

interface Props {
  datas: { title: string, learnTime: Time, breakTime: Time }[]
  onClick: (learnTime: Time, breakTime: Time) => void
}
export default function TimeList({ datas, onClick }: Props) {
  return (
    <Container>
      {datas.map((pomo, index) => (
        <span
          key={`${pomo.title}-${index}`} 
          onClick={() => {
            onClick(pomo.learnTime, pomo.breakTime)
          }}>
            {pomo.title}
        </span>
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
