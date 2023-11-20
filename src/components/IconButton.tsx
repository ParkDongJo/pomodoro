"use client";
import MuiButton from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloseIcon from '@mui/icons-material/Close';

export enum ICON {
  CLOSE = "CLOSE",
  ADD_CIRCLE_OUTLINE = "ADD_CIRCLE_OUTLINE",
  ACCESS_TIME = "ACCESS_TIME",
}

interface Props {
  icon: ICON
  onClick?: () => void;
}
export default function IconButton(props: Props) {
  const { icon, onClick } = props;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick?.();
  }

  const renderIcon = () => {
    return {
      [ICON.CLOSE]: <CloseIcon />,
      [ICON.ADD_CIRCLE_OUTLINE]: <AddCircleOutlineIcon />,
      [ICON.ACCESS_TIME]: <AccessTimeIcon />,
    }[icon]
  }

  return (<MuiButton onClick={handleClick}>{renderIcon()}</MuiButton>)
}
