import { Message } from "../Model/Message.js";

export const addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;

        const data = await Message.create({
            message: {
                text: message,
                users: [from, to],
                sender: from,
            },
        });


        if (data) return res.json({ msg: "message added successfully." });
        return res.json({ msg: "Failed to add message to database" })
    } catch (error) {
        next(error)

    }
}

export const getAllMessage = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        console.log(from, to);

        const messages = await Message.find({
            'message.users': { $all: [String(from), String(to)] }
        }).sort({ updatedAt: 1 });

        console.log(messages);

        const projectMessages = messages.map((msg) => {
            return {
                fromSelf: msg.message.sender.toString() === from,
                message: msg.message.text,
            };
        });

        console.log(projectMessages);

        res.json(projectMessages);

    } catch (error) {
        next(error)

    }
}