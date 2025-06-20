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
// allow filtering by category as query param and allow searching by title as query param
router.get("/", async (req, res, next) => {
    const { category, search } = req.query;
    const categoryFilter = category ? { category } : {};
    const searchFilter = search ? { title: { contains: search } } : {};

    try {
        if (category || search) {
            const boards = await prisma.board.findMany({
                where: {
                    OR: [
                        categoryFilter,
                        searchFilter
                    ],
                },
                include: {
                    cards: true
                }
            });
            res.status(200).json(boards);
            return;
        }
        const boards = await prisma.board.findMany({
            include: {
                cards: true
            }
        })
        res.status(201).json(boards);

    } catch (err) {
        next(err);
    }
});

// [GET] get boards by recent
router.get("/recent", async (req, res, next) => {
    try {
        const boards = await prisma.board.findMany({
            orderBy: [{
                id: "desc"
            }],
        })
        res.status(200).json(boards);
    } catch (err) {
        next(err);
    }
});

// [POST] CREATE a new board
router.post("/", async (req, res, next) => {
    try {
        const { title, category, gif, author } = req.body;

        const newBoard = await prisma.board.create({
            data: {
                title,
                category,
                gif,
                author
            }
        });

        res.status(201).json(newBoard);
    } catch (err) {
        next(err);
    }
});

// [DELETE] deletes a board
router.delete("/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const board = await prisma.board.findUnique({
            where: { id }
        });

        if (board) {
            // delete all cards tied to this board to avoid foreign key constraint errors
            await prisma.card.deleteMany({
                where: { boardId: id }
            });

            // delete the board
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
router.use((err, req, res, next) => {
    const { message, status = 500 } = err;
    res.status(status).json({ message });
});

module.exports = router;
