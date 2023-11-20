export const INITIAL_POMODORO = { title: 'Default', learnTime: { minutes: 0, seconds: 20 }, breakTime: { minutes: 0, seconds: 20 } }

export const INITIAL_POMODOROS = [
  INITIAL_POMODORO,
]

export enum PLAY_STATUS {
  대기 = "대기",
  진행 = "진행",
  멈춤 = "멈춤",
}
