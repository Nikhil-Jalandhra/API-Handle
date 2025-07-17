import { create } from "zustand";

const usePaginationStore = create((set) => ({
    pageUser: "",
    currentPage: 1,
    totalPage: 1,
    setPage: (page) => set({currentPage: page}),
    setPageUser: (user) => set({pageUser: user}),
    endPage: (total) => set({totalPage: total}),
}));

export default usePaginationStore;