import app from './app.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import users from './routes/user.js';
import conversation from './routes/conversation.js';
import message from './routes/message.js';

dotenv.config();

const port = process.env.PORT || 3000;
const mongoDB = process.env.MONGODBURI;

app.use('/users', users);
app.use('/message', message);
app.use('/conversation', conversation);

mongoose.connect(mongoDB).then(() => {
  app.listen(port, () => {
    console.log(`Server Connected  at port:${port}`);
  });
});
