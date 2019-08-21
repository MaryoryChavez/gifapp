var keyword = 'dogs';
var offset = 0;
var total = 1;

$(document).ready(function(){
  next();
});

function next() {
  if (!keyword || offset >= total) return;

  $.getJSON('http://api.giphy.com/v1/gifs/search?q='+keyword+'&offset='+offset+'&api_key=6ZhfDXy5ou2XhM4t18exkKSWDq6tnWle', function(json) {
    
    // numero total de gifs para keyword:
    total = json.pagination.total_count;

    // Renderizar las imagenes tags:
    var images = '';

    for (var i=0; i < json.data.length; i++) {
      images += '<img class="gif" src="' + json.data[i].images.original.url + '" data-offset="'+offset+'"/>';
      offset++;
    }

    $('.gifstable').append(images);
  });  
}

// Inifinite Scroll

$(window).on('scroll', _.debounce(function() {
  if($(window).scrollTop() + $(window).height() >= $(document).height()){
    next();
  }
}, 150));
