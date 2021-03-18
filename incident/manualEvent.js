'use strict';

const faker = require('faker');
const inquirer = require('inquirer');
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });
const sns = new AWS.SNS();

const majorAccident = 'arn:aws:sns:us-west-2:560831323692:major-accident.fifo';
const minorAccident = 'arn:aws:sns:us-west-2:560831323692:minor-accident.fifo';
const majorBreakdown = 'arn:aws:sns:us-west-2:560831323692:major-breakdown.fifo';
const roadsideAssist = 'arn:aws:sns:us-west-2:560831323692:roadside-assistance.fifo';
const theftBreakIn = 'arn:aws:sns:us-west-2:560831323692:auto-theft-breakin.fifo';

let incidentTopic;
let eventData;
let report;


class Location {
  constructor() {
    this.locationInfo = faker.fake('{{address.streetAddress}}, {{address.city}}, {{address.stateAbbr}} {{address.zipCode}}');
  }
}

class Vehicle {
  constructor() {
    let customVehicle;
    if(eventData.make && eventData.model) {
      customVehicle = `${eventData.make} ${eventData.model}`;
    }
    let color = faker.vehicle.color();
    let capitalColor = color.charAt(0).toUpperCase() + color.slice(1);
    let year = 1990 + Math.floor(Math.random() * 31);
    this.vehicleInfo = `${eventData.color || capitalColor} ${eventData.year || year} ${customVehicle || faker.vehicle.vehicle()}`;
  }
}

class TimeOfIncident {
  constructor() {
    this.timeInfo = Date()
  }
}

class Incident {
  constructor() {
    let incidentType = (Math.random() * 100);
    if(eventData.incidentType) {
      if(eventData.incidentType === 'Theft') {
        this.incidentInfo = 'Theft';
        incidentTopic = theftBreakIn;
      } else if(eventData.incidentType === 'Major Accident') {
        this.incidentInfo = 'Major Accident';
        incidentTopic = majorAccident;
      } else if(eventData.incidentType === 'Major Breakdown') {
        this.incidentInfo = 'Major Breakdown';
        incidentTopic = majorBreakdown;
      } else if(eventData.incidentType === 'Minor Accident') {
        this.incidentInfo = 'Minor Accident';
        incidentTopic = minorAccident;
      } else {
        this.incidentInfo = 'Roadside Assistance';
        incidentTopic = roadsideAssist;
      }
    } else {

      if(incidentType > 90) {
        this.incidentInfo = 'Theft';
      } else if(incidentType > 75) {
        this.incidentInfo = 'Major Accident';
      } else if(incidentType > 55) {
        this.incidentInfo = 'Major Breakdown';
      } else if(incidentType > 30) {
        this.incidentInfo = 'Minor Accident';
      } else {
        this.incidentInfo = 'Minor Breakdown';
      }
    }
  }
}

class IncidentReport {
  constructor() {
    this.incidentId = faker.random.uuid(),
    this.incidentType = new Incident().incidentInfo,
    this.incidentDate = new TimeOfIncident().timeInfo,
    this.name = eventData.name || faker.name.findName(),
    this.phone = eventData.phone || faker.phone.phoneNumberFormat(),
    this.email = eventData.email,
    this.insurancePolicy = faker.random.uuid(),
    this.location = new Location().locationInfo,
    this.vehicle = new Vehicle().vehicleInfo
  }
}

// from stackoverflow
let emailChecker = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm;

inquirer
  .prompt([
    {
      type: 'list',
      message: 'What happened',
      name: 'incidentType',
      choices: [
        'Major Accident',
        'Minor Accident',
        'Major Breakdown',
        'Roadside Assistance',
        'Theft'
      ]
    },
    {
      type: 'input',
      message: 'Driver\'s Name',
      name: 'name',
      default: 'Jacob Knaack',
      validate: async (name) => {
        if(!name) {
          return 'Please enter driver\'s name';
        }
        return true;
      }
    },
    {
      type: 'input',
      message: 'Phone Number',
      name: 'phone',
      default: '263-333-5569',
      validate: async (phone) => {
        if(!phone) {
          return 'Please enter a valid phone number';
        }
        return true;
      }
    },
    {
      type: 'input',
      message: 'E-mail Address',
      name: 'email',
      default: 'jknaack@oopsie.app',
      validate: async (email) => {
        if(!emailChecker.test(email)) {
          return 'Please enter a valid e-mail address';
        }
        return true;
      }
    },
    {
      type: 'number',
      message: 'Vehicle Year',
      name: 'year',
      default: '2021',
      validate: async (year) => {
        if(year < 1950 || year > 2021) {
          return 'Please enter a year between 1950 and 2021';
        }
        return true;
      }
    },
    {
      type: 'input',
      message: 'Vehicle Make (ie. Ford, Dodge, Nissan)',
      name: 'make',
      // validate: async (make) => {
      //   if(!make) {
      //     return 'Please enter vehicle make';
      //   }
      //   return true;
      // }
    },
    {
      type: 'input',
      message: 'Vehicle Model (ie. Mustang, Challenger, Altima)',
      name: 'model',
      // validate: async (model) => {
      //   if(!model) {
      //     return 'Please enter vehicle model';
      //   }
      //   return true;
      // }
    },
    {
      type: 'input',
      message: 'Vehicle Color',
      name: 'color',
      // validate: async (color) => {
      //   if(!color) {
      //     return 'Please enter color of vehicle';
      //   }
      //   return true;
      // }
    },
  ])
  .then(answers => {
    eventData = answers;
    report = new IncidentReport();
    console.log(report);

    const params = {
    MessageGroupId: 'test',
    MessageDeduplicationId: faker.random.uuid(),
    TopicArn: incidentTopic,
    Message:JSON.stringify(report),
  };
  
  sns.publish(params).promise().then(console.log).catch(console.error);
  });