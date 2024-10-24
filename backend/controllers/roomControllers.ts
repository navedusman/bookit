import { NextRequest, NextResponse } from "next/server";
import Room, { IRoom } from "../models/room";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import APIFilters from "../utils/apiFilters";


// Get All Rooms  => /api/rooms
export const allRooms = catchAsyncErrors(async(req: NextRequest) => {
    const resPerPage: number = 8;
    //const rooms = await Room.find()

    const { searchParams } = new URL(req.url)
    //console.log(searchParams)
   
    const queryStr : any = {}

    searchParams.forEach((value, key)=>{
        queryStr[key]= value;
    })

    const roomCount: number = await Room.countDocuments();

    //console.log(queryStr)
    const apiFilters = new APIFilters(Room , queryStr).search().filter()

    let rooms: IRoom[] = await apiFilters.query
    const filteredRoomCount: number = rooms.length

    apiFilters.pagination(resPerPage);
    rooms = await apiFilters.query.clone();


    return NextResponse.json({
        success:true,
        roomCount,
        filteredRoomCount,
        resPerPage,
        rooms,
    }) 

})
// Create Room  => /api/rooms
export const newRoom = catchAsyncErrors(async(req: NextRequest) => {
    const body = await req.json()

    const room = await Room.create(body)

    return NextResponse.json({
        success:true,
        room,
    }) 

})
// Get Room Details => /api/rooms/:id
export const getRoomDetails = catchAsyncErrors(async(
    req: NextRequest,
    { params } : { params : {id: string}}
) => {
    
    const room = await Room.findById(params.id)
    if(!room){
        throw new ErrorHandler('Room Not Found' , 404)
    }

    return NextResponse.json({
        success:true,
        room,
    }) 

})

// update Room Details => /api/rooms/:id
export const updateRoom = catchAsyncErrors(async(
    req: NextRequest,
    { params } : { params : {id: string}}
) => {
    
    let room = await Room.findById(params.id)
    const body = await req.json()
    if(!room){
        throw new ErrorHandler('Room Not Found' , 404)
    }

    room = await Room.findByIdAndUpdate(params.id, body, {new: true})

    return NextResponse.json({
        success:true,
        room,
    }) 

})

// delete Room Details => /api/rooms/:id
export const deleteRoom = catchAsyncErrors(async(
    req: NextRequest,
    { params } : { params : {id: string}}
) => {
    
    const room = await Room.findById(params.id)
   
    if(!room){
        throw new ErrorHandler('Room Not Found' , 404)
    }

    // TODO - DELETE IMAGES ASSCOCIATED WITH THE ROOM
    await Room.deleteOne()

    return NextResponse.json({
        success:true,        
    }) 

})

