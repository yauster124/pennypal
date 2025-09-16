import { create } from "zustand";

type AccountStore = {
    selectedIds: string[]
    initialize: (ids: (string | number)[]) => void
    toggle: (id: string | number) => void
    isSelected: (id: string | number) => boolean
    clear: () => void
};

export const useAccountStore = create<AccountStore>((set, get) => ({
    selectedIds: [],

    initialize: (ids) =>
        set({ selectedIds: ids.map((i) => String(i)) }),

    toggle: (id) => {
        const idStr = String(id)
        const { selectedIds } = get()

        const newSelected = selectedIds.includes(idStr)
            ? selectedIds.filter((i) => i !== idStr)
            : [...selectedIds, idStr]

        set({ selectedIds: newSelected })
    },

    isSelected: (id) => get().selectedIds.includes(String(id)),

    clear: () => set({ selectedIds: [] }),
}));
