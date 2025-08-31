import { create } from "zustand";

type EditPopupProps = {
  isEditOpen: boolean;
  idEditTz: number | null;
  changeIdEditTz: (id: number) => void;
  onEditOpenChange: () => void;
};

type DetailPopupProps = {
  isDetailOpen: boolean;
  idDetailTz: number | null;
  changeIdDetailTz: (id: number) => void;
  onDetailOpenChange: () => void;
};

type AddPopupProps = {
  isAddOpen: boolean;
  onAddOpenChange: () => void;
};

export const useEditPopup = create<EditPopupProps>((set) => ({
  isEditOpen: false,
  idEditTz: null,
  changeIdEditTz: (id: number) => {
    set(() => ({
      idEditTz: id,
    }));
  },
  onEditOpenChange: () =>
    set((state) => ({
      isEditOpen: !state.isEditOpen,
    })),
}));

export const useDetailPopup = create<DetailPopupProps>((set) => ({
  isDetailOpen: false,
  idDetailTz: null,
  changeIdDetailTz: (id: number) => {
    set(() => ({
      idDetailTz: id,
    }));
  },
  onDetailOpenChange: () =>
    set((state) => ({
      isDetailOpen: !state.isDetailOpen,
    })),
}));

export const useAddPopup = create<AddPopupProps>((set) => ({
  isAddOpen: false,
  onAddOpenChange: () =>
    set((state) => ({
      isAddOpen: !state.isAddOpen,
    })),
}));
