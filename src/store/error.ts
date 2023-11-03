import { create } from 'zustand';

interface Error {
    error: string;
    showError: Boolean;
}

interface SetError {
    setError: (newError: string) => void;
    setShowError: (newShowError: Boolean) => void;
}

const useError = create<Error & SetError>((set) => ({
    error: 'Error encountered, Please try again later.',
    setError: (newError) => set((state: any) => ({ ... state, error: newError })),
    showError: false,
    setShowError: (newShowError) => set((state: any) => ({ ... state, showError: newShowError })),
}));

export default useError;