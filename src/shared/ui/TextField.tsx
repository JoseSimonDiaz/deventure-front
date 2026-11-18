import { useId, type InputHTMLAttributes, type Ref } from 'react';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  ref?: Ref<HTMLInputElement>;
};

export function TextField({ label, error, ref, className = '', ...inputProps }: TextFieldProps) {
  const inputId = useId();
  const errorId = `${inputId}-error`;
  const hasError = Boolean(error);

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="font-code text-sm font-semibold text-mist uppercase">
        {label}
      </label>
      <input
        id={inputId}
        ref={ref}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
        className={`min-h-12 rounded-xl border-2 bg-fjord-950 px-4 text-base text-frost placeholder:text-mist/60 focus-visible:border-aurora ${hasError ? 'border-ember' : 'border-fjord-600'} ${className}`}
        {...inputProps}
      />
      {hasError && (
        <p id={errorId} role="alert" className="text-sm text-ember">
          {error}
        </p>
      )}
    </div>
  );
}
