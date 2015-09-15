var bio = {
    "name": "John Merigliano",
    "role": "Web Developer",
    "contacts": {
        "mobile": "215.360.9523",
        "email": "jmerigliano@gmail.com",
        "github": "https://github.com/lautomator/",
        "twitter": "@JMerigliano",
        "location": "Philadelphia, PA"
    },
    "bioPic": "https://dl.dropboxusercontent.com/u/54256847/MJ4_4983.jpg",
    "welcomeMsg": "Welcome. Please see my resume to see all of my web development skills. Thanks for visiting",
    "skills": [
        "awesomeness",
        "programming",
        "teaching",
        "js"
    ]
}

var work = {
    "position": [
        {
            "title": "job pos",
            "employer": "company name",
            "years": 3,
            "city": "com city",
            "state": "PA"
        },
        {
            "title": "job pos",
            "employer": "company name",
            "years": 3,
            "city": "com city",
            "state": "PA"
        },
        {
            "title": "job pos",
            "employer": "company name",
            "years": 3,
            "city": "com city",
            "state": "PA"
        }
    ]
}

var projects = {
    "project": [
        {
            "name": "Project Name",
            "client": "client name",
            "city": "com city",
            "state": "PA",
            "description": "Some blurb about the project"
        },
        {
            "name": "Project Name",
            "client": "client name",
            "city": "com city",
            "state": "PA",
            "description": "Some blurb about the project"
        }
    ]

}

var education = {
    "school": [
        {
            "name": "The University of the Arts",
            "years": 3,
            "city": "Philadelphia, PA",
            "major": "Art Education",
            "graduationDate": 2000
        },
        {
            "name": "Purchase College SUNY",
            "years": 3,
            "city": "Purchase, NY",
            "major": "Philosophy",
            "graduationDate": 1993
        }
    ]
}

var formattedName = HTMLheaderName.replace('%data%', bio.name),
    formattedRole = HTMLheaderRole.replace('%data%', bio.role),
    formattedMobile = HTMLmobile.replace('%data%', bio.contacts.mobile),
    formattedEmail = HTMLemail.replace('%data%', bio.contacts.email),
    formattedGit = HTMLgithub.replace('%data%', bio.contacts.github),
    formattedTwitter = HTMLtwitter.replace('%data%', bio.contacts.twitter),
    formattedLocation = HTMLlocation.replace('%data%', bio.contacts.location),
    formattedBioPic = HTMLbioPic.replace('%data%', bio.bioPic),
    formattedBioMsg = HTMLwelcomeMsg.replace('%data%', bio.welcomeMsg);


$("#header").prepend(formattedRole);
$("#header").prepend(formattedName);
$("#topContacts").append(formattedMobile);
$("#topContacts").append(formattedEmail);
$("#topContacts").append(formattedGit);
$("#topContacts").append(formattedTwitter);
$("#topContacts").append(formattedLocation);
$("#topContacts").append(formattedBioPic);
$("#topContacts").append(formattedBioMsg);

if (bio.skills && bio.skills != '') {
    // the skills header
    $("#header").append(HTMLskillsStart);

    for (var i = 0; i < bio.skills.length; i++) {
        // the skills
        $("#topContacts").append(HTMLskills.replace('%data%', bio.skills[i]));
    }

}

