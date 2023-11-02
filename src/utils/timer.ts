import { Time } from "@/types"

export const convertTimeToString = ({ minutes, seconds }: Time) => {
  return `${convert(minutes)}:${convert(seconds)}`
}

const convert = (time: number) => {
  return time < 10 ? `0${time}` : `${time}`
}
