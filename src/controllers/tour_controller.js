import tourModel from "../models/tours.js"
import { v4 as uuidv4 }  from 'uuid'
import { v2 as cloudinary } from 'cloudinary'
import fs from "fs-extra";


const getAllTours = async (req, res) => {
    try {
        const tours = await tourModel.getAllToursModel()   
        res.status(200).json(tours)
    } catch (error) {
        res.json(error)
    }
}

const getTourByID = async (req, res) => {
    const {id} = req.params
    try {
        const tour = await tourModel.getTourByIdModel(id)
        const status = tour.error ? 404 : 200
        res.status(status).json(tour)
    } catch (error) {
        res.status(500).json(error)
    }
}


const createTour = async(req, res)=> {
    const newTourData = {
        id:uuidv4(),
        ...req.body,
    }
    try {
        const cloudinaryResponse = await cloudinary.uploader.upload(req.files.imagen.tempFilePath,{folder:'tours'})
        newTourData.imagen = cloudinaryResponse.secure_url
        newTourData.public_id =cloudinaryResponse.public_id
        const tour = await tourModel.createTourModel(newTourData)
        await fs.unlink(req.files.imagen.tempFilePath)
        res.status(201).json(tour)
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
}

const updateTour = async(req, res)=> {
    const {id} = req.params
    try {
        const tour = await tourModel.updateTour(id,req.body)
        const status = tour.error ? 404 : 200
        res.status(status).json(tour)
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteTour = async(req, res)=> {
    const {id} = req.params
    try {
        const tourFind = await tourModel.getTourByIdModel(id)
        cloudinary.uploader.destroy(tourFind.public_id)
        const tour = await tourModel.deleteTour(id)
        const status = tour.error ? 404 : 200
        res.status(status).json(tour)
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
}






export{
    getAllTours,
    getTourByID,
    createTour,
    updateTour,
    deleteTour
}
