import { create } from 'zustand';

// フォーム全体で使うデータの型
// どの画面でも同じ形で扱えるように決めておく
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

// Zustandストアで使う「状態」と「更新用の関数」の型
interface Store {
  formData: FormState;
  jobCount: number | null; // nullのときは「???」表示になる
  setFormData: (key: keyof FormState, value: any) => void;
  setJobCount: (count: number | null) => void;
}

// 初期状態（最初に表示するときの空データ）
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

// useFormStoreを呼ぶと、どの画面でも同じ状態を共有できる
// setFormDataは「1つの項目だけ更新する」ためのヘルパー
export const useFormStore = create<Store>((set) => ({
  formData: initialFormState,
  jobCount: 5482, // 最初に見せる求人数
  setFormData: (key, value) =>
    // 既存のformDataをコピーして、指定したキーだけ上書きする
    set((state) => ({ formData: { ...state.formData, [key]: value } })),
  setJobCount: (count) => set({ jobCount: count }),
}));
