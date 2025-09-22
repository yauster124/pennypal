import { create } from "zustand"

type SearchFiltersStore = {
    searchQuery?: string
    startDate?: Date
    endDate?: Date
    categoryIds?: string[]
    setSearchQuery: (searchQuery?: string) => void
    setStartDate: (date?: Date) => void
    setEndDate: (date?: Date) => void
    addCategoryId: (categoryId: string) => void
    removeCategoryId: (categoryId: string) => void
}

export const useSearchFiltersStore = create<SearchFiltersStore>((set, get) => ({
    setSearchQuery: (searchQuery) => set({ searchQuery: searchQuery }),
    setStartDate: (date) => set({ startDate: date }),
    setEndDate: (date) => set({ endDate: date }),

    addCategoryId: (categoryId) => {
        const { categoryIds } = get()
        if (!categoryIds) {
            set({ categoryIds: [categoryId] })
        } else if (!categoryIds.includes(categoryId)) {
            set({ categoryIds: [...categoryIds, categoryId] })
        }
    },

    removeCategoryId: (categoryId) => {
        const { categoryIds } = get()
        if (!categoryIds) return
        const updated = categoryIds.filter((id) => id !== categoryId)
        set({ categoryIds: updated.length > 0 ? updated : undefined })
    },
}))