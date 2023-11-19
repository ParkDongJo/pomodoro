import { useState } from "react";

const useNotification = () => {
  const [notification, setNotification] = useState<Notification | undefined>(undefined)
	const [audio, setAudio] = useState<HTMLAudioElement | undefined>(undefined)

  const startNoti = () => {
    const interval = setInterval(() => {
      try {
        const sound = new Audio("https://s.zigbang.com/public/audio/bell.mp3")
        sound.loop = true
        sound.play()
        const noti = new Notification(`직방`, {
          body: `[즉시중개라이브] 문의가 들어왔습니다`,
          tag: "즉시중개라이브",
          lang: "ko",
          requireInteraction: true,
          renotify: true,
          icon: "../static/image/ic_zigbang_live_logo.png",
          badge: "../static/image/ic_zigbang_live_logo.png",
        })
        setAudio(sound)
        setNotification(noti);
      } catch (error) {
        console.warn(error)
      }
    }, 3000);
    return interval;
  }
}
export default useNotification;
