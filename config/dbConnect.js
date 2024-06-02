const mongoose = require("mongoose");

const username = encodeURIComponent(process.env.DB_USERNAME);
const password = encodeURIComponent(process.env.DB_PASSWORD);

const dbConnect = async () => {
    try {
        const uri = `mongodb+srv://${username}:${password}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}`;
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log("Database error", error);
    }
}

module.exports = dbConnect;
