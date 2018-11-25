export function loadProfiles(callback) {

    const query = `query {allProfiles {interests, name}}`;

    fetch('http://localhost:4000/graphql',
        {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                'Accept': 'application/json'
            },
            body: JSON.stringify({query})
        }).then(result => result.json())
        .then(data => callback(data));

}


function mockProfiles() {
    let profiles = [];

    let profile = {
        id: 1,
        name: "Cecilie-Marie",
        age: 22,
        job: "",
        education: "Ernæring og Sundhed",
        interests: ["Sang"],
        lookingFor: ["Forhold"],
        parent: false
    }

    profiles.push(profile);
    return profiles;
}