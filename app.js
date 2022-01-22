const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    let formResponse = req.body;
    const { num1, num2 } = formResponse;
    let ans = Number(num1) + Number(num2);
    res.send(`<h1>Thanks, Answer is ${ans}</h1>`);
});

app.get("/bmi", (req, res) => {
    res.sendFile(__dirname + "/bmiCalculator/index.html");
});

app.post("/bmi", (req, res) => {
    let formResponse = req.body;
    let { height, weight } = formResponse;
    height = height / 100;
    let bmi = Number(weight) / (Number(height) * Number(height));
    let category;
    let healthRisk;
    if (bmi < 18.5) {
        category = "Underweight";
        healthRisk = "Possible nutritional deficiency and osteoporosis.";
    } else if (18.5 <= bmi && bmi <= 22.9) {
        category = "Normal";
        healthRisk = "Low risk (healthy range).";
    } else if (23 <= bmi && bmi <= 27.4) {
        category = "Mild to moderate overweight";
        healthRisk = "Moderate risk of developing heart disease, high blood pressure, stroke, diabetes mellitus."
    } else if (27.5 <= bmi) {
        category = "Very overweight to obese";
        healthRisk = "High risk of developing heart disease, high blood pressure, stroke, diabetes mellitus. Metabolic Syndrome.";
    }

    res.send(
        `<h1 style="margin-top:30vh; "><center>Hey buddy, You're BMI is ${bmi.toFixed(2)},</center></h1><br>
        <h2 style="margin:10px auto; "><i><center>Hence, You falls under the category of ${category}</center></i></h2> 
      <div style="text-align: center; margin-top:80px">
      <h2 >Possible Health risks:</h2>
      <p style="font-size:21px";>${healthRisk}.</p><div>`
    );

});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server started at ${PORT}`));
