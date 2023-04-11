const errorHandler = (response, err) => {
    if(err?.code === "23505"|| err?.message?.includes("duplicate key")){
        return response.status(409).json({
            success: false,
            message: "Email has already been taken!",
        })
    }
    // console.log(err)

    if(err?.code === "22P02"){                   //No Params ID
        // console.log(err)
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
    if(err?.message?.includes("unauthorized")){
        return response.status(401).json({
            success: false,
            message:"Unauthorized!",
        })
    }
    if(err?.message?.includes("wrong_credentials")){
        return response.status(400).json({
            success: false,
            message:"Wrong Email or Password!",
        })
    }
    // console.log(err)
    if(err?.message?.includes("jwt malformed")){
        return response.status(401).json({
            success: false,
            message:"Invalid Token!",
        })
    }
    if(err?.message?.includes("invalid signature")){
        return response.status(401).json({
            success: false,
            message:"Invalid Token Signature!",
        })
    }

    if(err?.message?.includes("password_unmatch")){
        return response.status(400).json({
            success: false,
            message:"Password and confirm password does not match",
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
    // console.log(err)
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
