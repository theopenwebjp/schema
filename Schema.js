var Schema = function(){
  var schema = {};
  
  /**
   * Name of anything. String only.
   */
  schema.Name = function(){
    return {
      "@context": "Notation",
      
      english: "",
      
      katakana: "",
      hiragana: "",
      kanji: "",
      kana: "",
      japanese: ""
    };
  }
  
  /**
   * @see https://www.hellowork.go.jp/info/job_dictionary.html
   */
  schema.JapanOccupation = function(){
    return {
      //
    };
  }
  
  schema.Commute = function(){
    return {
      time: {},//Time
      timing: {},//Timing
      pay: {}//Pay
    };
  }
  
  schema.Timing = function(){
    return {
      start: {},//TimingPreferences
      end: {},//TimingPreferences
      days: {},//WeekDays
      length: {
        unit: "day"
      }
    };
  }
  
  schema.Pay = function(){
    return {
      timed: false,//PayConditions
      fixed: false//PayConditions
    };
  }
  
  schema.PayConditions = function(){
    return {
      unit: "hour",
      minValue: 0,
      remote: {
        enabled: false,
        commuteCostSeparate: false,
        payCommuteTime: false
      },
      minDuration: {
        hours: 0
      },
      maxWeekDuration: {
        days: 0
      }
    };
  }
  
  schema.TimingPreferences = function(){
    return {
      immediate: false,
      anytime: false
    };
  }
  
  schema.WeekDays = function(){
    return {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    };
  }
  
  schema.Status = function(){
    return {
      createdDate: "",
      modifiedDate: ""
    };
  }

  schema.PersonalInfo = function(){
   return {
      name: null,
      sex: "",
      "@birthDate": "Time",
      "@birthPlace": "Location",
      nativeLanguage: "",
      nativeCountry: "",
      website: "",
      married: false,
      children: 0,
      dependencies: {
        spouse: false,
        children: 0,
        other: 0
      }
    };
  }

  /**
   * ??Unify with date-helper project
   */
  schema.Time = function(){
    return {
      string: "",
      year: null,
      month: null,
      day: null,
      hours: null,
      mins: null,
      seconds: null,
      time: null
    };
  }
  
  schema.TimeRange = function(){
    return {
      "@from": "Time",
      "@to": "Time"
    };
  }
  
  schema.PersonalName = function(){
    return {
      firstName: "",
      familyName: "",
      middleName: "",
      otherNames: []
    };
  }

  schema.Contact = function(){
    return {
      "@physicalAddress": "Location",//Should duplicate from Location
      emailAddress: {
        home: "",
        work: "",
        mobile: ""
      },
      phoneNumber: {
        home: "",
        work: "",
        mobile: ""
      },
      skype: {
        username: ""
      },
      line: {
        username: ""
      },
      facebook: {
        username: ""
      },
      twitter: {
        username: ""
      }
    };
  }
  
  schema.PostalAddress = function(){
    return {
      "@context": "Address",
      "@name": "Name"
    };
  }
  
  schema.Location = function(){
    return {
      coords: {
        latitude: "",
        longitude: ""
      },
      "@address": "Address"
    };
  }

  /**
   * Location that can be displayed via text. May differ with language.
   */
  schema.Address = function(){
    return {
      address: "",
      country: "",
      state: "",
      town: "",
      subTownOne: "",
      subTownTwo: "",
      detailsOne: "",
      detailsTwo: "",
      detailsThree: "",
      zipCode: ""
    };
  }
  
  /**
   * 
   * Can hold any data.
   * 
   * Allowed formats
   * 1. ISO language code
   * https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
   * 2. ISO language name
   * 3. Script name(Example: katakana")
   */
  schema.Notation = function(){
    return {
      //
    };
  }
  
  schema.Portfolio = function(){
    return {
      works: []
    };
  }

  schema.PortfolioWork = function(){
    return {
      title: "",
      info: "",
      "@range": "TimeRange",
      website: ""
    };
  }

  schema.Work = function(){
    return {
      "@context": "CommonHistory",
      "contract": "",
      "hours": "",
      "@contractedCompany": "Company",
      "@employedCompany": "Company",
      "@stationedCompany": "Company"
    };
  }
  
  schema.Company = function(){
    return {
      "@context": "Business",
      type: "",
      shares: []//@stockShare
    };
  }
  
  schema.Business = function(){
    return {
      name: "",
      url: "",
      "@address": "Address",
      founder: ""
    };
  }
  
  schema.StockShare = function(){
    return {
      name: "",
      amount: ""
    };
  }

  schema.Education = function(){
    return {
      "@context": "CommonHistory",
      status: ""
    };
  }

  schema.Qualifications = function(){
    return {
      "@context": "CommonHistory"
    };
  }

  schema.CommonHistory = function(){
    return {
      items: []
    };
  }

  schema.CommonHistoryItem = function(){
    return {
      "@range": "TimeRange",
      title: "",
      info: "",
      details: [],
      "@location": "Location"
    };
  }

  schema.Skills = function(){
    return skills = {
      skills: []
    };
  }

  schema.Skill = function(){
    return {
      name: "",
      "@time": "Time"
    };
  }

  schema.Preferences = function(){
    return {
      desire: "",
      desiredWork: [],
      requests: "",
      contract: [],
      "@commute": "Commute",
      "@timing": "Timing",
      "@pay": "Pay",
      keywords: []
    };
  }

  schema.Pay = function(){
    return {
      //
    };
  }

  schema.Hobby = function(){
    return {
      hobbies: {
          //
      }
    };
  }

  schema.Templates = function(){
    return {
      format: "camelCase",
      list: []
    };
  }

  schema.Media = function(){
    return {
      "@images": "Images",
    };
  }

  schema.Image = function(){
    return {
      src: "",
      data: null,
      dimensions: {
        width: null,
        height: null
      }
    };
  }

  schema.Images = function(){
    return {
      images: []
    };
  }
  
  schema.Application = function(){
    return {
      requests: "",
      applicationReason: "",
      "@commute": "Commute"
    };
  }
  
  schema.JobSite = function(){
    return {
      name: "",
      description: "",
      image: "",
      url: "",
    };
  }
    
  return schema;
}
if(typeof module === 'object'){
  module.exports = Schema;
}