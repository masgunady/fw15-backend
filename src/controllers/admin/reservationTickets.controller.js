const errorHandler = require("../../helpers/errorHandler.helper")
const reservationTicketsModel = require("../../models/reservationTickets.model")

exports.getAllReservationTickets = async(request, response)=>{
    try{
        const data = await reservationTicketsModel.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy,
        )
        return response.json({
            success: true,
            message:"list of all reservation tickets",
            results:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.getOneReservationTicket = async(request, response)=>{
    try{
        const data = await reservationTicketsModel.findOne(request.params.id)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message:"Detail reservation ticket",
            results:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.createReservationTicket = async(request, response) => {
    try{
        const data = {
            ...request.body
        }
        const profile = await  reservationTicketsModel.insert(data)
        return response.json({
            success: true,
            message: "Create reservation ticket successfully",
            results: profile
        })
    }catch(err){
        return errorHandler(response, err)
    }
}  

exports.updateReservationTicket = async(request, response) => {
    try{
        const data = {
            ...request.body
        }
        const user = await reservationTicketsModel.update(request.params.id, data)
        if(!user){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Update reservation ticket successfully",
            response: user
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.deleteReservationTicket = async(request, response)=>{
    try {
        const data = await reservationTicketsModel.destroy(request.params.id)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Delete reservation ticket successfully",
            results:data
        })
    } catch (err) {
        return errorHandler(response,err)
    }
}
