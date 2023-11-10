import { Time } from "@/types"

export const convertTimeToString = ({ minutes, seconds }: Time) => {
  return `${convert(minutes)}:${convert(seconds)}`
}

const convert = (time: number) => {
  return time < 10 ? `0${time}` : `${time}`;
}

export const showTimeTmpl = (time?: number) => {
  if (!time) {
    return '00';
  }
  return time < 10 ? `0${time}` : String(time);
}

export const calcTime = (time: Time) => {
  return time.minutes * 60 + time.seconds
}
