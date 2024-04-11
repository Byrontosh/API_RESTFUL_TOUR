const tourModel = {


    async getAllToursModel() {
        const peticion = await fetch("http://localhost:4000/tours")
        const tours = await peticion.json()
        console.log(tours);
        return tours
    },



    async getTourByIdModel(tourId) {
        const response = await fetch(`http://localhost:4000/tours/${tourId}`);
        if (!response.ok) {
            return {error:"Tour no encontrado"}
        }
        const data = await response.json()
        return data
    },
    


    async createTourModel (newTour) {
        const url = "http://localhost:4000/tours"
        const peticion = await fetch(url,{
            method:'POST',
            body:JSON.stringify(newTour),
            headers:{'Content-Type':'application/json'}
        })
        const data = await peticion.json()
        return data
    },


    async updateTour (tourId, updatedTour) {

        const url = `http://localhost:4000/tours/${tourId}`
        const response = await fetch(url)
        if (!response.ok) {
            return {error:"Tour no encontrado"}
        }
        else{
            const peticion = await fetch(url,{
                method:'PUT',
                body:JSON.stringify(updatedTour),
                headers:{'Content-Type':'application/json'}
            })
            const data = await peticion.json()
            return data
        }
    },

    async deleteTour (tourId) {
        const url = `http://localhost:4000/tours/${tourId}`
        const response = await fetch(url)
        if (!response.ok) {
            return {error:"Tour no encontrado"}
        }
        else{
            const peticion = await fetch(url,{
                method:'DELETE',
            })
            await peticion.json()
            return {msg:"Tour eliminado correctamente"}
        }
    }
}

export default tourModel

