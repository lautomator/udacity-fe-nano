repeatIt = function(s) {
    // takes a string
    // returns the string repeated <string> <string>
    if (typeof s !== 'string') {
        // check for the proper type
        return 'Please enter a string only.';
    } else {
        return s + ' ' + s;
    }
}

function memoize(func) {
    // cache to store previous calls
    var cache = {};

    return function() {
        // the key is each returned result
        var key = JSON.stringify(arguments);

        if(cache[key]) {
            // if the key exists, return it
            console.log('this already exists');

            return cache[key];
        } else {
            // this is a new entry; store it in
            // the cache and return it
            console.log('this is a new entry');

            var val = func.apply(this, arguments);
            cache[key] = val;

            return val;
        }
    };
}

var repeated = memoize(function(s) {
    // takes an argument
    console.log('working...');

    return repeatIt(s);
});

console.log(repeated('hello')); // working... this is a new entry [hello hello]
console.log(repeated('goodbye')); // working... this is a new entry [goodbye goodbye]
console.log(repeated('hello')); // this already exists [hello hello]