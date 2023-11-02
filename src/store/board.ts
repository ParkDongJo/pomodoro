import { create } from 'zustand';

export enum STATUS {
  진행중 = '진행중',
  휴식중 = '휴식중',
  대기중 = '대기중',
}

interface Store {
  status: STATUS;
  updateStatus: (status: STATUS) => void;
}
const useStore = create<Store>((set) => ({
  status: STATUS.대기중,
  updateStatus: (status) => set(() => ({ status })),
}))
export default useStore;
