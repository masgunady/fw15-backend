const errorHandler = require("../../helpers/errorHandler.helper")
const wishlistsModel = require("../../models/wishlists.model")

exports.getAllWishlists = async(request, response)=>{
    try{
        const data = await wishlistsModel.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy,
        )
        return response.json({
            success: true,
            message:"list of all wishlists",
            result:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.getOneWishlist = async(request, response)=>{
    try{
        const data = await wishlistsModel.findOne(request.params.id)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message:"Detail wishlist",
            result:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.createWishlist = async(request, response) => {
    try{
        const data = {
            ...request.body
        }
        const profile = await  wishlistsModel.insert(data)
        return response.json({
            success: true,
            message: "Create wishlist successfully",
            result: profile
        })
    }catch(err){
        return errorHandler(response, err)
    }
}  

exports.updateWishlist = async(request, response) => {
    try{
        const data = {
            ...request.body
        }
        const user = await wishlistsModel.update(request.params.id, data)
        if(!user){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Update wishlist successfully",
            response: user
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.deleteWishlist = async(request, response)=>{
    try {
        const data = await wishlistsModel.destroy(request.params.id)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Delete wishlist successfully",
            result:data
        })
    } catch (err) {
        return errorHandler(response,err)
    }
}
