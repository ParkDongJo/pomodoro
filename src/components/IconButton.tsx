"use client";

interface Props {
  onClick?: () => void;
}
export default function IconButton(props: Props) {
  const { onClick } = props;
  return (<button onClick={onClick} >아이콘버튼</button>)
}
