// const errorHandler = require("../helpers/errorHandler.helper")

const errorHandler = require("../helpers/errorHandler.helper")
const reservationsModel = require("../models/reservations.model")
const reservationSectionsModel = require("../models/reservationSections.model")
const eventsModel = require("../models/events.model")
const reservationTicketsModel = require("../models/reservationTickets.model")


exports.createReservation = async (request, response) => {
    try {
        const {id} = request.user
        if(!id){
            throw Error("unauthorized")
        }
        const reservationStatus = 2
        const paymentMethod = null

        const data = {
            ...request.body,
            userId: id,
            statusId: reservationStatus,
            paymentMethodId: paymentMethod
        }

        if(data.eventId){
            const checkEvent = await eventsModel.findOne(data.eventId)
            if(!checkEvent){
                throw Error("data_not_found")
            }
        }

        const reservation = await reservationsModel.insert(data)
        return response.json({
            success: true,
            message: "Success add reservation",
            results: reservation
        })

    } catch (err) {
        return errorHandler(response, err)
    }
}

exports.pickTicket = async (request, response) => {
    try {
        const {id} = request.user
        if(!id){
            throw Error("unauthorized")
        }

        const data = {
            ...request.body
        }
        const reservation = await reservationsModel.findByIdAndUserId(data.reservationId, id)
        if(!reservation){
            throw Error("reservation_not_found")
        }

        const section = await reservationSectionsModel.findOne(data.sectionId)
        if(!section){
            throw Error("section_not_found")
        }

        const ticket = await reservationTicketsModel.insert(data)
        return response.json({
            success: true,
            message: "add ticket successfully",
            results: ticket
        })

    } catch (err) {
        return errorHandler(response, err)
    }
}


