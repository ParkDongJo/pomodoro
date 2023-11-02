"use client";

interface Props {
  disabled?: boolean;
  title: string;
  onClick?: () => void;
}
export default function IconButton(props: Props) {
  const { disabled = false, title, onClick } = props;
  return (<button disabled={disabled} onClick={onClick}>{title}</button>)
}
