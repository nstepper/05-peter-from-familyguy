// click event for the save button
$(".saveBtn").on("click", function () {
  // Get the user input
  var description = $(this).siblings(".description").val().trim();

  if (description) {
    // Get the id of the user input textarea
    var id = $(this).siblings(".description").attr("id"); 
    // Save the user input in local storage
    localStorage.setItem(id, description);
  }
 
});

// Apply the past, present, or future class to each time block
function updateHourClasses() {
  var currentHour = dayjs().hour(); // Get the current hour in 24-hour time
  $(".time-block").each(function () {
    var hour = parseInt($(this).attr("id").split("-")[1]);
    if (hour < currentHour) {
      $(this).removeClass("present future").addClass("past");
    } else if (hour === currentHour) {
      $(this).removeClass("past future").addClass("present");
    } else {
      $(this).removeClass("past present").addClass("future");
    }
  });
}

// Get any user input that was saved in localStorage and set the values of
// the corresponding textarea elements
function loadSavedData() {
  $(".time-block").each(function () {
    var id = $(this).attr("id");
    var description = localStorage.getItem(id);
    if (description) {
      $(this).find(".description").val(description);
    }
  });
}

// Display the current date in the header of the page
$("#currentDay").text(dayjs().format("dddd, MMMM D"));

// Call the updateHourClasses and loadSavedData functions
updateHourClasses();
loadSavedData();

// Update the hour classes every minute
setInterval(updateHourClasses, 60000);
