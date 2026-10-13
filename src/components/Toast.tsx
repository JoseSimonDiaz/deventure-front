import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed top-24 inset-x-0 mx-auto w-max max-w-[90vw] px-4 py-2.5 rounded-xl bg-[#2d3546] text-[#dbe2f9] shadow-[0_4px_16px_rgba(0,0,0,0.6)] z-50 flex items-center gap-2.5 border border-[#3b494b] animate-fadeIn">
      <span className="material-symbols-outlined text-[#ffd65b] text-[20px]">info</span>
      <span className="font-['JetBrains_Mono'] text-[12px] font-semibold leading-tight">
        {message}
      </span>
    </div>
  );
};
