import 'next-auth'

declare module 'next-auth' {
  export interface User {
    _id : string,
    name : string, 
    email : string,
    profilePic : string,
    isVerified : boolean
      
  }
}


