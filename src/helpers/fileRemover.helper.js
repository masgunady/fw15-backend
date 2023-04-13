const fs = require("fs")
const fileRemover = (file) => {
    if(file){
        const fileName = `uploads/${file.filename}`
        fs.unlink(fileName, (err)=>{
            if(err){
                throw Error(err.message)
            }
        })
    }
}

module.exports = fileRemover
