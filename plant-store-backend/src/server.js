import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';


dotenv.config();


const PORT = process.env.PORT || 4000;


(async () => {
await connectDB(process.env.MONGODB_URI);
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
})();