const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const CredentialModel = require('./models/LoginCredentials');
const DataModel = require('./models/RtoD')
const ForecastModel = require('./models/forecasted');
const UserModel = require('./models/userModel')
const zod = require('zod');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://admin:EkmduKxSIfW9RTeW@cohort.eadvlvf.mongodb.net/");

const validateInput = ({ id, password, role }) => {
    const schema = zod.object({
        id: zod.string().min(6).max(6), // Adjusted for id of length 6
        password: zod.string().min(8),
        role: zod.string() // Assuming role is a string
    });
    return schema.safeParse({ id, password, role });
};

app.post('/contact', (req, res) =>{
    UserModel.create(req.body)
      .then(contacts=>res.json(contacts))
      .catch(error=>res.json(err))
})

app.post("/login", (req, res) => {
    const { id, password, role } = req.body;
    const validationResult = validateInput({ id, password, role });

    if (!validationResult.success) {
        res.status(400).json({ error: "Invalid input" });
        return;
    }

    CredentialModel.findOne({ id: id })
        .then(user => {
            if (user) {
                if (user.password === password && user.role === role) {
                    res.json("Success");
                } else {
                    res.status(404).json("Incorrect credentials");
                }
            } else {
                res.status(404).json("No record found");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        });
});

app.get("/dashboard", (req, res) => {
    const id = req.query.id;
    const jsonFinal = {
        currentData: {},
        forecastData: {}
    };

    // Create an array to collect all promises from findOne calls for current data
    const promises = [];
    for (let i = 1; i < 106; i++) {
        let temp = i.toString();
        promises.push(DataModel.findOne({ Counter: temp }).catch(error => {
            console.error("Error fetching document:", error);
        }));
    }

    // Create an array to collect all promises from findOne calls for forecast data
    const promisesForecast = [];
    for (let i = 1; i < 13; i++) {
        let temp = i.toString();
        promisesForecast.push(ForecastModel.findOne({ Counter: temp }).catch(error => {
            console.error("Error fetching document:", error);
        }));
    }

    // Wait for both sets of promises to resolve
    Promise.all([Promise.all(promises), Promise.all(promisesForecast)])
        .then(([currentUsers, forecastUsers]) => {
            // Populate currentData object
            currentUsers.forEach((user) => {
                if (user) {
                    jsonFinal.currentData[user.Counter] = {
                        month: user.Month,
                        R1Sales: user.R1Sales,
                        From: user.From,
                    };
                }
            });

            // Populate forecastData object
            forecastUsers.forEach((user) => {
                if (user) {
                    jsonFinal.forecastData[user.Counter] = {
                        month: user.Month,
                        Forecast: user.Forecast,
                        From: user.From,
                    };
                }
            });

            // Send jsonFinal to the frontend
            res.json(jsonFinal);
        })
        .catch((error) => {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        });
});

app.listen(3001, () => {
    console.log('Server is running');
});
