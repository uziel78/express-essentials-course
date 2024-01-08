import express from 'express';
import data from './data/mock.json' assert { type: 'json' };

const app = express();

const PORT = 3000;

//GET;
// app.get('/', (req, res) => {
//   res.send('This is a GET request at /');
// });
app.get('/', (req, res) => {
  res.json(data);
});

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

app.listen(PORT, () => {
  //console.log(data);
  console.log(`Server running at http://localhost:${PORT}`);
});
