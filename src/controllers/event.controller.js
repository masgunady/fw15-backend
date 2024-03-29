const errorHandler = require("../helpers/errorHandler.helper")
const eventsModel = require("../models/events.model")
const citiesModel = require("../models/cities.model")
const categoriesModel = require("../models/categories.model")
const moment = require("moment")
const eventCategoriesModel = require("../models/eventCategories.model")
const fbaseAdmin = require("../helpers/firebase")

const deviceTokenModel = require("../models/deviceToken.model")
const fileRemover = require("../helpers/fileRemover.helper")

// const fs = require("fs")
const cloudinary = require("cloudinary").v2
// const { CloudinaryStorage } = require("multer-storage-cloudinary")
cloudinary.config({
    cloud_name: "dxs0yxeyr",
    api_key: "236157336681252",
    api_secret: "V2uHsegpJtBpFlUl3WSwkxdCL0I"
})

exports.getEvent = async (request, response) => {
    try {
        const {searchName,searchCategory, searchLocation, page, limit, sort, sortBy} = request.query
        const data = await eventsModel.findEvent(searchName, searchCategory, searchLocation, page, limit, sort, sortBy)
        const countEvent = await eventsModel.countEvent(searchName, searchCategory, searchLocation)
        
        const totalPage = Math.ceil(parseInt(countEvent.totalData)/parseInt(limit))
                
        return response.json({
            success: true,
            message: "list of event",
            results: data,
            totalPage: totalPage
        })

    } catch (err) {
        return errorHandler(response, err)
    }
}

exports.getDetailEvent = async (request, response) => {
    try {
        const data = await eventsModel.findDetailEvent(request.params.id)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "detail event",
            results: data
        })
    } catch (err) {
        return errorHandler(response, err)
    }
}

exports.getDetailOurEvent = async (request, response) => {
    try {
        const {id} = request.user
        const data = await eventsModel.findDetailOurEvent(request.params.id, id)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "detail event",
            results: data
        })
    } catch (err) {
        return errorHandler(response, err)
    }
}

exports.getOurEventCreate = async (request, response) => {
    try {
        const {id} = request.user
        if(!id){
            throw Error("unauthorized")
        }
        const {page, limit, sort, sortBy} = request.query
        const eventOurCreate = await eventsModel.findEventByUserCreated(id, page, limit, sort, sortBy)
        const countOurEvent = await eventsModel.countOurEvent(id)
        const totalPage = Math.ceil(parseInt(countOurEvent.totalData)/parseInt(limit))
        
        
        if(!eventOurCreate){
            throw Error("data_not_found")
        }

        return response.json({
            success: true,
            message: "list event by you",
            results: eventOurCreate,
            totalPage: totalPage
        })
    } catch (err) {
        return errorHandler(response, err)
    }
}

exports.createOurEvent = async (request, response) => {
    try {
        const {id} = request.user
        if(!id){
            throw Error("unauthorized")
        }

        const data = {
            ...request.body,
            createdBy: id
        }

        if(data.cityId){
            const checkCity = await citiesModel.findOne(data.cityId)
            if(!checkCity){
                throw Error("data_not_found")
            }
        }

        if(data.categoryId){
            const checkCategory = await categoriesModel.findOne(data.categoryId)
            if(!checkCategory){
                throw Error("data_not_found")
            }
        }

        if(request.file){
            // data.picture = request.file.filename
            data.picture = request.file.path
            
        }
        // return console.log(request.file)
        const event = await eventsModel.insert(data)
        const eventCategoriesData = {
            eventId: event.id,
            categoryId: data.categoryId
        }
        await eventCategoriesModel.insert(eventCategoriesData)

        const listDeviceToken = await deviceTokenModel.findAll(1, 1000)
        // console.log(listDeviceToken)
        const eventName = request.body.title.toUpperCase()
        const dateEvent = moment(request.body.date).format("LLLL")
        const message = listDeviceToken.map(item => ({
            token: item.token,
            notification: {
                title: "There is new event!",
                body: `${eventName} will be held at ${dateEvent}, check it out!`
            }
        }))

        const messaging = fbaseAdmin.messaging()
        messaging.sendEach(message)

        return response.json({
            success: true,
            message: "Create event successfully",
            results: event
        })
    } catch (err) {
        fileRemover(request.file)
        return errorHandler(response, err)
    }
}

exports.updateOurEvent = async (request, response) => {
    try {
        const {id} = request.user
        if(!id){
            throw Error("unauthorized")
        }

        const checkEvent = await eventsModel.findOne(request.params.id)

        if(!checkEvent){
            throw Error("data_not_found")
        }

        if(id !== checkEvent.createdBy){
            throw Error("data_event_not_created_by_you")
        }

        const data = {
            ...request.body,
            createdBy: id
        }

      
        if(data.cityId){
            const checkCity = await citiesModel.findOne(data.cityId)
            if(!checkCity){
                throw Error("data_not_found")
            }
        }

        if(data.categoryId){
            const checkCategory = await categoriesModel.findOne(data.categoryId)
            if(!checkCategory){
                throw Error("data_not_found")
            }
        }

        if(request.file){
            // const fileName = `uploads/${checkEvent.picture}`
            // if(fileName){
            //     fs.unlink(fileName, (response, err) => {
            //         if(err){
            //             return errorHandler(response, err)
            //         }
            //     })
            // }
            if(checkEvent.picture){
                fileRemover({filename: checkEvent.picture})
            }
            // data.picture = request.file.filename
            data.picture = request.file.path
        }

        const event = await eventsModel.update(request.params.id, data)

        const eventCategoriesData = {
            categoryId: data.categoryId
        }
  
        await eventCategoriesModel.updateByEventId(event.id, eventCategoriesData)

        return response.json({
            success: true,
            message: "Update event successfully",
            results: event
        })

    } catch (err) {
        
        fileRemover(request.file)
        return errorHandler(response, err)
    }
}

exports.deleteEvent = async (request, response) => {
    try {
        const {id} = request.user
        if(!id){
            throw Error("unauthorized")
        }
        const findUser = await eventsModel.findOne(request.params.id)
        if(!findUser){
            throw Error("data_not_found")
        }

        if(id !== findUser.createdBy){
            throw Error("data_event_not_created_by_you")
        }
        

        const filePict = findUser.picture
        const urlArray = filePict.split("/")
        const directoryOne = urlArray[urlArray.length-3]
        const directoryTwo = urlArray[urlArray.length-2]
        const fileNamed = urlArray[urlArray.length-1].split(".")[0]
        const id_image = `${directoryOne.toString()}/${directoryTwo.toString()}/${fileNamed.toString()}`
        console.log(id_image)
        
        await cloudinary.uploader.destroy(id_image, (error, results) => {
            console.log(error, results)
        })
        


        // const fileName = `uploads/${findUser.picture}`
        // if(fileName){
        //     fs.unlink(fileName, (response, err) => {
        //         if(err){
        //             return errorHandler(response, err)
        //         }
        //     })
        // }
        const data = await eventsModel.destroy(request.params.id)
        if(!data){
            throw Error("data_not_found")
        }
        await eventCategoriesModel.deleteByEventId(findUser.id)
        return response.json({
            success: true,
            message: "Delete event successfully",
            results:data
        })
    } catch (err) {
        return errorHandler(response, err)
    }
}
