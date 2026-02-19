import express from "express";
import employees from "#db/employees";

const app = express();
export default app;
let lastRandomIndex = -1;

app.get('/' , (req, res)=> {
    res.send('Hello employees!')
})

app.get('/employees', (req, res) => {
    const arrayOfEmployees = employees;
    res.send(arrayOfEmployees)
})

app.get('/employees/random', randomEmployee)

app.get('/employees/:id', getEmployeeByID)



function getEmployeeByID(req, res){
    const { id } = req.params;
    const employee = employees.find((e) => e.id === +id);

    if (!employee) {
        return res.status(404).send("Employee is not real. YOU'RE NOT REAL MAN!");
    }

    res.send(employee);
}

function randomEmployee(req, res){
    let randomI = Math.floor(Math.random() * employees.length);

    if (employees.length > 1) {
        while (randomI === lastRandomIndex) {
            randomI = Math.floor(Math.random() * employees.length);
        }
    }

    lastRandomIndex = randomI;
    res.send(employees[randomI]);
}
