import { create } from "zustand";

interface EditModalStore {
  isOpen?: boolean;
  onOpen: () => void;
  onClose: () => void;
}

//tạo 1 hook để control login modal
const useEditModal = create<EditModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditModal;
