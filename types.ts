export type Task = {
  id: number;
  text: string;
  done: boolean;
  learnTime?: Time;
  breakTime?: Time;
  startTime: Date;
  endTime: Date;
}

export type Time = {
  minutes: number;
  seconds: number;
}
