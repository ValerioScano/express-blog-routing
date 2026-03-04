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

    console.log(req.body)
    const NewId = postsList.length + 1

    const newItem = {
        id: NewId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags,
    }
    console.log(newItem)
    postsList.push(newItem)
    console.log(postsList)
    res.status(201).send("La risorsa è stata correttamente creata")
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


function update(req, res) {

    const selectedItem = postsList.find(item => item.id == req.params.id);

    selectedItem.title = req.body.title,
        selectedItem.content = req.body.content,
        selectedItem.image = req.body.image,
        selectedItem.tags = req.body.tags,

        console.log(selectedItem)
    console.log(postsList)
    res.status(200).send("La risorsa è stata correttamente modificata")
}

const funzioniController = {
    index,
    show,
    store,
    destroy,
    update,
}

module.exports = funzioniController