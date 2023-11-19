import { useState, useRef } from "react";
let audioUrl = require('../static/mp3/bell.mp3');

const useNotification = () => {
  const [notification, setNotification] = useState<Notification | undefined>(undefined)
	const [audio, setAudio] = useState<HTMLAudioElement | undefined>(undefined)

  const startAlarm = () => {
    try {
      const sound = new Audio(audioUrl)
      sound.loop = true
      sound.play()
      const noti = new Notification(`직방`, {
        body: `업무 시간이 끝났습니다.`,
        tag: "포모도로",
        lang: "ko",
        requireInteraction: true,
        renotify: true,
      })
      setAudio(sound)
      setNotification(noti);
    } catch (error) {
      console.warn(error)
    }
  }

  const stopAlarm = () => {
    notification?.close()
		audio?.pause()
		setNotification(undefined)
		setAudio(undefined)
	}

  return {
    startAlarm,
    stopAlarm,
  }
}
export default useNotification;
