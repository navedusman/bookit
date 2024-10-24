import Room from "../backend/models/room"
import mongoose from "mongoose"
import { rooms } from "./data"


const seedRooms = async () =>{
    try {
        await mongoose.connect("mongodb://0.0.0.0:27017/bookit")

        await Room.deleteMany()
        console.log("Rooms are Deleted")
        
        await Room.insertMany(rooms)
        console.log("Rooms are Added")
        process.exit()
        
    } catch (error) {
        console.log(error)
        process.exit()
    }
}

seedRooms();