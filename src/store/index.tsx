import { createContext, useState } from "react";
import { IUser, TStore } from "../types/store";

interface StoreProps {
   children: React.ReactNode;
}

export const Store = createContext<TStore | null>(null);

export const StoreProvider: React.FC<StoreProps> = ({ children }) => {
   const [user, setUserState] = useState<IUser>({
      email: "",
      fullName: "",
      username: "",
      token: "",
   });
   const [isLogin, setIsLogin] = useState(false);
   // const [posts, setPosts] = useState<IPost[]>([]);

   const setUser = (user: IUser) => {
      setUserState(user);
      setIsLogin(true);
   };

   const clearUser = () => {
      setUserState({
         email: "",
         fullName: "",
         username: "",
         token: "",
      });
      setIsLogin(false);
   };

   // const addPost = (post: IPost) => {
   //    setPosts(prevPosts => [...prevPosts, post]);
   // };

   // const removePost = (id: string) => {
   //    setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
   // };

   console.log(user, isLogin);

   return (
      <Store.Provider
         value={{
            user,
            isLogin,
            setUser,
            clearUser,
         }}
      >
         {children}
      </Store.Provider>
   );
};
