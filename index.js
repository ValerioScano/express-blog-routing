const express = require('express')
const app = express()
const port = 3000
const postsRouter = require("./routers/apiCallForPosts");
const notFound = require('./middlewares/notFound');
const errorHandler = require("./middlewares/errorHandler")

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Benvenuto nei Post!")
})

app.use("/posts", postsRouter)

app.use(notFound)
app.use(errorHandler)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})