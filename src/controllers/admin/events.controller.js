const errorHandler = require("../../helpers/errorHandler.helper")
const eventsModel = require("../../models/events.model")
const fileRemover = require("../../helpers/fileRemover.helper")
const fs = require("fs")

exports.getAllEvents = async(request, response)=>{
    try{
        const data = await eventsModel.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy,
        )
        return response.json({
            success: true,
            message:"list of all events",
            result:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.getOneEvent = async(request, response)=>{
    try{
        const data = await eventsModel.findOne(request.params.id)

        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message:"Detail event",
            result:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.createEvent = async(request, response) => {
    try{
        const data = {
            ...request.body
        }
        if(request.file){
            data.picture = request.file.filename
        }
        const profile = await  eventsModel.insert(data)
        return response.json({
            success: true,
            message: "Create event successfully",
            result: profile
        })
    }catch(err){
        fileRemover(request.file)
        return errorHandler(response, err)
    }
}


exports.updateEvent = async(request, response) => {
    try{

        const data = {
            ...request.body
        }
        if(request.file){
            const oldPict = await eventsModel.findPict(request.params.id)
            const fileName = `uploads/${oldPict.picture}`
            if(fileName){
                fs.unlink(fileName, (response,err)=>{
                    if(err){
                        return errorHandler(response, err)
                    }
                })
            }
            data.picture = request.file.filename
        }




        const user = await eventsModel.update(request.params.id, data)
        if(!user){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Update event successfully",
            response: user
        })
        
        
    }catch(err){
        fileRemover(request.file)
        return errorHandler(response, err)
    }

}

exports.deleteEvent = async(request, response)=>{
  
    try {
        const oldPict = await eventsModel.findPict(request.params.id)
        const fileName = `uploads/${oldPict.picture}`
        if(fileName){
            fs.unlink(fileName, (response,err)=>{
                if(err){
                    return errorHandler(response, err)
                }
            })
        }
        const data = await eventsModel.destroy(request.params.id)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Delete event successfully",
            result:data
        })
    } catch (err) {
        return errorHandler(response,err)
    }

    
}
