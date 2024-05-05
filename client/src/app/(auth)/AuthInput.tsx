import { ChangeEvent } from 'react';

type AuthInputProps = {
  type: 'email' | 'password' | 'text';
  name: 'email' | 'password' | 'firstName' | 'lastName';
  error: string | null | undefined;
  placeholder: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
};

export function AuthInput({
  type,
  name,
  error,
  placeholder,
  onChange,
}: AuthInputProps) {
  return (
    <>
      <input
        className={`mt-1 w-full rounded-md border-2 border-solid ${error ? 'border-red-500' : 'border-neutral-300'} p-2`}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </>
  );
}
