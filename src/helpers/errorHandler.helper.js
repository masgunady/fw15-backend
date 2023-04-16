const errorHandler = (response, err) => {
    console.log(err)
    if(err?.message?.includes("users_username_key")){
        return response.status(409).json({
            success: false,
            message: "Username has already been taken!",
        })
    }
    if(err?.message?.includes("users_username_key")){
        return response.status(409).json({
            success: false,
            message: "Username has already been taken!",
        })
    }
    if(err?.message?.includes("duplicate key")){
        return response.status(409).json({
            success: false,
            message: "Error duplicate key!",
        })
    }
    if(err?.message?.includes("no such file or directory")){
        return response.status(409).json({
            success: false,
            message: "no such file or directory!",
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
    if(err?.code === "42703"){                   //No Params ID
        // console.log(err)
        return response.status(422).json({
            success: false,
            message: "Invalid Parameter Sort Field!",
        })
    }
    if(err?.code === "08P01"){                   //No Params ID
        // console.log(err)
        return response.status(422).json({
            success: false,
            message: "Invalid Value in Model",
        })
    }

    if(err === undefined){
        return response.status(404).json({
            success: false,
            message:"User ID not found",
        })
    }

    if(err?.message?.includes("Cannot find module")){
        return response.status(400).json({
            success: false,
            message:"Error definition resource routes!",
        })
    }
    if(err?.message?.includes("validation_rules")){
        return response.status(400).json({
            success: false,
            message:"Validation Error!",
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
            message:"Wrong Username or Email or Password!",
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

    if(err?.message?.includes("this._makeMiddleware is not a function")){
        return response.status(400).json({
            success: false,
            message:"Invalid Middleware declaration",
        })
    }
    if(err?.message?.includes("is_duplicate_data")){
        return response.status(409).json({
            success: false,
            message:"Data is already exist!",
        })
    }
    // if(err?.message?.includes("input_data_email_null")){
    //     return response.status(400).json({
    //         success: false,
    //         message:"Input data email cannot be empty",
    //     })
    // }
    // console.log(err)
    // if(err?.message?.includes("input_format_email_not_valid")){
    //     return response.status(400).json({
    //         success: false,
    //         message:"Input data email format invalid",
    //     })
    // }
    // if(err?.message?.includes("input_data_password_null")){
    //     return response.status(400).json({
    //         success: false,
    //         message:"Input data password cannot be empty",
    //     })
    // }
    // if(err?.message?.includes("input_password_min_length_8")){
    //     return response.status(400).json({
    //         success: false,
    //         message:"Input data password min length 8",
    //     })
    // }
    
    console.log(err)
    return response.status(500).json({
        success: false,
        message: "Error: Internal server error!",
    })
}

module.exports = errorHandler 
