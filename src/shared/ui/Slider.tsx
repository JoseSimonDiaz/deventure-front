import { useId, type ChangeEvent } from 'react';

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
};

export function Slider({ label, value, min, max, onChange }: SliderProps) {
  const sliderId = useId();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label htmlFor={sliderId} className="font-code text-sm font-semibold text-mist uppercase">
          {label}
        </label>
        <output htmlFor={sliderId} className="font-code text-sm text-rune-gold">
          {value}
        </output>
      </div>
      <input
        id={sliderId}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className="h-11 w-full cursor-pointer accent-rune-gold"
      />
    </div>
  );
}
