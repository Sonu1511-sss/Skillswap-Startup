// server/index.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { createServer } from "http";
import { Server } from "socket.io";

// --- DATABASE & MODELS ---
import { dbConnect } from "./src/config/database.js";
import Message from "./src/models/Message.js";
import Conversation from "./src/models/Conversation.js";

// --- ROUTERS ---
import AuthRoutes from "./src/routes/authRoutes.js";
import UserRoutes from "./src/routes/userRoutes.js";
import SkillSwapRoutes from "./src/routes/skillSwapRoutes.js";
import sessionRoutes from "./src/routes/sessionRoutes.js";
import conversationRoutes from "./src/routes/conversationRoutes.js";
import searchRoutes from "./src/routes/searchRoutes.js";
import messageRoutes from "./src/routes/messageRoutes.js";
import chatbotRoutes from "./src/routes/chatbotRoutes.js";

// --- INITIAL SETUP ---
const app = express();
const PORT = process.env.PORT || 5000;
const httpServer = createServer(app);

// --- Allowed Origins for CORS ---
const allowedOrigins = [
  "http://localhost:5173",              // local development
  "https://skillswap-indol.vercel.app", // ✅ your live frontend (no trailing slash)
];

// --- CORS Configuration ---
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`Blocked CORS request from origin: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// --- Socket.IO Setup ---
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

// --- Connect Database ---
dbConnect();

// --- Make io accessible in routes ---
const userSocketMap = {};
app.use((req, res, next) => {
  req.io = io;
  req.userSocketMap = userSocketMap;
  next();
});

// --- Test Route ---
app.get("/", (req, res) => res.json({ message: "Welcome to SkillSwap API 🚀" }));

// --- API ROUTES ---
app.use("/api/auth", AuthRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/swaps", SkillSwapRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/chatbot", chatbotRoutes);

// --- SOCKET.IO EVENTS ---
io.on("connection", (socket) => {
  console.log("✅ A user connected:", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId && userId !== "undefined") {
    userSocketMap[userId] = socket.id;
    console.log(`User ${userId} is online.`);
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  }

  socket.on("sendMessage", async ({ conversationId, senderId, receiverId, content }) => {
    try {
      const newMessage = new Message({ conversationId, senderId, content });
      await newMessage.save();

      const conversation = await Conversation.findById(conversationId);
      if (conversation) {
        conversation.lastMessage = content;
        conversation.lastMessageAt = Date.now();
        const currentCount = conversation.unreadCounts.get(receiverId) || 0;
        conversation.unreadCounts.set(receiverId, currentCount + 1);
        await conversation.save();
      }

      const populatedMessage = await Message.findById(newMessage._id).populate(
        "senderId",
        "name profilePicture"
      );

      const receiverSocketId = userSocketMap[receiverId];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", populatedMessage);
        io.to(receiverSocketId).emit("notification", { conversationId });
      }
    } catch (error) {
      console.error("❌ Error sending message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("⚠️ User disconnected:", socket.id);
    for (const id in userSocketMap) {
      if (userSocketMap[id] === socket.id) {
        delete userSocketMap[id];
        break;
      }
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

// --- SERVER START ---
httpServer.listen(PORT, () => {
  console.log(`✅ SkillSwap API running on port: ${PORT}`);
});
