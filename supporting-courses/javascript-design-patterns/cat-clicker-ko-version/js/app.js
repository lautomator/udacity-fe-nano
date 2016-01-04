var initialCats = [
    {
        name:   'Alice',
        clickCount: 0,
        imgSrc: 'img/alice.jpg',
        imgAttribution: 'https://c2.staticflickr.com/6/5480/12139930183_86af1b262e_b.jpg',
        nicknames: ['poopoo', 'booby', 'kit-kat', 'booshy']
    },
    {
        name:   'Bam-Bam',
        clickCount: 0,
        imgSrc: 'img/bam-bam.jpg',
        imgAttribution: 'https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454',
        nicknames: ['hey', 'you', 'get', 'hello']
    },
    {
        name:   'Barney',
        clickCount: 0,
        imgSrc: 'img/barney.jpg',
        imgAttribution: 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496',
        nicknames: ['in', 'find', 'ten', 'when']
    },
    {
        name:   'Coco',
        clickCount: 0,
        imgSrc: 'img/coco.jpg',
        imgAttribution: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Cute_grey_kitten.jpg/1024px-Cute_grey_kitten.jpg',
        nicknames: ['you', 'bit', 'friend', 'ten']
    },
    {
        name:   'Dino',
        clickCount: 0,
        imgSrc: 'img/dino.jpg',
        imgAttribution: 'https://lh3.ggpht.com/cesD31eroFxIZ4IEeXPAJkx_8i5-haU3P9LQosGNfV-GfAPUh2bE4iw4zV6Mc9XobWOR70BQh2JAP57wZlM=s0#w=640&h=480',
        nicknames: ['all', 'is', 'when', 'hello']
    },
    {
        name:   'Pebbles',
        clickCount: 0,
        imgSrc: 'img/pebbles.jpg',
        imgAttribution: 'https://lh4.ggpht.com/dUJNejPqb_qLsV1kfWcvviqc7adxsw02BSAm8YLWNklP4lI6fQCLKXd-28uKuchtjoEUpqFN0K6kkTSDHw=s0#w=588&h=640',
        nicknames: ['shooshy', 'pushy', 'mushy', 'zen']
    },
    {
        name:   'Wilma',
        clickCount: 0,
        imgSrc: 'img/wilma.jpg',
        imgAttribution: 'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426',
        nicknames: ['last', 'jazz', 'man', 'tan']
    }
];

var Cat = function(data) {

    this.clickCount = ko.observable(data.clickCount); // initial click count
    this.name = ko.observable(data.name); // cat name
    this.nicknames = ko.observableArray(data.nicknames); // cat nicknames
    this.imgSrc = ko.observable(data.imgSrc); // path to the image
    this.imgAttribution = ko.observable(data.imgAttribution);

    this.catLevel = ko.computed(function() {
        // returns the cat level based on the number of clicks
        if (this.clickCount() < 10) {
            return 'newborn';
        } else if (this.clickCount() >= 10 && this.clickCount() < 20) {
            return 'infant';
        } else if (this.clickCount() >= 20 && this.clickCount() < 30) {
            return 'teen';
        } else if (this.clickCount() >= 30 && this.clickCount() < 40) {
            return 'adult';
        // this could go on and on ...
        } else {
            return 'zen master';
        }
    }, this);
};


var ViewModel = function() {

    var self = this;

    this.catList = ko.observableArray([]);

    // add the cats from data into the list
    initialCats.forEach(function(catItem) {
        self.catList.push( new Cat(catItem) );
    });

    this.currentCat = ko.observable(this.catList()[0]);

    this.getCat = function(data) {
        // returns the index of the chosen cat
        var pos = self.catList.indexOf(data);

        console.log('clicked: ' + pos);
    };

    this.incrementCounter = function() {
        // adds one to the click count
        this.clickCount(this.clickCount() + 1);
    };


};


ko.applyBindings(new ViewModel());
