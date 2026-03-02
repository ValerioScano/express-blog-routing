const postsList = require("../public/blog-assets/immagini_e_post/posts")

let workAroundPostsList = postsList

function index(req, res) {
    if (req.query.tag) {
        workAroundPostsList = postsList.filter(post => post.tags.includes(req.query.tag));
    }
    res.json(workAroundPostsList)
}

function show(req, res) {
    selectedPizza = postsList.find(pizza => pizza.id == Number(req.params.id))
    res.json(selectedPizza)
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
    selectedPizza = postsList.find(pizza => pizza.id == Number(req.params.id))
    seletedPizzaID = postsList.indexOf(selectedPizza)
    postsList.splice(selectedPizzaID, 1)
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