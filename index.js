const app = require("./app");
const connectDatabase = require("./config/db");

//connect database
connectDatabase();

app.listen(4000, () => {
  console.log(`server is running at  http://localhost:${4000}`);
});
