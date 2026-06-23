import { create } from "zustand";

export interface ResumeSection {
  id: string;
  original: string;
  optimized: string;
  isOptimizing: boolean;
}

interface AppState {
  // Resume data
  resumeText: string;
  setResumeText: (text: string) => void;

  sections: ResumeSection[];
  setSections: (sections: ResumeSection[]) => void;
  updateSection: (id: string, updates: Partial<ResumeSection>) => void;

  // Credits
  credits: number;
  setCredits: (credits: number) => void;
  useCredit: () => boolean;

  // UI state
  isUploadOpen: boolean;
  setUploadOpen: (open: boolean) => void;
  isPaywallOpen: boolean;
  setPaywallOpen: (open: boolean) => void;
  isExporting: boolean;
  setExporting: (exporting: boolean) => void;

  // Auth
  isAuthenticated: boolean;
  setAuthenticated: (auth: boolean) => void;
}

export const useStore = create<AppState>((set, get) => ({
  resumeText: "",
  setResumeText: (text) => set({ resumeText: text }),

  sections: [],
  setSections: (sections) => set({ sections }),
  updateSection: (id, updates) =>
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === id ? { ...s, ...updates } : s
      ),
    })),

  credits: 1,
  setCredits: (credits) => set({ credits }),
  useCredit: () => {
    const { credits } = get();
    if (credits <= 0) return false;
    set({ credits: credits - 1 });
    return true;
  },

  isUploadOpen: false,
  setUploadOpen: (open) => set({ isUploadOpen: open }),
  isPaywallOpen: false,
  setPaywallOpen: (open) => set({ isPaywallOpen: open }),
  isExporting: false,
  setExporting: (exporting) => set({ isExporting: exporting }),

  isAuthenticated: false,
  setAuthenticated: (auth) => set({ isAuthenticated: auth }),
}));
