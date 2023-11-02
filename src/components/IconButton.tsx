"use client";

interface Props {
  title: string;
  onClick?: () => void;
}
export default function IconButton(props: Props) {
  const { title, onClick } = props;
  return (<button onClick={onClick}>{title}</button>)
}
