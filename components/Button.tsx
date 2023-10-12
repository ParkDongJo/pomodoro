"use client";
import styles from "../styles/button.module.css"

interface Props {
  onClick: () => void;
}
export default function Button(props: Props) {
  const { onClick } = props;

  const handleClick = () => {
    onClick();
  }

  return (
    <button className={styles.button_a} onClick={handleClick}>버튼</button>
  )
}
