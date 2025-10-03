// server/src/controllers/chatbotController.js

import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

// Add this log to check if the API key is loaded
console.log("Checking Gemini API Key:", process.env.GEMINI_API_KEY ? "Key Found" : "--- KEY NOT FOUND! ---");

// Initialize the Generative AI model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Use the stable 'gemini-pro' model
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const handleChat = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ success: false, message: "Message is required." });
        }

        const prompt = `You are a helpful assistant for a website called SkillSwap. A user is asking: "${message}"`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        res.status(200).json({ success: true, reply: text });
    } catch (error) {
        console.error("Chatbot Error:", error);
        res.status(500).json({ success: false, message: "Sorry, I'm having trouble connecting to the AI service right now." });
    }
};