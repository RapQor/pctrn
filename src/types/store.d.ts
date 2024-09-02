export interface IStoreStates {
    user: IUser;
    isLogin: boolean;
   //  posts: IPost[];
 }
 
 export interface IStoreActions {
    setUser: (user: IUser) => void;
    clearUser: () => void;
   //  addPost: (post: IPost) => void;
   //  removePost: (id: string) => void;
 }
 
 export interface IUser {
    profile?: IProfile;
    username: string;
    email: string;
    fullName: string;
    token?: string;
 }
 
 export interface IProfile {
    avatar: string;
    banner: string;
    bio: string;
 }

//  export interface IPost {
//     id: string;
//     avatar: string;
//     username: string;
//     time: string;
//     content: string;
//     likes: number;
//     replies: number;
//  }
 
 
 export type TStore = IStoreStates & IStoreActions;