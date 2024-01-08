import express from 'express';
import data from './data/mock.json' assert { type: 'json' };

const app = express();

const PORT = 3000;

//Using the public folder at the root (/) of the project
app.use(express.static('public'));

//Using the images folder at the route /images
app.use('/images', express.static('images'));

// Using express,json and express.urlencoded
//app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//GET;
// app.get('/', (req, res) => {
//   res.send('This is a GET request at /');
// });
app.get('/', (req, res) => {
  res.json(data);
});

// POST - using express.json() and express.urlencoded()
// Header: Content-type application/json in postman.
// Body: raw and JSON in postman
app.post('/items', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

// GET - download method
app.get('/download', (req, res) => {
  res.download('images/mountains_2.jpeg');
});

// GET - redirect method
app.get('/redirect', (req, res) => {
  res.redirect('https://www.google.com');
});

// Route chaining
app
  .route('/class')
  .get((req, res) => {
    //res.send('Retrieve class info');
    throw new Error();
  })
  .post((req, res) => {
    res.send('Create class info');
  })
  .put((req, res) => {
    res.send('Edit class info');
  });

// GET - route chaining
// app.get('/class', (req, res) => {
//   res.send('Retrieve class info');
// });

// POST - route chaining
// app.post('/class', (req, res) => {
//   res.send('Create class info');
// });

// PUT - route chaining
// app.put('/class', (req, res) => {
//   res.send('Edit class info');
// });

// GET with next()
app.get(
  '/next',
  (req, res, next) => {
    console.log('The response will be sendt by the next function...');
    next();
  },
  (req, res) => {
    res.send('I just set up a route with a second callback');
  }
);

// GET with routing parameters
app.get('/class/:id', (req, res) => {
  //console.log(req.params);
  const studentId = Number(req.params.id);
  // return the student with the id from mock data
  const student = data.filter((student) => student.id === studentId);
  res.send(student);
});

// POST
app.post('/create', (req, res) => {
  res.send('This is a POST request at /create');
});

// PUT
app.put('/edit', (req, res) => {
  res.send('This is a PUT request at /edit');
});

// DELETE
app.delete('/delete', (req, res) => {
  res.send('This is a DELETE request at /delete');
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('500 - Something is broken!');
});

app.listen(PORT, () => {
  //console.log(data);
  console.log(`Server running at http://localhost:${PORT}`);
});
