var udacityAttendanceApp = function(targets) {

    // model
    var data = {
        // app data
        days: 12,
        students: [
            {
                name:   'Slappy the Frog',
                daysMissed: 0
            },
            {
                name:   'Lilly the Lizard',
                daysMissed: 0
            },
            {
                name:   'Paulrus the Walrus',
                daysMissed: 0
            },
            {
                name:   'Gregory the Goat',
                daysMissed: 0
            },
            {
                name:   'Adam the Anaconda',
                daysMissed: 0
            }
        ]
    };

    // controller
    var app = {
        getData: function() {
            // get the data from the model
            return data;
        },
        init: function() {
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
                day = 1,
                index = 0;

            // build and render the template for the table header (cols)
            while (day <= totalDays) {

                // render the template header with the data
                tableHeadHtml = tableHead.replace('%classNumber%', day);

                $('#days-missed-header').before(tableHeadHtml);

                day += 1;
            }

            // build and render the template for the table body (rows)
            while (index < totalStudents) {

                // render the template body with the data
                tableBodyHtml = tableBody.replace('%studentName%',
                    students[index].name).replace('%missedNumber%',
                    students[index].daysMissed).replace('%studentId%', index);

                // render the name of the student,
                $('#tableContent').append(tableBodyHtml);

                // render the class sessions checkboxes,
                for (var i = 1; i <= totalDays; i += 1) {
                    // render the check boxes
                    $('.student-' + index).after(checkBox);
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