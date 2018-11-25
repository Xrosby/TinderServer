const express = require('express');
const $ = require('jQuery')
const express_graphql = require('express-graphql');
const {buildSchema} = require('graphql');
const fs = require('fs')

let schema = buildSchema(`
    type Query {
    profile(id: Int!): Profile
    interests(interests: [String]): [Profile]
    youngerThan(age: Int!): [Profile]
    },
    type Profile {
    id: Int!
    name: String!
    age: Int!
    job: String
    education: String
    interests: [String]
    lookingFor: [String]
    parent: Boolean
    }
    `)


let profileRawData = fs.readFileSync('profiles.json');
let profileData = JSON.parse(profileRawData).profiles;

let getProfile = function (args) {
    let id = args.id;
    return profileData.filter(profile => {
        return profile.id == id;
    })[0];
}


function containsInterests(interests, profileInterests) {
   return interests.every((val) => profileInterests.includes(val))
}

let youngerThan =  function(age, profileAge){
    return profileAge < age
}

let olderThan = function(age, profileAge) {
    return profileAge > age
}

let getProfilesYoungerThan = function(args) {
    let age = args.age;
    let matchingProfiles = [];
    for(let profile of profileData) {
        if(youngerThan(age, profile.age)) {
            matchingProfiles.push(profile)
        }
    }
    return matchingProfiles;
}

let getProfilesOlderThan = function(args) {
    let age = args.age;
    let matchingProfiles = [];
    for(let profile of profileData) {
        if(olderThan(age, profile.age)) {
            matchingProfiles.push(profile)
        }
    }
    return matchingProfiles;
}

let getProfilesByInterests = function (args) {
    let matchingProfiles = []
    let interests = args.interests;
    for (let profile of profileData) {
        if (containsInterests(interests, profile.interests))
            matchingProfiles.push(profile)
    }
    return matchingProfiles
}




let root = {
    profile: getProfile,
    interests: getProfilesByInterests,
    youngerThan: getProfilesYoungerThan
}

let app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));



