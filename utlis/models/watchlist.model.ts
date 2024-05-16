import { Document, Schema, model, models } from "mongoose";

    const WatchListSchema = new Schema({
        clerkId: { type: String, required: true },
        WatchListname: { type: String, required: true },
        Companyname: [{ type: String, required: true }],
    });
    const WatchList = models.WatchList || model('WatchList', WatchListSchema);
    export default WatchList;