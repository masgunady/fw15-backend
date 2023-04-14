const errorHandler = require("../../helpers/errorHandler.helper")
const reservationSectionsModel = require("../../models/reservationSections.model")

exports.getAllReservationSections = async(request, response)=>{
    try{
        const data = await reservationSectionsModel.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy,
        )
        return response.json({
            success: true,
            message:"list of all reservation sections",
            result:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.getOneReservationSection = async(request, response)=>{
    try{
        const data = await reservationSectionsModel.findOne(request.params.id)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message:"Detail reservation section",
            result:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.createReservationSection = async(request, response) => {
    try{
        const data = {
            ...request.body
        }
        const profile = await  reservationSectionsModel.insert(data)
        return response.json({
            success: true,
            message: "Create reservation section successfully",
            result: profile
        })
    }catch(err){
        return errorHandler(response, err)
    }
}  

exports.updateReservationSection = async(request, response) => {
    try{
        const data = {
            ...request.body
        }
        const user = await reservationSectionsModel.update(request.params.id, data)
        if(!user){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Update reservation section successfully",
            response: user
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.deleteReservationSection = async(request, response)=>{
    try {
        const data = await reservationSectionsModel.destroy(request.params.id)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Delete reservation section successfully",
            result:data
        })
    } catch (err) {
        return errorHandler(response,err)
    }
}
