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
    "jobs": [
        {
            "title": "job pos 1",
            "employer": "company Fred",
            "years": "January 2015 -",
            "location": "city, state",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eros mauris, dictum ut mi eu, faucibus fringilla velit. Ut ac metus eleifend, vulputate arcu et, ultrices est. Sed sodales et lacus vel imperdiet. Suspendisse mollis felis quis cursus posuere. Etiam eget sapien metus. Nunc cursus porta accumsan. Ut pulvinar quis lectus vel condimentum. Mauris tempor eleifend tristique."
        },
        {
            "title": "job pos 2",
            "employer": "company Wilma",
            "years": "Date 2015 - Date 2015",
            "location": "city, state",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eros mauris, dictum ut mi eu, faucibus fringilla velit. Ut ac metus eleifend, vulputate arcu et, ultrices est. Sed sodales et lacus vel imperdiet. Suspendisse mollis felis quis cursus posuere. Etiam eget sapien metus. Nunc cursus porta accumsan. Ut pulvinar quis lectus vel condimentum. Mauris tempor eleifend tristique."
        },
        {
            "title": "job pos 3",
            "employer": "company Bam Bam",
            "years": "Date 2015 - Date 2015",
            "location": "city, state",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eros mauris, dictum ut mi eu, faucibus fringilla velit. Ut ac metus eleifend, vulputate arcu et, ultrices est. Sed sodales et lacus vel imperdiet. Suspendisse mollis felis quis cursus posuere. Etiam eget sapien metus. Nunc cursus porta accumsan. Ut pulvinar quis lectus vel condimentum. Mauris tempor eleifend tristique."
        }
    ]
}

var projects = {
    "project": [
        {
            "name": "Project Name 1",
            "year": "2015",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eros mauris, dictum ut mi eu, faucibus fringilla velit. Ut ac metus eleifend, vulputate arcu et, ultrices est. Sed sodales et lacus vel imperdiet. Suspendisse mollis felis quis cursus posuere. Etiam eget sapien metus. Nunc cursus porta accumsan. Ut pulvinar quis lectus vel condimentum. Mauris tempor eleifend tristique."
        },
        {
            "name": "Project Name 2",
            "year": "2015",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eros mauris, dictum ut mi eu, faucibus fringilla velit. Ut ac metus eleifend, vulputate arcu et, ultrices est. Sed sodales et lacus vel imperdiet. Suspendisse mollis felis quis cursus posuere. Etiam eget sapien metus. Nunc cursus porta accumsan. Ut pulvinar quis lectus vel condimentum. Mauris tempor eleifend tristique."
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

// name header
$("#header").prepend(formattedRole);
$("#header").prepend(formattedName);

// contact info
$("#topContacts").append(formattedMobile);
$("#topContacts").append(formattedEmail);
$("#topContacts").append(formattedGit);
$("#topContacts").append(formattedTwitter);
$("#topContacts").append(formattedLocation);

// pic and message
$("#topContacts").append(formattedBioPic);
$("#topContacts").append(formattedBioMsg);

// skills (optional)
if (bio.skills && bio.skills != '') {
    // the skills header
    $("#header").append(HTMLskillsStart);

    for (item in bio.skills) {
        // the skills
        $("#skills").append(HTMLskills.replace('%data%', bio.skills[item]));
    }
}

// work experience
function displayWork() {
    for (item in work.jobs) {
        $("#workExperience").append(HTMLworkStart);
        // employer and title
        $(".work-entry:last").append(HTMLworkEmployer.replace('%data%', work.jobs[item].employer) +
            HTMLworkTitle.replace('%data%', work.jobs[item].title));
        // years
        $(".work-entry:last").append(HTMLworkDates.replace('%data%', work.jobs[item].years));
        // location
        $(".work-entry:last").append(HTMLworkLocation.replace('%data%', work.jobs[item].location));
        // description
        $(".work-entry:last").append(HTMLworkDescription.replace('%data%', work.jobs[item].description));
    }
}

// the internationalize button
$("#main").append(internationalizeButton);

// procedure to make the first name title case
// and the last name CAPS
function inName() {
    var usName = bio.name,
        fName = usName.split(' ')[0],
        lName = usName.split(' ')[1];

    // Ensure first name is title case
    fName = fName[0].toUpperCase() + fName.substring(1);

    // Make last name CAPS
    lName = lName.toUpperCase();

    var newName = fName + ' ' + lName;

    return newName;
}

// display the projects
projects.display = function() {
    for (item in projects.project) {
        $("#projects").append(HTMLprojectStart);
        $(".project-entry:last").append(HTMLprojectTitle.replace('%data%', projects.project[item].name));
        $(".project-entry:last").append(HTMLprojectDates.replace('%data%', projects.project[item].year));
        $(".project-entry:last").append(HTMLprojectDescription.replace('%data%', projects.project[item].description));
    }
}

// add the map
// $("#mapDiv").append(googleMap);

// function calls
displayWork();
projects.display();
