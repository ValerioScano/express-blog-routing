const express = require("express")
const router = express.Router()
const funzioniController = require("../controllers/postsController")

// index 
router.get("/", funzioniController.index)

// show

// router.get("/:id", funzioniController.show)

// store

// router.post("/", funzioniController.store)

// update

// router.put("/:id", funzioniController.update)

// modify

// router.patch("/:id", (req, res) => {
//     res.send("Modifica parziale del post " + req.params.id)
// })

// destroy

router.delete("/:id", funzioniController.destroy)

module.exports = router