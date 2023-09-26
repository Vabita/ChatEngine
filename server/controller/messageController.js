import Msg from "../models/messageModel.js";

const addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        // console.log(from, to);
        const newMsg = new Msg({
            message: { text: message },
            users: { from, to },
            sender: from,
        });

        const data = await newMsg.save();

        if (data) {
            console.log("Successfully added message.");
            return res.json({ msg: "Message added to the database successfully!" });
        } else {
            return res.json({ msg: "Failed to add message into the database!" });
        }
    } catch (ex) {
        next(ex);
    }
};

const getAllMessage = async (req, res, next) => {
    try {
      const { from, to } = req.body;
      const messages = await Msg.find({
        $or: [
          { sender: from, "users.to": to },
          { sender: to, "users.to": from }
        ]
      }).sort({ updatedAt: 1 });
  
      const formattedMessages = messages.map((msg) => ({
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text
      }));
  
      res.json(formattedMessages);
    } catch (ex) {
      next(ex);
    }
  };
  

export { addMessage, getAllMessage };
