// Create web server using express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/comments', (req, res) => {
    fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal server error');
            return;
        }
        res.status(200).send(data);
    });
});

app.post('/comments', (req, res) => {
    fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal server error');
            return;
        }
        const comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal server error');
                return;
            }
            res.status(200).send('Comment added successfully');
        });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});