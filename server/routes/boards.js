const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const helmet = require('helmet');
const cors = require('cors');
router.use(helmet());
router.use(express.json());
router.use(cors());

// [GET] - get all boards
router.get("/", async (req, res, next) => {
    try {
        const boards = await prisma.board.findMany({
            include: {
                cards: true
            }
        });
        res.status(201).json(boards);
    } catch (err) {
        next(err);
    }
});

// [GET] search a board by id
router.get("/search/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const board = await prisma.board.findMany({
            where: {
                title: {
                    equals: id,
                }
            }
        });

        if (!board) {
            res.status(404).json("Board not found");
            return;
        }

        res.status(201).json(board);
    } catch (err) {
        next(err);
    }
});

// [POST] CREATE a new board
router.post("/", async (req, res, next) => {
    try {
        const { title, category } = req.body;

        const newBoard = await prisma.board.create({
            data: {
                title,
                category
            }
        });

        res.status(201).json(newBoard);
    } catch (err) {
        next(err);
    }
});

// [GET] get boards by filters (category)
router.get("/filter/:id", async (req, res,  next) => {
    try {
        const id = req.params.id;
        const boards = await prisma.board.findMany({
            where: {
                category: {
                    equals: id,
                }
            }
        });
        res.status(201).json(boards);
    } catch (err) {
        next(err);
    }
})

// [GET] get boards by recent
router.get("/recent", async (req, res, next) => {
    try {
        const boards = await prisma.board.findMany({
            orderBy: [{
                id: "desc"
            }],
        })
        res.status(201).json(boards);
    } catch (err) {
        next(err);
    }
});

// [DELETE] deletes a board
router.delete("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const board = await prisma.board.findUnique({
            where: { id }
        });

        if (board) {
            const deleted = await prisma.board.delete({
                where: { id }
            });
            res.json(deleted);
        } else {
            next({status: 404, message: "Board not found"});
        }
    } catch (err) {
        next(err);
    }
});


// CATCH-ALL
router.use((next) => {
    next({ status: 404, message: "Not found" })
});

// Error handling middleware
router.use((err, res) => {
    const { message, status = 500 } = err;
    console.log(message);
    res.status(status).json({ message });
});

module.exports = router;
