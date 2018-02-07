// Treehouse Techdegree Project 2: Pagination & Content 

// This is the second project in the Treehouse Techdegree program. It is a pagination 
// and content filter: given a list of students of any size, the page displays the 
// students in lists of 10. Links to the next 10 students, etc., are displayed at the 
// bottom of the page. The JavaScript calculates the necessary number of links and makes 
// sure that the correct 10 students are displayed.

// For extra credit, a search function has been added. 

// The project makes use of progressive enhancement / unobtrusive Javascript techniques 
// to make sure the correct info is displayed even if JavaScript is turned off in the browser.
// 
// The project also makes use of jQuery.

// construct an array of all the students in the list
const studentsArray = document.getElementsByClassName('student-item');

function hideAllStudents() {
    for (let i = 0; i < studentsArray.length; i++) {
        $(studentsArray[i]).hide();
    }
}

// paginationLinkIndex for first ten students = 1
// this will result in index 0-9 being shown, etc.
function displayStudents(paginationLinkIndex, array) {

    hideAllStudents();

    let indexStartPos = ((paginationLinkIndex * 10) - 10);
    let indexEndPos = ((paginationLinkIndex * 10) - 1);
    // if the indexEndPos is > than the end of the array, set the end position at the last index point of the array
    if (indexEndPos > array.length - 1) { indexEndPos = array.length - 1; }

    // show the students that are in scope
    for (let i = indexStartPos; i <= indexEndPos; i++) {
        $(array[i]).show();
    }
}

// create the pagination buttons and assign event handlers to them
function createPaginationButtons(paginationLinkIndex, array) {

    // if there is an old div with class pagination, remove this from the page 
    if ($('.pagination')) { $('.pagination').remove(); }

    // build an HTML string to add to the DOM with the pagination markup
    let htmlString = '<div class="pagination"><ul>';
    let numButtons = (array.length / 10);
    if (array.length % 10 > 0) numButtons++; // to account for the final page, if there are more students than a multiple of ten 
    for (let i = 1; i <= numButtons; i++) {
        htmlString += '<li><a ';
        if (paginationLinkIndex === i) { htmlString += 'class="active" '; }
        htmlString += 'href="#">' + i + '</a></li>';
    }
    htmlString += '</ul></div>';

    // append HTML string to the page
    $('.page').append(htmlString);

    // add an event handler to the "pagination" div to handle all events on "a" tags
    $('.pagination').on("click", "a", function(event) {
        // determine which button was pressed
        let buttonPressed = $(event.target).parent().index() + 1;
        // reload the information on the page with the scope of the new button
        displayStudents(buttonPressed, array);
        createPaginationButtons(buttonPressed, array);
    });

    // if there are less than 10 results, remove the pagination links 
    if (array.length <= 10) {
        $('.pagination').remove();
    }
}

// create a search box at the top of the page, as the last element in the 
// "page-header" class
function createSearchBox() {
    let htmlString = '<div class="student-search"><input placeholder="Search for student..."><button>Search</button></div>';
    $('.page-header').append(htmlString);

    // attach event handler to search box
    $('.student-search button').on('click', (event) => {
        // retrieve the search string input by user
        // make sure that the string is in lower case to match student names
        const searchStr = $('.student-search input').val().toLowerCase();

        // build a new array with only the students that match the search string
        // by looping through the studentsArray 
        let searchArray = [];
        for (let i = 0; i < studentsArray.length; i++) {
            // note that the student name is contained in h3
            let studentName = $(studentsArray[i]).find('h3').text();

            // if the search string appears in student name 
            // add this element to the searchArray
            if (studentName.indexOf(searchStr) >= 0) {
                searchArray.push(studentsArray[i]);
            }
        }

        // now reload the information in the page with the new array with selected students
        displayStudents(1, searchArray);
        createPaginationButtons(1, searchArray);

        // if there were no search results, display a message instead of students
        if (searchArray.length === 0) {
            $('.page').append('<h3>No students found ... please try a different search</h3>');
        }

    });
}

// --------------------------
// ON PAGE LOAD
// at first page load, display only the first ten students
displayStudents(1, studentsArray);
// at first page load, display pagination buttons with first button active
createPaginationButtons(1, studentsArray);
createSearchBox();