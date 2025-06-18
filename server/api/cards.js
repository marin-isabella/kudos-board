const express = require('express');
const router = express.Router();
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const helmet = require('helmet');
const cors = require('cors');
router.use(helmet());
router.use(express.json());
router.use(cors());

// [GET] - get all cards
router.get("/", async (req, res, next) => {
    try {
        const cards = await prisma.card.findMany({
            include: {
                board: true
            }
        });
        res.status(201).json(cards);
    } catch (err) {
        next(err);
    }
});

// [GET] - get card by ID
// TODO: delete this route
router.get("/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const card = await prisma.card.findUnique({
            where: { id }
        });
        res.status(201).json(card);
    } catch (err) {
        next(err);
    }
});

// [GET] - get cards by board ID
router.get("/board/:boardId", async (req, res, next) => {
    try {
        const boardId = parseInt(req.params.boardId);
        const cards = await prisma.card.findMany({
            where: {
                boardId: boardId
            }
        });
        res.status(201).json(cards);
    } catch (err) {
        next(err);
    }
});

// [POST] - create a new card
router.post("/", async (req, res, next) => {
    try {
        const { title, message, gif, voteCount, boardId } = req.body;

        const board = await prisma.board.findUnique({
            where: { id: boardId }
        });

        if (!board) {
            res.status(404).json("Board not found");
            return;
        }

        const newCard = await prisma.card.create({
            data: {
                title,
                message,
                gif,
                voteCount,
                boardId
            }
        });

        res.status(201).json(newCard);
    } catch (err) {
        next(err);
    }
});

// [PUT] - increase voteCount for a card
router.put("/:id/upvote", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        const card = await prisma.card.findUnique({
            where: { id }
        });

        if (!card) {
            res.status(404).json("Card not found");
            return;
        }

        const upvotedCard = await prisma.card.update({
            where: { id },
            data: {
                voteCount: {
                    increment: 1
                }
            }
        });

        res.status(201).json(upvotedCard);
    } catch (err) {
        next(err);
    }
});

// [DELETE] - deletes a card
router.delete("/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        const card = await prisma.card.findUnique({
            where: { id }
        });

        if (card) {
            const deleted = await prisma.card.delete({
                where: { id }
            });
            res.status(200).json(deleted);
        } else {
            next({status: 404, message: "Card not found"})
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
router.use((req, res, next, err) => {
    const { message, status = 500 } = err;
    res.status(status).json({ message });
});

// TODO: comments for cards
// TODO: pins for cards

module.exports = router;
