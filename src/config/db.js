const mongoose = require("mongoose")

//let localhost = "mongodb://localhost:27017/mywebsite"
const url =
  "mongodb+srv://admin:admin123@cluster0.j0gm6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

 const db =async () => {
try {
    await mongoose.connect(url)
    console.log("database connect")
    
} catch (error) {
    console.log(error)
}
}

module.exports = db