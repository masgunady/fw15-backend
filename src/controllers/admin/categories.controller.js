const errorHandler = require("../../helpers/errorHandler.helper")
const categoriesModel = require("../../models/categories.model")
const fileRemover = require("../../helpers/fileRemover.helper")

exports.getAllCategories = async(request, response)=>{
    try{
        const data = await categoriesModel.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy,
        )
        return response.json({
            success: true,
            message:"list of all categories",
            result:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.getOneCategory = async(request, response)=>{
    try{
        const data = await categoriesModel.findOne(request.params.id)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message:"Detail category",
            result:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.createCategory = async(request, response) => {
    try{
        const data = {
            ...request.body
        }
        const profile = await  categoriesModel.insert(data)
        return response.json({
            success: true,
            message: "Create category successfully",
            result: profile
        })
    }catch(err){
        fileRemover(request.file)
        return errorHandler(response, err)
    }
}  

exports.updateCategory = async(request, response) => {
    try{
        const data = {
            ...request.body
        }
        const user = await categoriesModel.update(request.params.id, data)
        if(!user){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Update category successfully",
            response: user
        })
    }catch(err){
        fileRemover(request.file)
        return errorHandler(response, err)
    }
}

exports.deleteCategory = async(request, response)=>{
    try {
        const data = await categoriesModel.destroy(request.params.id)
        if(!data){
            throw Error("data_not_found")
        }
        return response.json({
            success: true,
            message: "Delete category successfully",
            result:data
        })
    } catch (err) {
        return errorHandler(response,err)
    }
}
