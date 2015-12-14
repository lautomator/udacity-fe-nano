// clear the screen for testing
document.body.innerHTML = '';

var cats = ['cat1', 'cat2', 'cat3'],
    clicks = 0;

// Let's loop over the numbers in our array
for (var i = 0; i < cats.length; i++) {

    // This is the number we're on...
    var num = cats[i];

    // We're creating a DOM element for the number
    var elem = document.createElement('div');
    elem.textContent = num;

    // ... and when we click, alert the value of `num`
    elem.addEventListener('click', (function(numCopy, clicks) {
        return function() {
            clicks += 1;
            console.log(numCopy, clicks);
        };
    })(num, clicks));

    document.body.appendChild(elem);
};