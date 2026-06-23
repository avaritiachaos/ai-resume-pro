import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  addCredits: (amount: number) => void;
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

  // Reset all user state (for logout)
  resetUserState: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
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
      addCredits: (amount) =>
        set((state) => ({ credits: state.credits + amount })),
      // FIX: Atomic check-and-decrement to prevent TOCTOU race condition
      useCredit: () => {
        const current = get().credits;
        if (current <= 0) return false;
        set({ credits: current - 1 });
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

      // FIX: Full state reset on logout to prevent cross-session data leak
      resetUserState: () =>
        set({
          resumeText: "",
          sections: [],
          credits: 1,
          isAuthenticated: false,
          isUploadOpen: false,
          isPaywallOpen: false,
        }),
    }),
    {
      name: "ai-resume-storage",
      partialize: (state) => ({
        credits: state.credits,
        isAuthenticated: state.isAuthenticated,
        resumeText: state.resumeText,
      }),
    }
  )
);
