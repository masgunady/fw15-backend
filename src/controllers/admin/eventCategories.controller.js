const errorHandler = require("../../helpers/errorHandler.helper")
const eventCategoriesModel = require("../../models/eventCategories.model")

exports.getAllEventCategories = async(request, response)=>{
    try{
        const data = await eventCategoriesModel.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy,
        )
        return response.json({
            success: true,
            message:"list of all event categories",
            result:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.getOneEventCategory = async(request, response)=>{
    try{
        const data = await eventCategoriesModel.findOne(request.params.id)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message:"Detail event category",
            result:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.createEventCategory = async(request, response) => {
    try{
        const data = {
            ...request.body
        }
        const profile = await  eventCategoriesModel.insert(data)
        return response.json({
            success: true,
            message: "Create event category successfully",
            result: profile
        })
    }catch(err){
        return errorHandler(response, err)
    }
}  

exports.updateEventCategory = async(request, response) => {
    try{
        const data = {
            ...request.body
        }
        const user = await eventCategoriesModel.update(request.params.id, data)
        if(!user){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Update event category successfully",
            response: user
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.deleteEventCategory = async(request, response)=>{
    try {
        const data = await eventCategoriesModel.destroy(request.params.id)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Delete event category successfully",
            result:data
        })
    } catch (err) {
        return errorHandler(response,err)
    }
}
