exports.getAllUsers = (request, response) => {
    const data = [
        {
            name: "GunadiPS",
            phone: "09890324709",
        },
        {
            name: "pratama",
            phone: "test",
        },
    ]

    return response.json({
        success: true,
        message: "List of All Users",
        result: data,
    })
}

exports.createUser = (request, response) => {
    return response.json({
        success: true,
        message: `Create user ${request.body.fullName} successfully`,
    })
}

exports.updateUser = (request, response) => {
    return response.json({
        success: true,
        message: `Update user ${request.params.id} successfully`,
    })
}

exports.deleteUser = (request, response)=>{
    return response.json({
        success: true,
        message: `Delete user ${request.params.id} successfully`
    })
}
