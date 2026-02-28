import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SearchApiResponse, StayItem, EventItem, AreaItem } from '@/app/types/ItemType';

type FavoriteItem = SearchApiResponse | StayItem | EventItem | AreaItem;

interface FavoriteState {
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (contentid: string) => void;
  isFavorite: (contentid: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (item) =>
        set((state) => ({
          favorites: [...state.favorites, item],
        })),
      removeFavorite: (contentid) =>
        set((state) => ({
          favorites: state.favorites.filter((item) => item.contentid !== contentid),
        })),
      isFavorite: (contentid) => get().favorites.some((item) => item.contentid === contentid),
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: 'favorite-storage',
    }
  )
);
