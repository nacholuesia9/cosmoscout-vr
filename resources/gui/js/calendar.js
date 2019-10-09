var calenderVisible = false;
let newCenterTimeId = 0;
let newStartDateId = 1;
let newEndDateId = 2;
var state;

// Sets the visebilety of the caledar to the given value(true or false)
function set_visible(visible) {
    if (visible) {
        $('#calendar').addClass('visible');
    }
    else {
        $('#calendar').removeClass('visible');
    }
}

// Toggles the Visibility
function toggle_visible() {
    if(calenderVisible) {
        calenderVisible = false;
        set_visible(false);
    } else {
        calenderVisible = true;
        set_visible(true);
    }
}

// Called if the Calendar is used to change the date
function enterNewCenterTime() {
    $('#calendar').datepicker('update', timeline.getCustomTime(timeId));
    if(calenderVisible && state == newCenterTimeId) {
        toggle_visible();
    } else if(!calenderVisible) {
        state = newCenterTimeId;
        toggle_visible();
    }
}


// Called if the Calendar is used to enter a start date of an event
function enterStartDate() {
    if(state == newStartDateId) {
        toggle_visible();
    }else {
        state = newStartDateId;
        calenderVisible = true;
        set_visible(true);
    }
}


// Called if the Calendar is used to enter the end date of an event
function enterEndDate() {
    if(state == newEndDateId) {
        toggle_visible();
    }else {
        state = newEndDateId;
        calenderVisible = true;
        set_visible(true);
    }

}

// Called if an Date in the Calendar is picked
function changeDateCallback(e) {
    toggle_visible();
    switch(state) {
        case newCenterTimeId:
            setTimeToDate(e.date);
          break;
        case newStartDateId:
            document.getElementById("eventStartDate").value = e.format();
          break;
        case newEndDateId:
            document.getElementById("eventEndDate").value = e.format();
          break; 
        default:
          // code block
      } 

}

// entry point ---------------------------------------------------------
$(document).ready(function () {
    $('#calendar').datepicker({
        weekStart: 1,
        todayHighlight: true,
        maxViewMode: 3,
        format: "yyyy-mm-dd",
        startDate: "1950-01-02",
        endDate: "2049-12-31",
    }).on("changeDate", changeDateCallback);
});

document.getElementById("btnCalendar").onclick = enterNewCenterTime;
document.getElementById("dateLabel").onclick = enterNewCenterTime;