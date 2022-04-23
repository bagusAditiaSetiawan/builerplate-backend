const app = require("./app");
const {db} = require("./config/db");

const connectToDB = async () => {
    try{
        await db.authenticate();
        console.log("Database connected");
    }catch(error){
        console.log(`Database not connection ${error}`);
    }
}

const start = async () => {
    await connectToDB();
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => console.log(`Running in http://localhost:${PORT}`));
}

start();

