$(document).ready(function() {
    const amenities = [];
    $('input:checkbox').click(function() {
      if ($(this).is(':checked')) {
        amenities.push($(this).attr('data-name'));
      } else {
        const index = amenities.indexOf($(this).attr('data-name'));
        amenities.splice(index, 1);
      }
      let amenitiesText = amenities.join(', ');
      if (amenitiesText.length > 30) { 
        amenitiesText = amenitiesText.substring(0, 30) + '...';
      }
      $('.amenities h4').text(amenitiesText);
    });
    $.get("http://localhost:5001/api/v1/status/", function(data, status) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      }
    });
  });
  