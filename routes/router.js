const router = require('express').Router();
const users = require('./users');
const boards = require('./boards');

router.get("/users", users.users);

router.post("/boards/create", boards.postBoard);
router.get("/boards/read", boards.getBoards);
router.get("/boards/read/:boardId", boards.getBoard);
router.put("/boards/edit/:boardId", boards.putBoard);
router.delete("/boards/remove/:boardId", boards.deleteBoard);
router.put("/boards/cancel-remove/:boardId", boards.cancelDeleteBoard);

module.exports = router;

