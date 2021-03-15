'use strict';

const faker = require('faker');
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });
const sns = new AWS.SNS();

const majorAccident = 'arn:aws:sns:us-west-2:560831323692:major-accident.fifo';
const minorAccident = 'arn:aws:sns:us-west-2:560831323692:minor-accident.fifo';
const majorBreakdown = 'arn:aws:sns:us-west-2:560831323692:major-breakdown.fifo';
const roadsideAssist = 'arn:aws:sns:us-west-2:560831323692:roadside-assistance.fifo';
const theftBreakIn = 'arn:aws:sns:us-west-2:560831323692:auto-theft-breakin.fifo';

let incidentTopic;


class Location {
  constructor() {
    this.locationInfo = faker.fake('{{address.streetAddress}}, {{address.city}}, {{address.stateAbbr}} {{address.zipCode}}');
  }
}

class Vehicle {
  constructor() {
    let color = faker.vehicle.color();
    let capitalColor = color.charAt(0).toUpperCase() + color.slice(1);
    let year = 1990 + Math.floor(Math.random() * 31);
    this.vehicleInfo = `${capitalColor} ${year} ${faker.vehicle.vehicle()}`
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
      if(incidentType > 90) {
        this.incidentInfo = 'Theft';
        incidentTopic = theftBreakIn;
      } else if(incidentType > 75) {
        this.incidentInfo = 'Major Accident';
        incidentTopic = majorAccident;
      } else if(incidentType > 55) {
        this.incidentInfo = 'Major Breakdown';
        incidentTopic = majorBreakdown;
      } else if(incidentType > 30) {
        this.incidentInfo = 'Minor Accident';
        incidentTopic = minorAccident;
      } else {
        this.incidentInfo = 'Roadside Assistance';
        incidentTopic = roadsideAssist;
    }
  }
}

class IncidentReport {
  constructor() {
    this.incidentId = faker.random.uuid(),
    this.incidentType = new Incident().incidentInfo,
    this.incidentDate = new TimeOfIncident().timeInfo,
    this.name = faker.name.findName(),
    this.phone = faker.phone.phoneNumberFormat(),
    this.insurancePolicy = faker.random.uuid(),
    this.location = new Location().locationInfo,
    this.vehicle = new Vehicle().vehicleInfo
  }
}

setInterval(() => {
  let report = new IncidentReport();

  const params = {
    MessageGroupId: 'test',
    MessageDeduplicationId: faker.random.uuid(),
    TopicArn: incidentTopic,
    Message:JSON.stringify(report),
  };
  
  sns.publish(params).promise().then(console.log).catch(console.error);
}, 4000);