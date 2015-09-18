// toggleClass() and next()
selectedItem = $('.selected');

selectedItem.toggleClass('selected');

// target the next element and add the 'selected' class
selectedItem.next().toggleClass('selected');


//.attr()
// you can target an attribute to get its value
// or assign a value to an attribute
buttons = $('.box-buttons');
selectedButton = buttons.children();
first = selectedButton.first();
console.log(first.attr('href', "#a"));

