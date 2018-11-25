export function loadProfiles(callback) {

    const query = `query {allProfiles {interests, name, age, job, education, lookingFor, parent, id}}`;

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

