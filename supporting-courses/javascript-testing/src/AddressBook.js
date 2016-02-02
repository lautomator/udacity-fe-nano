AddressBook = function() {
    // properties of an address book
    this.contacts = [];
    this.initialComplete = false;

};

AddressBook.prototype.getInitialContacts = function(cb) {
    var self = this;

    // there would be an ajax request here
    // .fail() could be used from jQuery,
    // as opposed to this timeout.
    setTimeout(function() {
        self.initialComplete = true;
        if (cb) {
            return cb();
        }
    }, 3);
}

AddressBook.prototype.addContact = function(contact) {
    // adds a contact
    this.contacts.push(contact);
};

AddressBook.prototype.getContact = function(index) {
    // returns a contact
    return this.contacts[index];
};

AddressBook.prototype.deleteContact = function(index) {
    // deletes a contact
    this.contacts.splice(index, 1);
};