// stores/useLessonProgressStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MarkCompleteResponse } from '../utils/interface';

type LessonProgressStore = {
  completedLessons: Record<string, string[]>;
  updateLessonProgress: (userId: number, courseId: string, variantItemId?: string) => Promise<void>;
  getTotalLessonsCompleted: () => number;
  completedVariantIds: string[];
  clearCompletedLessons: (courseId: string) => void;
};

export const useLessonProgressStore = create<LessonProgressStore>()(
  persist(
    (set, get) => ({
      completedLessons: {},
      completedVariantIds: [],
      updateLessonProgress: async (userId, courseId, variantItemId) => {
        const endpoint = variantItemId ? '/api/mark-completed' : '/api/mark-completed';
        const body = variantItemId
          ? JSON.stringify({ user_id: userId, course_id: courseId, variant_item_id: variantItemId })
          : JSON.stringify({ user_id: userId, course_id: courseId, variant_item_id: '' });

          try {
            const res = await fetch(endpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body,
            });
            if (!res.ok) {
              throw new Error('Failed to fetch');
            }
  
            const data: MarkCompleteResponse = await res.json(); 
            
  
            const completedIds = (data.completed_lessons ?? []).map(
              (lesson: { variant_item_id: string }) => lesson.variant_item_id
            );  
            
            set({completedVariantIds: completedIds})
            set((state) => ({
              completedLessons: {
                ...state.completedLessons,
                [courseId]: completedIds,
              },
            }));
            // console.log('[updateLessonProgress] Updated completedLessons:', get().completedLessons);
          } catch (error) {
            console.error('[updateLessonProgress] Error:', error);
          }
      },
      getTotalLessonsCompleted: () => get().completedVariantIds.length ,
      clearCompletedLessons: (courseId) => {
        const current = get().completedLessons;
        const { [courseId]: _, ...rest } = current;
        set({ completedLessons: rest });
        // console.log('[clearCompletedLessons] Cleared course:', courseId);
      },
    }),
    {
      name: 'lesson-progress-simple', // storage key
      partialize: (state) => ({
        completedLessons: state.completedLessons,
      }),
    }
  )
);
