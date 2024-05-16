// ====== USER PARAMS
export type CreateUserParams = {
    clerkId: string
    firstName: string|null
    lastName: string|null
    username: string
    email: string
    photo: string
  }
  
  export type UpdateUserParams = {
    firstName: string|null
    lastName: string|null
    username: string
    photo: string
  }
  
  // ====== EVENT PARAMS
  export type CreateEventParams = {
    userId: string
    event: {
      title: string
      description: string
      location: string
      imageUrl: string
      startDateTime: Date
      endDateTime: Date
      categoryId: string
      price: string
      isFree: boolean
      url: string
    }
    path: string
  }
  
  export interface CreateWatchListParams {
    WatchListname: string;
    Companyname: string[];
    clerkId: string;
  }
  
  export interface UpdateWatchListParams {
    WatchListname?: string;
    Companyname?: string[];
    clerkId?: string;
  }