import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useLikeStore = create(
  persist(
    (set) => ({
      likedPosts: {},
      setLikedPost: (postId, isLiked) =>
        set((state) => ({
          likedPosts: {
            ...state.likedPosts,
            [postId]: isLiked,
          },
        })),
      clearLikes: () => set({ likedPosts: {} }),
    }),
    {
      name: 'likes-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useLikeStore;
