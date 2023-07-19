const errorHandler = require("../helpers/errorHandler.helper")
const reservationsModel = require("../models/reservations.model")

exports.getHistory = async (request, response) => {
    try {
        const {id} = request.user
        if(!id){
            throw Error("unauthorized")
        }
        const {page, limit, sort, sortBy} = request.query
        const history = await reservationsModel.findHistoryByUserId(id, page, limit, sort, sortBy)
        if(!history){
            throw Error("data_not_found")
        }

        const countOurHistory = await reservationsModel.countOurHistory(id)
        const totalPage = Math.ceil(parseInt(countOurHistory.totalData)/parseInt(limit))

        return response.json({
            success: true,
            message: "list of your history",
            results: history,
            totalPage: totalPage
        })
    } catch (err) {
        return errorHandler(response, err)
    }
}

exports.getDetailHistory = async (request, response) => {
    try {
        const {id} = request.user
        if(!id){
            throw Error("unauthorized")
        }
        const userId = id
        const reservationId = request.params.id

        const detailHistory = await reservationsModel.findHistoryByIdAndUserId(reservationId, userId)
        if(!detailHistory){
            throw Error("data_not_found")
        }

        return response.json({
            success: true,
            message: "detai reservation",
            results: detailHistory
        })

    } catch (err) {
        return errorHandler(response, err)
    }
}
