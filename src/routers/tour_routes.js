import {Router} from 'express'
import { createTour, deleteTour, getAllTours, getTourByID, updateTour } from '../controllers/tour_controller.js'
import { verifyToken } from '../middlewares/auth.js'



const router = Router()


router.get('/tours',getAllTours)
router.get('/tours/:id',getTourByID)
router.post('/tours',verifyToken,createTour)
router.put('/tours/:id',verifyToken,updateTour)
router.delete('/tours/:id',verifyToken,deleteTour)


export default router