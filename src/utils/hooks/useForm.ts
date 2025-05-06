import { useState } from 'react';

interface FormState<T> {
  data: T;
  error: string | null;
  loading: boolean;
  success: boolean;
}

interface FormAction<T> {
  reset: () => void;
  submit: (data: T) => Promise<void>;
}

export function useForm<T>(
  onSubmit: (data: T) => Promise<void>,
  initialState: T
): [FormState<T>, FormAction<T>] {
  const [state, setState] = useState<FormState<T>>({
    data: initialState,
    error: null,
    loading: false,
    success: false,
  });

  const submit = async (data: T) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      await onSubmit(data);
      setState((prev) => ({ ...prev, success: true, loading: false }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : 'An error occurred',
        loading: false,
      }));
    }
  };

  const reset = () => {
    setState({
      data: initialState,
      error: null,
      loading: false,
      success: false,
    });
  };

  return [state, { submit, reset }];
}
