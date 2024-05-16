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
    return JSON.parse(JSON.stringify(204))
    }
   
    // Create watchlist if it doesn't exist
    const newWatchList = await WatchList.create(watchList)
    return JSON.parse(JSON.stringify(newWatchList))

  } catch (error) {

    console.log(error)
    return JSON.parse(JSON.stringify(500))
  }
}

export async function getWatchListById(clerkId: string) {
    try {
      await connectToDatabase()
  
      const watchList = await WatchList.findOne({ clerkId })
  
      if (!watchList) throw new Error('WatchList not found')
      return JSON.parse(JSON.stringify(watchList))
    } catch (error) {
      handleError(error)
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
  export async function updateWatchList(clerkId: string, watchList: UpdateWatchListParams) {
    try {
      await connectToDatabase()
  
      const updatedWatchList = await WatchList.findOneAndUpdate({ clerkId }, watchList, { new: true })
  
      if (!updatedWatchList) throw new Error('WatchList update failed')
      return JSON.parse(JSON.stringify(updatedWatchList))
    } catch (error) {
      handleError(error)
    }
  }

export async function getWatchListByNameAndId(watchListName: string, clerkId: string) {
  try {
    await connectToDatabase()

    const watchList = await WatchList.findOne({ WatchListname: watchListName, clerkId })

    if (!watchList) throw new Error('WatchList not found')
    return JSON.parse(JSON.stringify(watchList))
  } catch (error) {
    handleError(error)
  }
}
