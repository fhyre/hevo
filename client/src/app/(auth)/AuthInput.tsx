import { ChangeEvent } from 'react';

type AuthInputProps = {
  type: 'email' | 'password' | 'text';
  placeholder: string;
  onChange: (value: string) => void;
};

export function AuthInput({ type, placeholder, onChange }: AuthInputProps) {
  return (
    <input
      className="mt-1 w-full rounded-md border-2 border-solid border-neutral-300 p-2"
      type={type}
      placeholder={placeholder}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
    />
  );
}
