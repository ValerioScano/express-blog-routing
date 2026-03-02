const postsList = require("../public/blog-assets/immagini_e_post/posts")

let workAroundPostsList = postsList

function index(req, res) {
    if (req.query.tag) {
        workAroundPostsList = postsList.filter(post => post.tags.includes(req.query.tag));
    }
    res.json(workAroundPostsList)
}

function show(req, res) {
    const selectedPost = postsList.find(post => post.id == Number(req.params.id))
    if (!selectedPost) {
        return res.status(404).json({ errore: "Not Found", message: "Post non trovato" })
    }
    res.json(selectedPost)
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
    const selectedPost = postsList.find(post => post.id == Number(req.params.id))
    const selectedPostID = postsList.indexOf(selectedPost)
    if (!selectedPost) {
        return res.status(404).json({ errore: "Not Found", message: "Post non trovato" })
    }
    postsList.splice(selectedPostID, 1)
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