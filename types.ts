export type Task = {
  id: number;
  text: string;
  done: boolean;
  startTime: Date;
  endTime: Date;
}

export type Time = {
  minutes: number;
  seconds: number;
}
