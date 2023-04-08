const errorHandler = (response, err) => {
    if(err?.code === "23505"|| err?.message?.includes("duplicate key")){
        return response.status(409).json({
            success: false,
            message: "Email has already been taken!",
        })
    }

    if(err?.code === "22P02"){                   //No Params ID
        return response.status(409).json({
            success: false,
            message: "Parameter ID not found!",
        })
    }

    if(err === undefined){
        return response.status(404).json({
            success: false,
            message:"User ID not found",
        })
    }
    
    console.log(err)
    return response.status(500).json({
        success: false,
        message: "Error: Internal server error!",
    })
}

module.exports = errorHandler 
