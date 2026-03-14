import { create } from 'zustand';

export type ViewType = 'landing' | 'form' | 'success';

export interface FormData {
  // Step 1: Basic Information
  fullName: string;
  yearOfStudy: string;
  fieldMajor: string;
  linkedinProfile: string;
  telegramUsername: string;
  
  // Step 2: Commitment
  confirmStay: string;
  hoursPerWeek: string;
  
  // Step 3: AI/Tech Experience
  aiLevel: string;
  toolsTechnologies: string[];
  hasProjectExperience: string;
  projectDescription: string;
  chatMessages: { role: string; content: string }[];
  
  // Step 4: Interests
  interests: string[];
  
  // Step 5: Team Preferences
  preferredTeammates: string;
  avoidTeammates: string;
  
  // Step 6: Motivation
  whyJoin: string;
  yearGoals: string;
}

interface FormState {
  currentStep: number;
  currentView: ViewType;
  formData: FormData;
  setStep: (step: number) => void;
  setView: (view: ViewType) => void;
  updateFormData: (data: Partial<FormData>) => void;
  resetForm: () => void;
  nextStep: () => void;
  prevStep: () => void;
}

const initialFormData: FormData = {
  fullName: '',
  yearOfStudy: '',
  fieldMajor: '',
  linkedinProfile: '',
  telegramUsername: '',
  confirmStay: '',
  hoursPerWeek: '',
  aiLevel: '',
  toolsTechnologies: [],
  hasProjectExperience: '',
  projectDescription: '',
  chatMessages: [],
  interests: [],
  preferredTeammates: '',
  avoidTeammates: '',
  whyJoin: '',
  yearGoals: '',
};

export const useFormStore = create<FormState>((set) => ({
  currentStep: 1,
  currentView: 'landing',
  formData: initialFormData,
  setStep: (step) => set({ currentStep: step }),
  setView: (view) => set({ currentView: view }),
  updateFormData: (data) => set((state) => ({ 
    formData: { ...state.formData, ...data } 
  })),
  resetForm: () => set({ formData: initialFormData, currentStep: 1, currentView: 'landing' }),
  nextStep: () => set((state) => ({ 
    currentStep: Math.min(state.currentStep + 1, 7) // Now 7 steps
  })),
  prevStep: () => set((state) => ({ 
    currentStep: Math.max(state.currentStep - 1, 1) 
  })),
}));
