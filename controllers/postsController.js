const dbConnection = require("../data/db")


function index(req, res) {

    const sql = "SELECT * FROM posts"

    dbConnection.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({ errore: "DB ERROR", message: "Errore nel recuperare dati dal DB" })
        }

        let results = rows

        // if (req.query.tag) {
        //     results = rows.filter(post => post.tag.includes(req.query.tag))
        // }

        res.json(results)
    })
}

function show(req, res) {
    const id = Number(req.params.id)
    if (isNaN(id)) {
        return res.status(400).json({ error: "user error", message: "id non valido" })
    }

    const entityQuery = "SELECT * FROM posts WHERE id = ?"
    const relationsQuery = `SELECT tags.label FROM tags
    INNER JOIN post_tag 
    ON post_tag.tag_id = tags.id
    WHERE post_tag.post_id = ?`

    const parametriQuery = [id];
    dbConnection.query(entityQuery, parametriQuery, (error, results) => {

        if (error) {
            return res.status(500).json({ error: "Query error", message: "Impossibile processare la richiesta" })
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Not found", message: "Impossibile trovare la risorsa richiesta" })
        }

        const post = results[0]

        dbConnection.query(relationsQuery, parametriQuery, (error, results) => {
            if (error) {
                return res.status(500).json({ error: "Query error", message: "Impossibile processare la richiesta" })
            }
            post.tags = results.map(tag => tag.label)

            res.json(post)
        })
    })
}

function store(req, res) {
    const { title, content, image } = req.body

    if (!title || !content || !image) {
        return res.status(400).json({ error: "Inserting error", message: "Mancano titolo, contenuto o immagine del post da inserire" })
    }

    const sql = "INSERT INTO posts (title, content, image) VALUES (?, ?, ?)"
    const parametriQuery = [title, content, image]

    dbConnection.query(sql, parametriQuery, (error, results) => {
        if (error) {
            console.log(error)
            return res.status(500).json({ error: "Cannot insert post", message: "Impossibile inserire il post" })
        }
        return res.status(201).json({ id: results.insertId })
    })
}

function destroy(req, res) {

    const id = Number(req.params.id)
    if (isNaN(id)) {
        return res.status(400).json({ error: "user error", message: "id non valido" })
    }

    const entityQuery = "DELETE from posts WHERE id = ?"
    const parametriQuery = [id]
    dbConnection.query(entityQuery, parametriQuery, (error, results) => {

        if (error) {
            return res.status(500).json({ error: "Query error", message: "Impossibile processare la richiesta" })
        }

        res.sendStatus(204);
    })

    // opzione A
    // console.log("Eliminazione del post " + req.params.id)
    // console.log(postsList)
    // postsList.splice(req.params.id - 1, 1)
    // console.log(postsList)

    // opzione B
    // const selectedPost = postsList.find(post => post.id == Number(req.params.id))
    // const selectedPostID = postsList.indexOf(selectedPost)
    // if (!selectedPost) {
    //     return res.status(404).json({ errore: "Not Found", message: "Post non trovato" })
    // }
    // postsList.splice(selectedPostID, 1)
    // console.log(postsList)
    // res.sendStatus(204)
}


function update(req, res) {
    const id = Number(req.params.id)
    if (isNaN(id)) {
        return res.status(400).json({ error: "user error", message: "id non valido" })
    }
    const { title, content, image } = req.body;
    if (!title || !content || !image) {
        return res.status(400).json({ error: "Inserting error", message: "Mancano titolo, contenuto o immagine del post da aggiornare" })
    }
    const sql = "UPDATE posts SET title = ?, content = ?, image = ? WHERE id = ?"

    dbConnection.query(sql, [title, content, image, id], (error, results) => {
        if (error) {
            console.log(error)
            return res.status(500).json({ error: "Query error", message: "Impossibile modificare il post" })
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Not found", message: "Impossibile modificare una risorsa non esistente" })
        }
        return res.status(200).json({ message: "Risorsa modificata con successo" })
    })
}

const funzioniController = {
    index,
    show,
    store,
    destroy,
    update,
}

module.exports = funzioniController