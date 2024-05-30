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
    } else {
      $('#api_status').removeClass('available');
    }
  });

  $.ajax({
      url: 'http://localhost:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({}),
      dataType: 'json',
      success: function(data) {
        $('.places').empty();
        for (let place of data) {
          const article = `
            <article>
              <div class="title">
                <h2>${place.name}</h2>
                <div class="price_by_night">${place.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
              </div>
              <div class="description">
                ${place.description}
              </div>
            </article>
          `;
          $('.places').append(article);
        }
      },
      error: function() {
        console.log('Error');
      }
  });
});
