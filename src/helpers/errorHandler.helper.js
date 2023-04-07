const errorHandler = (response, error) => {
    if(error.code === "23505"){
        return response.status(409).json({
            success: false,
            message: "Email has been registered!",
        })
    }

    
    console.log(error)
    return response.status(500).json({
        success: false,
        message: "Error: Internal server error!",
    })
}

module.exports = errorHandler
