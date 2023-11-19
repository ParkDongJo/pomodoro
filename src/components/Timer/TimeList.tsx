"use client";
import { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import styled from "@emotion/styled";
import { Time } from '@/types';

interface Props {
  datas: { title: string, learnTime: Time, breakTime: Time }[]
  onClick: (learnTime: Time, breakTime: Time) => void
}
export default function TimeList({ datas, onClick }: Props) {
  return (
    <>
      <ButtonGroup variant="contained">
      {datas.map((pomo, index) => (
        <Button
          key={`${pomo.title}-${index}`} 
          onClick={() => {
            onClick(pomo.learnTime, pomo.breakTime)
          }}>
            {pomo.title}
        </Button>
      ))}
      </ButtonGroup>
    </>
  )
}
