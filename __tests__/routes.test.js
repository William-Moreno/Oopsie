'use strict';


const superagent = require('superagent');
const apiUrl = 'https://ey5bvhivwj.execute-api.us-west-2.amazonaws.com/beta';


describe('testing the amazon api gateway routes', () =>{
    it('test should send the data', async () =>{
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
    });

    it('test should send the data', async () =>{
        const response = await superagent.post(`${apiUrl}/roadside`).send({
  incidentId: '6a5b2975-02a4-4jh4-m9d7-df223y5753ia',
  incidentType: 'Roadside Assistance',
  incidentDate: 'Wed Mar 17 2021 14:53:08 GMT-0700 (Pacific Daylight Time)',
  name: 'Alice Dubois',
  phone: '124-816-3264',
  insurancePolicy: '8dfjh43i-rty5-564k-9dk5-m9dfj4g00g64',
  location: '94610 Robert Mountain, Kshlerinfort, AL 35217-4060',
  vehicle: 'Blue 2007 Toyota Prius'
        });

        
        expect(response.body.incidentDate).toBeTruthy();
        expect(response.body.incidentType).toEqual('Roadside Assistance')
    });

    it('test should send the data', async () =>{
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
    });

    it('test should send the data', async () =>{
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
        
        expect(response.body.insurancePolicy).toBeTruthy();
        expect(response.body.vehicle).toEqual('Black 2001 Dodge Charger')
    });
});
