"use client";
import { useState } from "react"
import styled from "@emotion/styled";
import MuiAlert from '@mui/material/Alert';
import { blueGrey } from '@mui/material/colors';
import IconButton, { ICON } from "@/src/components/IconButton";
import useStore from "@/src/store/common";

interface Props {
  isShow?: boolean;
  severity: "success" | "info" | "warning" | "error";
  title: string;
}
export default function Alert(props: Props) {
  const { isShow = true, severity, title } = props;
  const store = useStore();

  const handleClose = () => {
    store.turnOffRing()
  }

  if (!store.isRinging) {
    return null
  }
  return (
    <Container>
      <MuiAlert
        severity={severity}
        action={<IconButton icon={ICON.CLOSE} onClick={handleClose} />}
        sx={{ width: '100%', maxWidth: 600, backgroundColor: blueGrey }}>
        {title}
      </MuiAlert>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  display: flex;
  justify-content: center;
  item-align: center;
`;

