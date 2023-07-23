'use strict';
const express = require('express');
const axios = require('axios');
const Drugs = require('../functions/function1');
const RouteAxios = express.Router();
require('dotenv').config();
const Doctors = require('../functions/function2');

RouteAxios.get('/globel', (req, res, next) => {
  try {
    res.send('you are in the correct page');
  } catch (error) {
    next(`Globel route +${error}`);
  }
});

RouteAxios.get('/search', async (req, res, next) => {
    console.log(1);
  try {
    const drugName = req.query.drug;
    console.log(drugName)
    const response = await axios.get(`https://drug-info-and-price-history.p.rapidapi.com/1/druginfo/drug=${drugName}`);
    console.log(response);
    let allinfo = [];
    for (let i = 0; i < response.results.length; i++) {
      // const data = response.results[i];
      const newDrug = new Drugs(data[0].generic_name, data[0].brand_name, data[0].dosage_form, data[0].pharm_class);
      allinfo.push(newDrug);
    }
    res.send(allinfo);
  } catch (error) {
    next(`search route +${error}`);
  }
});


RouteAxios.get('/search', async (req, res, next) => {
  try {
    const drugName = req.query.drug;
    console.log(drugName)
    const response = await axios.get(`https://drug-info-and-price-history.p.rapidapi.com/1/druginfo/drug=${drugName}`, {
      headers: {
        'X-RapidAPI-Key': '1285a2472cmsh121442f27caaffcp193017jsn5c5796064f25',
        'X-RapidAPI-Host': 'drug-info-and-price-history.p.rapidapi.com'
      }
    });
    console.log(response.data);
    let allinfo = [];
    for (let i = 0; i < response.data.results.length; i++) {
      const data = response.data[0];
      const newDrug = new Drugs(data.generic_name, data.brand_name, data.dosage_form, data.pharm_class);
      allinfo.push(newDrug);
    }
    res.send(allinfo);
  } catch (error) {
    next(`search route +${error}`);
  }
});






//NOTIC
//work correctly
RouteAxios.get('/searchDoc/:specialty', async (req, res, next) => {
  try {
    const specialty = req.params.specialty; 
    const response = await axios.get(`https://abarham97.github.io/doctorAPI/doctor.json?specialty=${specialty}`);
    let doctorInfo = [];
    for (let i = 0; i < response.data.length; i++) {
      const doctorData = response.data[i];
      const Doctor = new Doctors(doctorData["Provider Name"], doctorData.Specialty, doctorData.City);
      doctorInfo.push(Doctor);
      console.log(doctorInfo);
    }
    res.send(doctorInfo);
  } catch (error) {
    next(`searchDoc route +${error}`);
  }
});


//work correctly
RouteAxios.get('/searchDoc', async (req, res, next) => {
  try {
    const response = await axios.get('https://abarham97.github.io/doctorAPI/doctor.json');
    let doctorInfo = [];
    for (let i = 0; i < response.data.length; i++) {
      const doctorData = response.data[i];
      const Doctor = new Doctors(doctorData["Provider Name"], doctorData.Specialty, doctorData.City);
      doctorInfo.push(Doctor);
    }
    res.send(doctorInfo);
  } catch (error) {
    next(`searchDoc route +${error}`);
  }
});












module.exports = RouteAxios;






 
