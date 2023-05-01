const errorHandler = require("../helpers/errorHandler.helper")
const wishlistsModel = require("../models/wishlists.model")
const eventsModel = require("../models/events.model")



exports.getWishlist = async (request, response) => {
    try {
        const {id} = request.user
        const wishlist = await wishlistsModel.findOneByUserId(id)

        if(!wishlist){
            throw Error("data_not_found")
        }

        return response.json({
            success: true,
            message: "list our wishlist",
            results: wishlist
        })

    } catch (err) {
        return errorHandler(response, err)
    }
}

exports.manageWishlist = async (request, response) => {
    try {
        const {id} = request.user
        const data = {
            ...request.body,
            userId: id
        }
        const eventId = data.eventId
        const checkEvent = await eventsModel.findOne(eventId)
        console.log(checkEvent)
        if(!checkEvent){
            throw Error("data_not_found")
        }

        const checkDuplicate = await wishlistsModel.findOneByUserIdAndEventId(id, eventId)
        if(checkDuplicate){
            const deleteWishlist = await wishlistsModel.DeleteByUserIdAndEventId(id, eventId)
            return response.json({
                success: true,
                message: "remove wishlist success",
                results: deleteWishlist
            })
        }


        const wishlist = await wishlistsModel.insert(data)
        if(!wishlist){
            throw Error("create_wishlist_failed")
        }

        return response.json({
            success: true,
            message: "add wishlist success",
            results: wishlist
        })
      
    } catch (err) {
        return errorHandler(response, err)
    }

}
