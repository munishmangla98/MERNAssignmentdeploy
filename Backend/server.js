const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors'); // Import the cors package
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');
const commentRoutes = require('./routes/commentRoutes');
const path = require('path');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Enable CORS
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);
app.use('/api/blogcomment', commentRoutes);

// production
if(process.env.NODE_ENV === 'production'){
    const dirPath = path.resolve();
    app.use(express.static("./Frontend/dist"));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(dirPath,"./Frontend/dist","index.html"));
    })
}

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
