const {body,param,query, validationResult} = require("express-validator")
const fileRemover = require("../helpers/fileRemover.helper")

// const errorHandler = require("../helpers/errorHandler.helper")

const validParameter = param("id").toInt().isDecimal().withMessage("Parameter ID Invalid!").isInt({min: 1}).withMessage("No data ID found!")
const validQueryPage = query("page").isInt().withMessage("Parameter Page must be int format!")
const validQueryLimit = query("limit").isInt().withMessage("Parameter Limit must be int format!")
const validQuerySort = query("sort").escape().trim().isString().withMessage("Parameter Sort must be string format!")
const validQuerySortBy = query("sortBy").toUpperCase().isIn(["ASC","DESC"]).withMessage("Query Parameter SortBy must be ASC or DESC format!")
const requireEmail = body("email").normalizeEmail().isEmail().withMessage("Please insert your valid email!")
const requirePassword = body("password").exists({checkFalsy:true, checkNull:true}).withMessage("Please insert your password!")
const requireConfirmPassword = body("confirmPassword").exists({checkFalsy:true, checkNull:true}).withMessage("Please insert confirm password!")
    .custom((value, {req}) =>  value === req.body.password).withMessage("The passwords do not match!")
const requireStrongPassword = body("password").isStrongPassword().withMessage("password must be at least 8 characters, with at least 1 letter, with at least 1 number, Include both Upper case and Lower case characters and include the symbols!")
const requireUsername = body("username").isLength({min:2, max:80}).withMessage("Please insert your username!")


const rules = {
    authLogin:[
        requireEmail,  requirePassword
    ],
    authRegister:[
        requireUsername, requireEmail, requirePassword, requireStrongPassword, requireConfirmPassword
    ],
    createUser:[
        requireUsername, requireEmail, requirePassword, requireStrongPassword, requireConfirmPassword
    ],
    updateUser:[
        validParameter ,requireUsername, requireEmail, requirePassword, requireStrongPassword, requireConfirmPassword
    ],
    getAllUsers:[
        validQueryPage, validQueryLimit , validQuerySort ,validQuerySortBy
    ],
    getOne:[
        validParameter
    ],
    delete:[
        validParameter
    ]
}

const validator = (request, response, next) => {
    const errors = validationResult(request)
    try {
        if(!errors.isEmpty()){
            fileRemover(request.file)
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
