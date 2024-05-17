'use server'

import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '../db'
import WatchList from '../models/watchlist.model'
import { CreateWatchListParams, UpdateWatchListParams } from '@/types'

export const handleError = (error: unknown) => {
    console.error(error);
    throw new Error(typeof error === 'string' ? error : JSON.stringify(error));
}



// Create a new watchlist
export async function createWatchList(watchList: CreateWatchListParams) {
  try {
    await connectToDatabase()
    const existingWatchList = await WatchList.findOne({ WatchListname: watchList.WatchListname, clerkId: watchList.clerkId })
   
    // Check if watchlist already exists
    if (existingWatchList) {
    return JSON.parse(JSON.stringify(409))
    }
   
    // Create watchlist if it doesn't exist
    const newWatchList = await WatchList.create(watchList)
    return JSON.parse(JSON.stringify(newWatchList))

  } catch (error) {

    console.log(error)
    return JSON.parse(JSON.stringify(500))
  }
}




// Get all watchlists
export async function getWatchListById(clerkId: string) {
    try {

      await connectToDatabase()
      const watchList = await WatchList.find({ clerkId })
      
      // Check if watchlist exists
      if (!watchList || watchList.length === 0) {
        return JSON.parse(JSON.stringify(404))
      }

      // Return watchlist
      return JSON.parse(JSON.stringify(watchList))

    } catch (error) {
    
    // Handle error
      console.log(error)
      return JSON.parse(JSON.stringify(500))
    }

}
 

// Get watchlist by name and ID
export async function getWatchListByNameAndId(watchListName: string, clerkId: string) {
  try {
    await connectToDatabase()
    const watchList = await WatchList.findOne({ WatchListname: watchListName, clerkId })
  
    // Check if watchlist exists
    if (!watchList)
      return JSON.parse(JSON.stringify(404))

    // Return watchlist
    return JSON.parse(JSON.stringify(watchList))
  } catch (error) {

    // Handle error
    return JSON.parse(JSON.stringify(500))
   
  }
}


// Update watchlist by name and ID
export async function updateWatchListbyNameandID(watchListName: string, clerkId: string, watchList: UpdateWatchListParams) {
  try {
    await connectToDatabase()
    const updatedWatchList = await WatchList.findOneAndUpdate({ WatchListname: watchListName, clerkId }, watchList, { new: true })


    // Check if watchlist is updated
    if (!updatedWatchList) 
      return JSON.parse(JSON.stringify(404))


    // Return updated watchlist
    return JSON.parse(JSON.stringify(updatedWatchList))
  } catch (error) {


    // Handle error
    return JSON.parse(JSON.stringify(500))
  }
}






  export async function deleteWatchList(clerkId: string) {
    try {
      await connectToDatabase()
  
      // Find watchList to delete
      const watchListToDelete = await WatchList.findOne({ clerkId })
  
      if (!watchListToDelete) {
        throw new Error('WatchList not found')
      }
  
      // Delete watchList
      const deletedWatchList = await WatchList.findByIdAndDelete(watchListToDelete._id)
      revalidatePath('/')
  
      return deletedWatchList ? JSON.parse(JSON.stringify(deletedWatchList)) : null
    } catch (error) {
      handleError(error)
    }
  }


