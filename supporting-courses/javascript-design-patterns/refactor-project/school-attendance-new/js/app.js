var udacityAttendanceApp = function(targets) {

    // model
    var data = {
        // app data
        days: 12,
        students: [
            {
                name:   'Slappy the Frog',
                attendance: []
            },
            {
                name:   'Lilly the Lizard',
                attendance: []
            },
            {
                name:   'Paulrus the Walrus',
                attendance: []
            },
            {
                name:   'Gregory the Goat',
                attendance: []
            },
            {
                name:   'Adam the Anaconda',
                attendance: []
            }
        ],
        update: function(student, session, value) {
            // updates the attendance array
            data.students[student].attendance[session] = value;
        }
    };

    // controller
    var app = {
        getData: function() {
            // get the data from the model
            return data;
        },
        getRandom: function() {
            // returns true or false
            return (Math.random() >= 0.5);
        },
        createRecords: function() {
            // default records created when page is loaded
            var attendance = {},
                data = this.getData(),
                students = data.students,
                studentsLength = data.students.length,
                totalDays = data.days,
                index = 0,
                classes;

            // create a random matrix of days missed
            // based on the number of days from the data model
            while (index < studentsLength) {
                // push true or false values to each name array, resp.
                for (classes = 0; classes < totalDays; classes += 1) {
                    students[index].attendance.push(this.getRandom());
                }

                index += 1;
            }
        },
        attendanceCount: function(student) {
            // takes in the student index ->
            // returns the number of false values
            // from the attendance array
            var data = this.getData(),
                student = data.students[student],
                attendance = student.attendance,
                days = data.days,
                missed = 0,
                index = 0;

            // count the attendance for the student passed in
            while (index < days) {
                if (attendance[index] === false) {
                    missed += 1;
                }

                index += 1;
            }

            return missed;
        },
        attendanceUpdate: function(student, button, value) {
            // updates the attendance array
            // for the selected student, button,
            // and value (checked or unchecked)

            // update the data
            data.update(student, button, value);
        },
        init: function() {
            // create some records
            this.createRecords();

            // render the view layer
            view.init();
        }
    };

    // view
    var view = {
        context: function() {
            // get the data and templates
            var allData = app.getData(),
                context = {
                    days: allData.days,
                    students: allData.students,
                    headTemplate: targets.attendanceHeader,
                    bodyTemplate: targets.attendanceStudent,
                    checkBoxes: targets.attendanceCheckBox
                };

            return context;
        },
        render: function() {
            var context = this.context(),
                totalDays = context.days,
                students = context.students,
                totalStudents = context.students.length,
                tableHead = $(context.headTemplate).html(),
                tableBody = $(context.bodyTemplate).html(),
                checkBox = $(context.checkBoxes).html(),
                tableHeadHtml,
                tableBodyHtml,
                attendance,
                missed,
                missedUpdate,
                day = 1,
                index = 0,
                i, j;

            // build and render the template for the table header (cols)
            while (day <= totalDays) {

                // render the template header with the data
                tableHeadHtml = tableHead.replace('%classNumber%', day);

                $('#days-missed-header').before(tableHeadHtml);

                day += 1;
            }

            // build and render the template for the table body (rows)
            while (index < totalStudents) {
                missed = app.attendanceCount(index),
                attendance = students[index].attendance;

                // render the template body with the data
                tableBodyHtml = tableBody.replace('%studentName%',
                    students[index].name).replace('%missedNumber%',
                    missed).replace(/%studentId%/g, index);

                // render the name of the student,
                $('#tableContent').append(tableBodyHtml);

                // render the class sessions checkboxes,
                for (i = attendance.length - 1; i >= 0; i -= 1) {
                    // render the check boxes
                    if (attendance[i] === true) {
                        // a class was attended
                        $('.student-' + index).after(checkBox.replace('%status%',
                            'checked').replace('%studentId%',
                            index).replace('%session%', i));
                    } else {
                        // a class was missed
                        $('.student-' + index).after(checkBox.replace('%status%',
                         '').replace('%studentId%',
                            index).replace('%session%', i));
                    }
                }

                // listen for checkbox
                for (j = 0; j <= attendance.length; j += 1) {

                    // listen for check check box value
                    $('#' + index + '-' + j).click(function(index, j) {

                        // returns the id info of the button that was clicked
                        return function() {
                            selectedBox = $('#' + index + '-' + j);
                            if (selectedBox.is(':checked')) {
                                // the checkbox was checked
                                // update the records
                                app.attendanceUpdate(index, j, true);
                                // update the view
                                $('#missed-' + index).text(app.attendanceCount(index));
                            } else {
                                // the checkbox was unchecked
                                // update the records
                                app.attendanceUpdate(index, j, false);
                                // update the view
                                $('#missed-' + index).text(app.attendanceCount(index));
                            }
                        }
                    }(index, j));
                }

                index += 1;
            }
        },
        init: function() {
            // render the view
            this.render();
        }
    }

    app.init();

}; // udacityAttendanceApp app ends