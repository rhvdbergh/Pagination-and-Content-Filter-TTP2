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

// make an array of all the students in the list
const studentsArray = document.getElementsByClassName('student-item');

// hide all students that are not within the display scope
// paginationLinkIndex for first ten students = 1
// this will result in index 0-9 being shown, etc.
function hideStudents(paginationLinkIndex, array) {
    let indexStartPos = ((paginationLinkIndex * 10) - 10);
    let indexEndPos = ((paginationLinkIndex * 10) - 1);
    // if the indexEndPos is > than the end of the array, set the end position at the last index point of the array
    if (indexEndPos > array.length - 1) { indexEndPos = array.length - 1; }

    // if the index to be displayed is not at the start of the list, hide all students before that point
    if (!(indexStartPos === 0)) {
        for (let i = 0; i < indexStartPos; i++) {
            $(array[i]).hide();
        }
    }

    // show the students that are in scope
    for (let i = indexStartPos; i <= indexEndPos; i++) {
        $(array[i]).show();
    }

    // if the last index to be displayed is not at the end of the students array, hide those student-items that follows
    if (!(indexEndPos === array.length - 1)) {
        for (let i = indexEndPos + 1; i < array.length; i++) {
            $(array[i]).hide();
        }
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

    // add event handlers to all the buttons
    // first, select all the newly created buttons
    let $paginationButtons = $('.pagination li');
    // add the event handlers to each button in the list 
    for (let i = 0; i <= numButtons - 1; i++) {
        $($paginationButtons[i]).on('click', (event) => {

            // determine number of button pressed
            let buttonPressed = $($paginationButtons[i]).index() + 1;
            hideStudents(buttonPressed, array);
            createPaginationButtons(buttonPressed, array);
        });
    }
}

// create a search box at the top of the page, as the last element in the 
// "page-header" class
function createSearchBox() {
    let htmlString = '<div class="student-search"><input placeholder="Search for student..."><button>Search</button></div>';
    $('.page-header').append(htmlString);
}

// at first page load, display only the first ten students
hideStudents(1, studentsArray);
// at first page load, display pagination buttons with first button active
createPaginationButtons(1, studentsArray);
createSearchBox();