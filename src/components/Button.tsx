"use client";
import MuiButton from '@mui/material/Button';

interface Props {
  isShow?: boolean;
  size: "small" | "medium" | "large";
  disabled?: boolean;
  title: string;
  onClick: () => void;
}

export default function Button(props: Props) {
  const { isShow = true, size = "large", disabled, title, onClick } = props;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick();
  }

  if (!isShow) {
    return null
  }
  return (
    <MuiButton size={size} variant="contained" disabled={disabled} onClick={handleClick}>{title}</MuiButton>
  )
}
