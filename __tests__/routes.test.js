'use strict';


const superagent = require('superagent');
const apiUrl = 'https://ey5bvhivwj.execute-api.us-west-2.amazonaws.com/beta';


describe('testing the amazon api gateway routes', () =>{
    test('test should send the data', async () =>{
        const response = await superagent.post(`${apiUrl}/towing`).send({
  incidentId: 'a8422068-fb33-4602-aa47-e6a5b297548a',
  incidentType: 'Minor Accident',
  incidentDate: 'Tue Mar 16 2021 08:47:34 GMT-0700 (Pacific Daylight Time)',
  name: 'John Smith',
  phone: '555-555-5555',
  insurancePolicy: '2dfedb87-2ac6-4170-97a2-208c5e6facf1',
  location: '30287 Schowalter Islands, East Kianaside, NE 98223-9079',
  vehicle: 'Black 2001 Dodge Charger'
        });
        
        expect(response.body.incidentId).toBeTruthy();
        expect(response.body.name).toEqual('John Smith')

    })

    test('test should send the data', async () =>{
        const response = await superagent.post(`${apiUrl}/roadside`).send({
  incidentId: 'a8422068-fb33-4602-aa47-e6a5b297548a',
  incidentType: 'Roadside Assistance',
  incidentDate: 'Tue Mar 16 2021 08:47:34 GMT-0700 (Pacific Daylight Time)',
  name: 'John Smith',
  phone: '555-555-5555',
  insurancePolicy: '2dfedb87-2ac6-4170-97a2-208c5e6facf1',
  location: '30287 Schowalter Islands, East Kianaside, NE 98223-9079',
  vehicle: 'Black 2001 Dodge Charger'
        });

        
        expect(response.body.incidentDate).toBeTruthy();
        expect(response.body.incidentType).toEqual('Roadside Assistance')

    })

    test('test should send the data', async () =>{
        const response = await superagent.post(`${apiUrl}/police`).send({
  incidentId: 'a8422068-fb33-4602-aa47-e6a5b297548a',
  incidentType: 'Major Accident',
  incidentDate: 'Tue Mar 16 2021 08:47:34 GMT-0700 (Pacific Daylight Time)',
  name: 'John Smith',
  phone: '555-555-5555',
  insurancePolicy: '2dfedb87-2ac6-4170-97a2-208c5e6facf1',
  location: '30287 Schowalter Islands, East Kianaside, NE 98223-9079',
  vehicle: 'Black 2001 Dodge Charger'
        });
        
        expect(response.body.incidentId).toBeTruthy();
        expect(response.body.incidentType).toEqual('Major Accident')

    })

    test('test should send the data', async () =>{
        const response = await superagent.post(`${apiUrl}/insurance`).send({
  incidentId: 'a8422068-fb33-4602-aa47-e6a5b297548a',
  incidentType: 'Minor Accident',
  incidentDate: 'Tue Mar 16 2021 08:47:34 GMT-0700 (Pacific Daylight Time)',
  name: 'John Smith',
  phone: '555-555-5555',
  insurancePolicy: '2dfedb87-2ac6-4170-97a2-208c5e6facf1',
  location: '30287 Schowalter Islands, East Kianaside, NE 98223-9079',
  vehicle: 'Black 2001 Dodge Charger'
        });
        console.log(response.body);
        
        expect(response.body.insurancePolicy).toBeTruthy();
        expect(response.body.vehicle).toEqual('Black 2001 Dodge Charger')

    })
})
