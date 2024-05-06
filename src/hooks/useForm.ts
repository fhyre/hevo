import { useState } from 'react';

type FormData = {
  [key: string]: string;
};

export function useForm<T extends FormData>(initialFormData: T) {
  const [formData, setFormData] = useState<T>(initialFormData);
  const [errorData, setErrorData] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateData = () => {
    const tempErrorData: Record<string, string> = {};

    for (const field in formData) {
      if (!formData[field]) {
        tempErrorData[field] = 'This field is required';
      } else if (field === 'email') {
        const result = new RegExp(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        ).test(formData[field]);
        if (!result) tempErrorData[field] = 'Invalid email address';
      } else if (field === 'password') {
        const result = formData[field].length >= 8;
        if (!result)
          tempErrorData[field] = 'Password must have at least 8 characters';
      } else if (field === 'confirmPassword') {
        const result = formData['password'] === formData['confirmPassword'];
        if (!result) tempErrorData[field] = 'Passwords do not match';
      }
    }

    setErrorData(tempErrorData as T);

    for (const field in tempErrorData) {
      if (tempErrorData[field]) {
        return false;
      }
    }

    return true;
  };

  return { formData, errorData, handleChange, validateData };
}
