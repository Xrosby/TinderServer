const express = require('express');
const express_graphql = require('express-graphql');
const {buildSchema} = require('graphql');
const fs = require('fs');
const uniqid = require('uniqid');
const cors = require('cors');


let schema = buildSchema(`
    type Query {
    allProfiles: [Profile]
    profile(id: Int!): Profile
    interests(interests: [String]): [Profile]
    youngerThan(age: Int!): [Profile]
    olderThan(age: Int!): [Profile]
    byJob(job: String!): [Profile]
    byEducation(education: String!): [Profile]
    jobs: [String]
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
    },
    type Mutation {
    createProfile(
    name: String!
    age: Int!
    job: String
    education: String
    interests: [String]!
    lookingFor: [String]!
    parent: Boolean!
    ): String
    }
    `)


let getData = function () {
    let profileRawData = fs.readFileSync('profiles.json');
    let profileData = JSON.parse(profileRawData);
    return profileData;
}

let getProfile = function (args) {
    let profileData = getData()
    let id = args.id;
    return profileData.filter(profile => {
        return profile.id == id;
    })[0];
}


function removeDuplicates(array) {
    let unqiueArray = array.filter(function (item, pos) {
        return array.indexOf(item) == pos;
    })
    return unqiueArray;
}

function getJobList() {
    let profileData = getData()
    let jobList = []
    for (let profile of profileData) {
        if (profile.job != '') {
            jobList.push(profile.job)
        }
    }
    let jobListUnique = removeDuplicates(jobList);
    return jobListUnique;
}


function containsInterests(interests, profileInterests) {
    return interests.every((val) => profileInterests.includes(val))
}

let youngerThan = function (age, profileAge) {
    return profileAge < age
}

let olderThan = function (age, profileAge) {
    return profileAge > age
}

let getProfilesYoungerThan = function (args) {
    let profileData = getData()
    let age = args.age;
    let matchingProfiles = [];
    for (let profile of profileData) {
        if (youngerThan(age, profile.age)) {
            matchingProfiles.push(profile)
        }
    }
    return matchingProfiles;
}

let getProfilesOlderThan = function (args) {
    let profileData = getData();
    let age = args.age;
    let matchingProfiles = [];
    for (let profile of profileData) {
        if (olderThan(age, profile.age)) {
            matchingProfiles.push(profile)
        }
    }
    return matchingProfiles;
}

let getProfilesByInterests = function (args) {
    let profileData = getData()
    let matchingProfiles = []
    let interests = args.interests;
    for (let profile of profileData) {
        if (containsInterests(interests, profile.interests))
            matchingProfiles.push(profile)
    }
    return matchingProfiles
}

let getProfilesByJob = function (args) {
    let profileData = getData()
    let matchingProfiles = []
    let job = args.job
    for (let profile of profileData) {
        if (profile.job == job) {
            matchingProfiles.push(profile)
        }
    }
    return matchingProfiles
}

let getProfilesByEducation = function (args) {
    let profileData = getData()
    let matchingProfiles = []
    let education = args.education;
    for (let profile of profileData) {
        if (profile.education == education) {
            matchingProfiles.push(profile)
        }
    }
    return matchingProfiles
}

let createAndSaveProfile = function (args) {
    let profile = {
        id: uniqid(),
        name: args.name,
        age: args.age,
        job: args.job,
        education: args.education,
        interests: args.interests,
        lookingFor: args.lookingFor,
        parent: args.parent
    }

    let profileData = getData();

    profileData.push(profile)
    fs.writeFileSync('profiles.json', JSON.stringify(profileData))

    return args.name + " has been saved"
}

let getAllProfiles = function(args) {
    return getData();
}


let root = {
    profile: getProfile,
    interests: getProfilesByInterests,
    youngerThan: getProfilesYoungerThan,
    olderThan: getProfilesOlderThan,
    byJob: getProfilesByJob,
    byEducation: getProfilesByEducation,
    jobs: getJobList,
    createProfile: createAndSaveProfile,
    allProfiles: getAllProfiles
}

let app = express();
app.use('/graphql',cors(), express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

//app.options('*', cors());
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));



