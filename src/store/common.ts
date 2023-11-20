import { create } from 'zustand';
import { PLAY_STATUS } from '@/src/constant';

interface Store {
  playStatus: PLAY_STATUS;
  isRinging: boolean;
  changePlayStatus: (status: PLAY_STATUS) => void;
  turnOnRing: () => void;
  turnOffRing: () => void;
}
const useStore = create<Store>((set) => ({
  playStatus: PLAY_STATUS.멈춤,
  isRinging: false,
  changePlayStatus: (status: PLAY_STATUS) => set(() => ({ playStatus: status })),
  turnOnRing: () => set(() => ({ isRinging: true })),
  turnOffRing: () => set(() => ({ isRinging: false })),
}))
export default useStore;
