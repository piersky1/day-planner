$(document).ready(function() {
  
    // Declare variable for test flag
    var test = false;
  
    // Get time from Moment.js library
    var now = moment().format('MMMM Do YYYY');
  
    var nowHour24 = moment().format('H');
    var nowHour12 = moment().format('h');
  
    // Set times for testng after hours
    if (test) {
      nowHour24 = 13;
      nowHour12 = 1;
    }
  
    var $dateHeading = $('#date-subheading');
    $dateHeading.text(now);
      
    // Get stored todos from localStorage
    // Parse JSON string to object
    var storedPlans = JSON.parse(localStorage.getItem("storedPlans"));
  
    if (test) { console.log(storedPlans); }
  
    // If plans retrieved from localStorage, update plan array
    if (storedPlans !== null) {
      planTextArr = storedPlans;
    } else {

      planTextArr = new Array(9);
      planTextArr[4] = "Picnic lunch outside";
    }
  
    if (test) { console.log("full array of plned text",planTextArr); }
  
    // Declare variable to reference planner element
    var $plannerDiv = $('#plannerContainer');
    // Clear existing elements
    $plannerDiv.empty();
  
    if (test) { console.log("current time",nowHour12); }
  
  
    // Build calendar by row for fix set of hours
    for (var hour = 9; hour <= 17; hour++) {
      // Index for array offset from hour
      var index = hour - 9;
      
      // Build row components
      var $rowDiv = $('<div>');
      $rowDiv.addClass('row');
      $rowDiv.addClass('plannerRow');
      $rowDiv.attr('hour-index',hour);
    
      // Start building Time box portion of row
      var $timeDiv = $('<div>');
      $timeDiv.addClass('col-md-2');
    
      // Create timeBox element (contains time)
      var $timeBoxSpan = $('<span>');
      // Can use this to get value
      $timeBoxSpan.attr('class','timeBox');
      
      // Format hours to AM or PM
      var displayHour = 0;
      var daynight = "";
      if (hour > 12) { 
        displayHour = hour - 12;
        daynight = "PM";
      } else {
        displayHour = hour;
        daynight = "AM";
      }
      
      // Populate timeBox with time
      $timeBoxSpan.text(`${displayHour} ${daynight}`);
  
      // Insert into column inset into timebox
      $rowDiv.append($timeDiv);
      $timeDiv.append($timeBoxSpan);
      // Stop building Time box part of row
  
      // Start building input part of row
      // Build row components
      var $dailyPlanSpan = $('<input>');
  
      $dailyPlanSpan.attr('id',`input-${index}`);
      $dailyPlanSpan.attr('hour-index',index);
      $dailyPlanSpan.attr('type','text');
      $dailyPlanSpan.attr('class','form-control');
      $dailyPlanSpan.attr('placeholder','Enter task here and then click save! Backspace and then save to delete.');
  
      // Access index from data array for hour 
      $dailyPlanSpan.val( planTextArr[index] );
      
      // Create column to control width
      var $inputDiv = $('<div>');
      $inputDiv.addClass('col-md-9');
  
      // Add column width and row component to row
      $rowDiv.append($inputDiv);
      $inputDiv.append($dailyPlanSpan);
      // Stop building Time box part of row
  
      // Start building save part of row
      var $col1SaveDiv = $('<div>');
      $col1SaveDiv.addClass('col-md-1');
  
      var $saveBtn = $('<i>');
      $saveBtn.attr('id',`saveid-${index}`);
      $saveBtn.attr('save-id',index);
      $saveBtn.attr('class',"fa fa-save");
      
      // Add column width and row component to row
      $rowDiv.append($col1SaveDiv);
      $col1SaveDiv.append($saveBtn);
      // Stop building save part of row
  
      // Set row color based on time
      updateRowColor($rowDiv, hour);
      
      // Add row to planner container
      $plannerDiv.append($rowDiv);
    };
  
    // Function to update row color
    function updateRowColor ($hourRow,hour) { 
  
      if (test) { console.log("rowColor ",nowHour24, hour); }
  
      if ( hour < nowHour24) {
        // $hourRow.css('')
        if (test) { console.log("lessThan"); }
        $hourRow.css("background-color","lightgrey")
      } else if ( hour > nowHour24) {
        if (test) { console.log("greaterthan"); }
        $hourRow.css("background-color","lightgreen")
      } else {
        if (test) { console.log("eqaul"); }
        $hourRow.css("background-color","lightcoral")
      }
    };
  
    // Save to local storage
    // onClick function to listen for user clicks on plan area
    $(document).on('click','i', function(event) {
      event.preventDefault();  
  
      if (test) { console.log('click pta before '+ planTextArr); }
  
      var $index = $(this).attr('save-id');
  
      var inputId = '#input-'+$index;
      var $value = $(inputId).val();
  
      planTextArr[$index] = $value;
  
  
      if (test) { console.log('value ', $value); }
      if (test) { console.log('index ', $index); }
      if (test) { console.log('Click PTA after '+ planTextArr); }
  
    });  
    
    // Function to color save button on change of input
    $(document).on('change','input', function(event) {
      event.preventDefault();  
      if (test) { console.log('onChange'); }
      if (test) { console.log('id', $(this).attr('hour-index')); }
  
      // Check for save button
      var i = $(this).attr('hour-index');
  
    });
  });
