export interface usersData{
    firstName:string;
    lastName: string;
    email:string;
    password:string;
    role:string;
    isLogged:boolean;
    id:number;
}

export interface sessionData{
    email:string;
    role:string;
    userId:number
}