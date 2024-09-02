// hooks.ts

import { useContext } from "react";
import { Store } from "./index"; 
// import { IPost } from "../types/store"; 

const useStore = () => {
   const context = useContext(Store);

   if (!context) {
      throw new Error("useStore must be used within a StoreProvider");
   }

   return context;
};

export default useStore;

// export const usePosts = (): IPost[] => {
//    const { posts } = useContext(Store);

//    if (!posts) {
//       throw new Error("usePosts must be used within a StoreProvider");
//    }

//    return posts;
// };