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

// ---------------------
// Pseudocode to meet expectations

// at first page load, display only the first ten students
//  pass students to an array 
//  call function hideStudents() at paginationLinkIndex 1 to hide students from 11 to the end of the array (array.length-1)

// function hideStudents(paginationLinkIndex, studentArray):
//  determine start of index in array:
//      start of index = (pagination link index * 10) - 10)
//      end of index = (pagination link index * 10) - 1) OR if this is the last page, array.length-1
//  check if pagination link index is at 0 (thus at the start of the list); if not, hide
//  all student-items from index 0 to start of index - 1 (thus just before the list to display)
//  show all student-items from start of index to end of index
//  check if this is the last page by checking whether there is a student-item following end of index (thus end of index + 1)
//  if this is not the last page, hide all student-items after the index to end of array

// function to dynamically create pagination HTML to display buttons
//  (takes an argument pageLinkIndex to determine active page link index)
//  (takes an argument array length to determine how many buttons is needed)
//  if there is an old div with class pagination, remove this from the page 
//  use a variable htmlString to build up HTML to add to DOM
//  create a div with class="pagination" and a <ul> element
//  cycle through (length of array / 10) times adding <li> elements AND if there is a remainder (use %) one extra time
//  close </ul> and div
//  append htmlString to correct place in DOM
//  add a class of "active" to the button of the nth index in the pagination buttons

// if link is clicked, reload students, this time with new multiple of 10
// (e.g. if link 2 is clicked, display students 11-20)

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

    for (let i = indexStartPos; i >= indexEndPos; i++) {
        $(array[i]).show();
    }

    // if the last index to be displayed is not at the end of the students array, hide those student-items that follows
    if (!(indexEndPos === array.length - 1)) {
        for (let i = indexEndPos + 1; i < array.length; i++) {
            $(array[i]).hide();
        }
        console.log('running');
    }
}

function createPaginationButtons(paginationLinkIndex, arrayLength) {
    // if there is an old div with class pagination, remove this from the page 
    if ($('.pagination')) { $('.pagination').remove(); }

    let htmlString = '<div class="pagination"><ul>';
    let numButtons = (arrayLength / 10);
    if (arrayLength % 10 > 0) numButtons++; // to account for the final page, if there are more students than a multiple of ten 
    for (let i = 1; i <= numButtons; i++) {
        htmlString += '<li><a ';
        if (paginationLinkIndex === i) { htmlString += 'class="active" '; }
        htmlString += 'href="#">' + i + '</a></li>';
    }
    htmlString += '</ul></div>';

    // append to the page
    $('.page').append(htmlString);
}

// function to dynamically create pagination HTML to display buttons
//  (takes an argument pageLinkIndex to determine active page link index)
//  (takes an argument array length to determine how many buttons is needed)
//  if there is an old div with class pagination, remove this from the page 
//  use a variable htmlString to build up HTML to add to DOM
//  create a div with class="pagination" and a <ul> element
//  cycle through (length of array / 10) times AND if there is a remainder (use %) one extra time
//  close </ul> and div
//  append htmlString to correct place in DOM
//  add a class of "active" to the button of the nth index in the pagination buttons

// at first page load, display only the first ten students
hideStudents(1, studentsArray);
// at first page load, display pagination buttons with first button active
createPaginationButtons(1, studentsArray.length);