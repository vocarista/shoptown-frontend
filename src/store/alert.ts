import { create } from 'zustand';

interface Error {
    alert: string;
    showAlert: Boolean;
}

interface SetError {
    setAlert: (newError: string) => void;
    setShowAlert: (newShowError: Boolean) => void;
}

const useAlert = create<Error & SetError>((set) => ({
    alert: 'Error encountered, Please try again later.',
    setAlert: (newAlert) => set((state: any) => ({ ... state, alert: newAlert })),
    showAlert: false,
    setShowAlert: (newShowAlert) => set((state: any) => ({ ... state, showAlert: newShowAlert })),
}));

export default useAlert;