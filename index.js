const express = require('express');
const bodyParser = require('body-parser');
const rental = require('./rentalPrice');
const fs = require('fs');

const app = express();
const PORT = 3000;
const FORM_HTML_PATH = 'form.html';
const RESULT_HTML_PATH = 'result.html';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/pictures', express.static('images'));

const formHtml = fs.readFileSync(FORM_HTML_PATH, 'utf8');
const resultHtml = fs.readFileSync(RESULT_HTML_PATH, 'utf8');

app.post('/', (req, res) => {
    const { pickup, dropoff, pickup_date, dropoff_date, car_type, age } = req.body;
    const result = rental.calculateRentalPrice(
        String(pickup),
        String(dropoff),
        Date.parse(pickup_date),
        Date.parse(dropoff_date),
        String(car_type),
        Number(age)
    );

    const responseHtml = formHtml + resultHtml.replace(/\$0/g, result);
    res.send(responseHtml);
});

app.get('/', (req, res) => {
    res.send(formHtml);
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
