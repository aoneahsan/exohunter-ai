/**
 * Advertising Store
 * Zustand store for managing advertising state
 *
 * @author Ahsan Mahmood
 * @email aoneahsan@gmail.com
 * @website aoneahsan.com
 */

import { create } from 'zustand';
import type {
  Advertisement,
  AdvertisementWithState,
  DisplayLocation,
  AdSliderConfig,
} from '@/types/advertising';
import { DEFAULT_AD_CONFIG } from '@/types/advertising';

interface AdvertisingState {
  // Ads data
  allAds: Advertisement[];
  pageSliderAds: AdvertisementWithState[];
  modalSliderAds: AdvertisementWithState[];
  oneTimeModalAds: AdvertisementWithState[];

  // Loading states
  isLoading: boolean;
  isLoadingPageSlider: boolean;
  isLoadingModalSlider: boolean;

  // Error state
  error: string | null;

  // Modal states
  isUpdatePromoModalOpen: boolean;
  isOneTimeModalOpen: boolean;
  currentOneTimeModalAd: Advertisement | null;

  // Slider states
  currentSliderIndex: number;
  sliderConfig: AdSliderConfig;

  // Dismissed ads (local cache)
  dismissedAdIds: Set<string>;

  // Seen promos (local cache)
  seenPromoIds: Set<string>;

  // Last fetched timestamp
  lastFetchedAt: number | null;

  // Actions
  setAllAds: (ads: Advertisement[]) => void;
  setPageSliderAds: (ads: AdvertisementWithState[]) => void;
  setModalSliderAds: (ads: AdvertisementWithState[]) => void;
  setOneTimeModalAds: (ads: AdvertisementWithState[]) => void;

  setLoading: (isLoading: boolean) => void;
  setLoadingPageSlider: (isLoading: boolean) => void;
  setLoadingModalSlider: (isLoading: boolean) => void;
  setError: (error: string | null) => void;

  openUpdatePromoModal: () => void;
  closeUpdatePromoModal: () => void;
  openOneTimeModal: (ad: Advertisement) => void;
  closeOneTimeModal: () => void;

  setCurrentSliderIndex: (index: number) => void;
  nextSlide: (maxIndex: number) => void;
  prevSlide: (maxIndex: number) => void;
  setSliderConfig: (config: Partial<AdSliderConfig>) => void;

  addDismissedAd: (adId: string) => void;
  removeDismissedAd: (adId: string) => void;
  isDismissed: (adId: string) => boolean;

  addSeenPromo: (adId: string) => void;
  hasSeen: (adId: string) => boolean;

  setLastFetchedAt: (timestamp: number) => void;
  shouldRefetch: () => boolean;

  reset: () => void;
}

const initialState = {
  allAds: [],
  pageSliderAds: [],
  modalSliderAds: [],
  oneTimeModalAds: [],
  isLoading: false,
  isLoadingPageSlider: false,
  isLoadingModalSlider: false,
  error: null,
  isUpdatePromoModalOpen: false,
  isOneTimeModalOpen: false,
  currentOneTimeModalAd: null,
  currentSliderIndex: 0,
  sliderConfig: {
    autoPlay: true,
    autoPlayInterval: DEFAULT_AD_CONFIG.autoPlayInterval,
    showDots: true,
    showArrows: true,
    loop: true,
    pauseOnHover: true,
  },
  dismissedAdIds: new Set<string>(),
  seenPromoIds: new Set<string>(),
  lastFetchedAt: null,
};

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

export const useAdvertisingStore = create<AdvertisingState>((set, get) => ({
  ...initialState,

  // Setters for ads
  setAllAds: (ads) => set({ allAds: ads }),
  setPageSliderAds: (ads) => set({ pageSliderAds: ads }),
  setModalSliderAds: (ads) => set({ modalSliderAds: ads }),
  setOneTimeModalAds: (ads) => set({ oneTimeModalAds: ads }),

  // Loading states
  setLoading: (isLoading) => set({ isLoading }),
  setLoadingPageSlider: (isLoading) => set({ isLoadingPageSlider: isLoading }),
  setLoadingModalSlider: (isLoading) => set({ isLoadingModalSlider: isLoading }),
  setError: (error) => set({ error }),

  // Modal actions
  openUpdatePromoModal: () => set({ isUpdatePromoModalOpen: true }),
  closeUpdatePromoModal: () => set({ isUpdatePromoModalOpen: false }),
  openOneTimeModal: (ad) =>
    set({
      isOneTimeModalOpen: true,
      currentOneTimeModalAd: ad,
    }),
  closeOneTimeModal: () =>
    set({
      isOneTimeModalOpen: false,
      currentOneTimeModalAd: null,
    }),

  // Slider actions
  setCurrentSliderIndex: (index) => set({ currentSliderIndex: index }),
  nextSlide: (maxIndex) =>
    set((state) => ({
      currentSliderIndex:
        state.sliderConfig.loop
          ? (state.currentSliderIndex + 1) % (maxIndex + 1)
          : Math.min(state.currentSliderIndex + 1, maxIndex),
    })),
  prevSlide: (maxIndex) =>
    set((state) => ({
      currentSliderIndex:
        state.sliderConfig.loop
          ? state.currentSliderIndex === 0
            ? maxIndex
            : state.currentSliderIndex - 1
          : Math.max(state.currentSliderIndex - 1, 0),
    })),
  setSliderConfig: (config) =>
    set((state) => ({
      sliderConfig: { ...state.sliderConfig, ...config },
    })),

  // Dismissal actions
  addDismissedAd: (adId) =>
    set((state) => {
      const newSet = new Set(state.dismissedAdIds);
      newSet.add(adId);
      return { dismissedAdIds: newSet };
    }),
  removeDismissedAd: (adId) =>
    set((state) => {
      const newSet = new Set(state.dismissedAdIds);
      newSet.delete(adId);
      return { dismissedAdIds: newSet };
    }),
  isDismissed: (adId) => get().dismissedAdIds.has(adId),

  // Seen promo actions
  addSeenPromo: (adId) =>
    set((state) => {
      const newSet = new Set(state.seenPromoIds);
      newSet.add(adId);
      return { seenPromoIds: newSet };
    }),
  hasSeen: (adId) => get().seenPromoIds.has(adId),

  // Cache management
  setLastFetchedAt: (timestamp) => set({ lastFetchedAt: timestamp }),
  shouldRefetch: () => {
    const { lastFetchedAt } = get();
    if (!lastFetchedAt) return true;
    return Date.now() - lastFetchedAt > CACHE_DURATION;
  },

  // Reset store
  reset: () => set(initialState),
}));

export default useAdvertisingStore;
