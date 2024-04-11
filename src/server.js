// Requerir los módulos
import express from 'express'
import morgan from 'morgan'
import cloudinary from 'cloudinary'
import dotenv from 'dotenv'
import fileUpload from "express-fileupload"
import routerTour from './routers/tour_routes.js'
import routerUser from './routers/user_routes.js'

dotenv.config()

// Inicializaciones
const app = express()
app.use(morgan('dev'))
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}))


// Variables
app.set('port',process.env.port || 3000)


// Middlewares 
app.use(express.json())



// Rutas 
app.use('/api',routerTour)
app.use('/api',routerUser)


// Manejo de una ruta que no sea encontrada
app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404"))

// Exportar la instancia de express por medio de app
export default  app