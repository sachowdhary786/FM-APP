if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: __dirname + '../../.env' });
}
const express = require('express');
const cors = require('cors');
const app = express();


var corsOptions = {
  origin: 'http://localhost:3000'
};

// require('dotenv').config({ path: './config.env' });
const port = process.env.PORT || 5000;
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the FM-App backend' })
})
app.use(require('./routes/records'));
app.use(require('./routes/posts'));
app.use(require('./routes/auth.routes'))
app.use(require('./routes/user.routes'))

const db = require('./models');
const Role = db.role;

db.mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.676d1fs.mongodb.net/${process.env.DB_NAME}`).then(() => {
  console.log('SUCCESS');
  initial();
}).catch(err => {
  console.error(err);
  process.exit();
})

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "User"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("Added 'User' to roles collection")
      })

      new Role({
        name: "Moderator"
      }).save(err => {
        if (err) {
          console.log("error", err)
        }
        console.log("Added 'Moderator' to roles collection")
      })

      new Role({
        name: "Administrator"
      }).save(err => {
        if (err) {
          console.log("error", err)
        }
        console.log("Added 'Administrator' to roles collection")
      })
    }
  })
}

const dbo = require('./db/conn');

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
})
