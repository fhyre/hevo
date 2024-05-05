import { FormEvent, useState } from 'react';

type FormData = {
  [key: string]: string;
};

export function useForm<T extends FormData>(initialFormData: T) {
  const [formData, setFormData] = useState<T>(initialFormData);
  const [errorData, setErrorData] = useState<T>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateData = () => {
    const tempErrorData = initialFormData as FormData;

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
      }
    }

    setErrorData(tempErrorData as T);

    for (const field in errorData) {
      if (tempErrorData[field]) {
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateData()) return;
  };

  return { errorData, handleChange, handleSubmit };
}