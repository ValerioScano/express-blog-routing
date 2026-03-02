const express = require('express')
const app = express()
const port = 3000
const postsRouter = require("./routers/apiCallForPosts")


app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Benvenuto nei Post!")
})

app.use("/posts", postsRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})