import { create } from 'zustand';

type ToastState = {
  message: string;
  showToast: (message: string) => void;
  dismissToast: () => void;
};

export const useToastStore = create<ToastState>()((setToast) => ({
  message: '',
  showToast: (message) => {
    setToast({ message });
  },
  dismissToast: () => {
    setToast({ message: '' });
  },
}));
