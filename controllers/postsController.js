const postsList = require("../public/blog-assets/immagini_e_post/posts")

let workAroundPostsList = postsList

function index(req, res) {
    res.json(postsList)
}

function show(req, res) {
    res.json(postsList[req.params.id])
}

function store(req, res) {
    res.send("Creato nuovo post")
}

function destroy(req, res) {
    // opzione A
    // console.log("Eliminazione del post " + req.params.id)
    // console.log(postsList)
    // postsList.splice(req.params.id - 1, 1)
    // console.log(postsList)

    // opzione B

    toBeDeletedPizza = postsList.find(pizza => pizza.id == Number(req.params.id))
    toBeDeletedPizzaID = postsList.indexOf(toBeDeletedPizza)
    postsList.splice(toBeDeletedPizzaID, 1)
    console.log(postsList)
    res.sendStatus(204)
}

const funzioniController = {
    index,
    show,
    store,
    destroy,
}

module.exports = funzioniController