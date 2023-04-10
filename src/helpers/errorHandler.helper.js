const errorHandler = (response, err) => {
    if(err?.code === "23505"|| err?.message?.includes("duplicate key")){
        return response.status(409).json({
            success: false,
            message: "Email has already been taken!",
        })
    }
    // console.log(err)

    if(err?.code === "22P02"){                   //No Params ID
        console.log(err)
        return response.status(422).json({
            success: false,
            message: "Invalid Parameter!",
        })
    }

    if(err === undefined){
        return response.status(404).json({
            success: false,
            message:"User ID not found",
        })
    }

    if(err?.message?.includes("data_not_found")){
        return response.status(404).json({
            success: false,
            message:"Data ID not found",
        })
    }

    if(err?.message?.includes("input_data_fullName_null")){
        return response.status(400).json({
            success: false,
            message:"Input data fullname cannot be empty",
        })
    }
    if(err?.message?.includes("input_data_email_null")){
        return response.status(400).json({
            success: false,
            message:"Input data email cannot be empty",
        })
    }
    console.log(err)
    if(err?.message?.includes("input_format_email_not_valid")){
        return response.status(400).json({
            success: false,
            message:"Input data email format invalid",
        })
    }
    if(err?.message?.includes("input_data_password_null")){
        return response.status(400).json({
            success: false,
            message:"Input data password cannot be empty",
        })
    }
    
    console.log(err)
    return response.status(500).json({
        success: false,
        message: "Error: Internal server error!",
    })
}

module.exports = errorHandler 
