import { users, scores, questions } from "../models/userModel.js";
/**
 * Standard response helper
 */
const resOk = (res, data) => res.json({ success: true, data });
const resErr = (res, message, code = 400) => res.status(code).json({ success: false, message });
/* -------- Users -------- */
export const getAllUsers = (_req, res) => {
    resOk(res, users.map(u => ({ username: u.username })));
};
export const getUser = (req, res) => {
    const { username } = req.params;
    const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (!user)
        return resErr(res, "User not found", 404);
    resOk(res, { username: user.username });
};
export const createUser = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return resErr(res, "username and password required");
    const exists = users.some(u => u.username.toLowerCase() === username.toLowerCase());
    if (exists)
        return resErr(res, "username already exists");
    const newUser = { username, password };
    users.push(newUser);
    resOk(res, { username: newUser.username });
};
export const updateUser = (req, res) => {
    const { username } = req.params;
    const { password } = req.body;
    const idx = users.findIndex(u => u.username.toLowerCase() === username.toLowerCase());
    if (idx === -1)
        return resErr(res, "User not found", 404);
    if (!password)
        return resErr(res, "password required");
    users[idx].password = password;
    resOk(res, { username: users[idx].username });
};
export const deleteUser = (req, res) => {
    const { username } = req.params;
    const idx = users.findIndex(u => u.username.toLowerCase() === username.toLowerCase());
    if (idx === -1)
        return resErr(res, "User not found", 404);
    users.splice(idx, 1);
    // also remove scores for that user
    for (let i = scores.length - 1; i >= 0; i--) {
        if (scores[i].username.toLowerCase() === username.toLowerCase())
            scores.splice(i, 1);
    }
    resOk(res, { username });
};
/* -------- Scores -------- */
export const getAllScores = (_req, res) => {
    resOk(res, scores);
};
export const getScore = (req, res) => {
    const { username } = req.params;
    const sc = scores.find(s => s.username.toLowerCase() === username.toLowerCase());
    if (!sc)
        return resErr(res, "Score not found", 404);
    resOk(res, sc);
};
/**
 * Create or update score for a user (upsert)
 * body: { username, score }
 */
export const upsertScore = (req, res) => {
    const { username, score } = req.body;
    if (!username || typeof score !== "number")
        return resErr(res, "username and numeric score required");
    const idx = scores.findIndex(s => s.username.toLowerCase() === username.toLowerCase());
    if (idx === -1) {
        const ns = { username, score };
        scores.push(ns);
        return resOk(res, ns);
    }
    else {
        scores[idx].score = score;
        return resOk(res, scores[idx]);
    }
};
export const deleteScore = (req, res) => {
    const { username } = req.params;
    const idx = scores.findIndex(s => s.username.toLowerCase() === username.toLowerCase());
    if (idx === -1)
        return resErr(res, "Score not found", 404);
    const removed = scores.splice(idx, 1)[0];
    resOk(res, removed);
};
/* -------- Questions -------- */
export const getAllQuestions = (_req, res) => {
    resOk(res, questions);
};
export const getQuestion = (req, res) => {
    const idx = Number(req.params.index);
    if (Number.isNaN(idx) || idx < 0 || idx >= questions.length)
        return resErr(res, "Question not found", 404);
    resOk(res, questions[idx]);
};
export const addQuestion = (req, res) => {
    const payload = req.body;
    if (!payload?.question || !Array.isArray(payload.options) || !payload.answer)
        return resErr(res, "Invalid question payload");
    const q = {
        question: payload.question,
        options: payload.options,
        answer: payload.answer
    };
    questions.push(q);
    resOk(res, { index: questions.length - 1, question: q });
};
export const updateQuestion = (req, res) => {
    const idx = Number(req.params.index);
    if (Number.isNaN(idx) || idx < 0 || idx >= questions.length)
        return resErr(res, "Question not found", 404);
    const payload = req.body;
    if (payload.question)
        questions[idx].question = payload.question;
    if (Array.isArray(payload.options))
        questions[idx].options = payload.options;
    if (payload.answer)
        questions[idx].answer = payload.answer;
    resOk(res, { index: idx, question: questions[idx] });
};
export const deleteQuestion = (req, res) => {
    const idx = Number(req.params.index);
    if (Number.isNaN(idx) || idx < 0 || idx >= questions.length)
        return resErr(res, "Question not found", 404);
    const removed = questions.splice(idx, 1)[0];
    resOk(res, removed);
};
