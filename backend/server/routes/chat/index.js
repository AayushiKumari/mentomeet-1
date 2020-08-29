import express from 'express'
const chatRouter = express.Router();

chatRouter.get("/", (req, res) => {
  console.log("chatrouter / request!")
  res.send({ response: "Server is up and running." }).status(200);
});

export default chatRouter;