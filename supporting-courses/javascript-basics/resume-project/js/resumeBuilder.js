var name = 'John Merigliano',
    role = 'Web Developer',
    formattedName = HTMLheaderName.replace('%data%', name),
    formattedRole = HTMLheaderRole.replace('%data%', role);

$("#header").prepend(formattedRole);
$("#header").prepend(formattedName);


// convert 'audacity' to 'Udacity'
var audacity = 'audacity',
    udacity = audacity.slice(1);

// print and convert to title case
console.log(udacity.replace('u', 'U'));

console.log('yomamma!');
