import { create } from 'zustand';

export interface FormState {
  licenses: string[];
  seekingStatus: 'passive' | 'active' | '';
  workStyle: string;
  timing: string;
  salary: string;
  status: string;
  conditions: string[];
  zipCode: string;
  birthYear: string;
  name: string;
  phone: string;
}

interface Store {
  formData: FormState;
  jobCount: number | null; // null represents "???" state
  setFormData: (key: keyof FormState, value: any) => void;
  setJobCount: (count: number | null) => void;
}

const initialFormState: FormState = {
  licenses: [],
  seekingStatus: '',
  workStyle: '',
  timing: '',
  salary: '',
  status: '',
  conditions: [],
  zipCode: '',
  birthYear: '',
  name: '',
  phone: '',
};

export const useFormStore = create<Store>((set) => ({
  formData: initialFormState,
  jobCount: 5482, // Initial count
  setFormData: (key, value) =>
    set((state) => ({ formData: { ...state.formData, [key]: value } })),
  setJobCount: (count) => set({ jobCount: count }),
}));
