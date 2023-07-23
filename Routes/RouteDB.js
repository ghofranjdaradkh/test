`use strict`
const express = require('express')

const RouteDB = express.Router()

const client = require('../client')


//doctors 
//work correctly

RouteDB.post("/addDoctor", (req, res, next) => {
    try {
        const { name, location, Specialty, phone, appointment } = req.body;
        let sql = `INSERT INTO doctor_table ( name, location,  Specialty,phone, appointment) VALUES ($1,$2,$3,$4,$5)`;
        client.query(sql, [name, location, Specialty, phone, appointment]).then(() => {
            res.status(200).json(`Doctor${name} added to database`);
        });

    } catch (error) {
        next(`addDoctor ${error}`)

    }

});


  

//work correctly
RouteDB.put('/updateDoctor/:id', (req, res, next) => {
    try {
        let { name, location, Specialty, phone, appointment } = req.body;

        let sql = `UPDATE doctor_table SET name=$1, location=$2, Specialty=$3, phone=$4, appointment=$5  WHERE id=${req.params.id}`;
        client.query(sql, [name, location, Specialty, phone, appointment]).then(() => res.status(200).json("updated Doctor data")
        )
    }

    catch (error) {
        next(`updateDoctor: ${error}`)
    }
});

//patient
//work correctly
RouteDB.post("/AddPatient", (req, res, next) => {
    try {
        const { name, history, appointment, age } = req.body;
        let sql = `INSERT INTO patient ( name, history,  appointment,age) VALUES ($1,$2,$3,$4)`;
        client.query(sql, [name, history, appointment, age]).then(() => {
            res.status(200).json(`Patient${name} added to database`);
        });

    } catch (error) {
        next(`addPatient ${error}`)

    }

});
//work correctly
RouteDB.get("/getAllPaitent", (req, res, next) => {
    try {
        let sql = `SELECT * FROM patient`;
        client.query(sql).then((patientData) => {
            res.status(200).send(patientData.rows);
        });

    } catch (error) {
        next(`patient:${error}`)
    }

})
//work correctly
RouteDB.put('/updatePatient/:id', (req, res, next) => {
    try {
        let { name, history, appointment, age } = req.body;

        let sql = `UPDATE patient SET name=$1, history=$2, appointment=$3, age=$4  WHERE id=${req.params.id}`;
        client.query(sql, [name, history, appointment, age]).then(() => res.status(200).json("updated patient data")
        )
    }

    catch (error) {
        next(`updatePatient: ${error}`)
    }
});




//appointment // work 


RouteDB.delete('/:id', async (req, res, next) => {
    try {
        let { id } = req.params;
        let sql = `DELETE FROM Appointment_table WHERE id =${id}`
        await client.query(sql)
        res.status(204).end()
    }
    catch (error) {
        next("Delete Appointment" + error)
    }
})

RouteDB.post("/addAppointment", (req, res, next) => {
    try {
        const { Reservation_Date, Reservation_Time, Report } = req.body;
        let sql = `INSERT INTO Appointment_table ( Reservation_Date, Reservation_Time, Report) VALUES ($1,$2,$3)`;
        client.query(sql, [Reservation_Date, Reservation_Time, Report]).then(() => {
            res.status(200).json('appointment added to database');
        });

    } catch (error) {
        next(`addPatient ${error}`)

    }
       

});

RouteDB.put('/updateAppointment/:id', (req, res, next) => {
    try {
        let { Reservation_Date, Reservation_Time, Report } = req.body;

        let sql = `UPDATE Appointment_table SET Reservation_Date=$1, Reservation_Time=$2, Report=$3,  WHERE id=${req.params.id}`;
        client.query(sql, [Reservation_Date, Reservation_Time, Report]).then(() => res.status(200).json("update Appointment data")
        )
    }

    catch (error) {
        next(`updateAppointment: ${error}`)
    }
});


RouteDB.get("/getAllAppointment", (req, res, next) => {
    try {
        let sql = `SELECT * FROM Appointment_table`;
        client.query(sql).then((AppointmentData) => {
            res.status(200).send(AppointmentData.rows);
        });

    } catch (error) {
        next(`getAllAppointment:${error}`)
    }

})

module.exports = RouteDB