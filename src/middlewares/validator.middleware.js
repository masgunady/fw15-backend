const {body,param,query, validationResult} = require("express-validator")
// const errorHandler = require("../helpers/errorHandler.helper")

const validParameter = param("id").isInt().withMessage("Parameter Invalid!")
const validQueryPage = query("page").isInt().withMessage("Parameter Page must be int format!")
const requireEmail = body("email").normalizeEmail().isEmail().withMessage("Please insert your valid email!")
const requirePassword = body("password").exists({checkFalsy:true, checkNull:true}).withMessage("Please insert your password!")
const requireConfirmPassword = body("confirmPassword").exists({checkFalsy:true, checkNull:true}).withMessage("Please insert confirm password")
    .custom((value, {req}) =>  value === req.body.password).withMessage("The passwords do not match")
const requireStrongPassword = body("password").isStrongPassword().withMessage("password must be at least 8 characters, with at least 1 letter, with at least 1 number, Include both Upper case and Lower case characters and include the symbols")
const requireFullName = body("fullName").isLength({min:2, max:80}).withMessage("Please insert your full name!")


const rules = {
    authLogin:[
        requireEmail,  requirePassword
    ],
    authRegister:[
        requireFullName, requireEmail, requirePassword, requireStrongPassword, requireConfirmPassword
    ],
    createUser:[
        requireFullName, requireEmail, requirePassword, requireStrongPassword, requireConfirmPassword
    ],
    updateUser:[
        validParameter ,requireFullName, requireEmail, requirePassword, requireStrongPassword, requireConfirmPassword
    ],
    getAllUsers:[
        validQueryPage
    ]
}

const validator = (request, response, next) => {
    const errors = validationResult(request)
    try {
        if(!errors.isEmpty()){
            throw Error("validation_rules")
        }
        return next()
    } catch (err) {
        return response.status(400).json({
            success: false,
            message: "Validation Error",
            result: errors.array()
        })
    }
}

const validate = (selectedRules) => [rules[selectedRules], validator]
module.exports = validate
