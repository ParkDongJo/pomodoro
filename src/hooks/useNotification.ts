import { useState, useRef } from "react";
let audioUrl = require('../static/mp3/bell.mp3');
let alarmUrl = require('../static/image/alarm.png');
import useStore from '@/src/store/common';

const useNotification = () => {
  const notificationRef = useRef<Notification | undefined>(undefined)
  const audioRef = useRef<HTMLAudioElement | undefined>(undefined)
  const store = useStore()

  const startAlarm = () => {
    try {
      if (audioRef.current) {
        return
      }
      const sound = new Audio(audioUrl)
      sound.loop = true
      sound.play()
      const noti = new Notification(`직방`, {
        body: `업무 시간이 끝났습니다.`,
        tag: "포모도로",
        lang: "ko",
        requireInteraction: true,
        renotify: true,
        icon: alarmUrl,
				badge: alarmUrl,
      })
      audioRef.current = sound
      notificationRef.current = noti
      store.turnOnRing()
    } catch (error) {
      console.warn(error)
    }
  }

  const stopAlarm = () => {
    notificationRef.current?.close()
		audioRef.current?.pause()
		notificationRef.current = undefined
		audioRef.current = undefined
    store.turnOffRing()
	}

  const ringAlarm = (milliseconds: number = 1000) => {
    startAlarm()
    setTimeout(() => {
      stopAlarm()
    }, milliseconds)
  }

  return {
    ringAlarm,
  }
}
export default useNotification;
