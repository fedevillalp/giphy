    //Global Variable definitions
    var animal_array = ['cat', 'dog', 'cow','donkey'];
    var animal;

    //Create buttons in HTML and give them attibutes
    function render(animal_array){

        $('.buttons').empty();

        for (let i = 0; i < animal_array.length; i++) {
            var button = $('<button>');
            button.addClass('request btn btn-secondary');
            button.attr('data-request', animal_array[i]);
            button.attr('id','selector_button');
            button.text(animal_array[i]);
            $('.buttons').append(button);
        }

    }
    
    //Wait for DOM to load to attach handler for all dynamically created buttons
    $(document).on('click', '.request', function(){
        var animal = $(this).attr('data-request');
        callapi(animal);
    });

    
    //create an on-click handler for submit form
    $('#submit_new_animal').click(function(){

        event.preventDefault();

        var new_animal = $('#new_animal').val().trim();

        //If submit has contents store in animal_array
        if(new_animal){ 
            animal_array.push(new_animal);
        }

        $('#new_animal').val('');

        render(animal_array);
        console.log('Animal Array to Render: '+ animal_array);

    });

    function callapi(animal){
        console.log('Request to API :'+ animal);

        var limit = 10;
        var rating = 'pg-13';
        var apiKey= 'ErM6BHTvWocfasWtpefms3rUNB0uHoQV';
    
        //url = 'http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=ErM6BHTvWocfasWtpefms3rUNB0uHoQV&limit=5'

        url = 'http://api.giphy.com/v1/gifs/search?'
        queryURL = url + 'q=' + animal + '&api_key=' + apiKey + '&limit=' + limit;
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
              // Storing an array of results in the results variable
              
              render_response(response);
            });
    
    }

    function render_response(response){
        
        console.log(response);
        //var link = response.data[0].images.fixed_height.url;
        //var rating = response.data[0].rating;

        $('.response').empty();

        var images_div = $('<div>');

        response.data.forEach(element => {

            var link_still = element.images.fixed_height_still.url;
            var link_moving = element.images.fixed_height.url;
            var rating = element.rating;
            
            $('.response').append(images_div);
            
            var p1 = $('<p>');
                p1.append('Rating:'+ rating);
                images_div.append(p1);

            var image = $('<img>');
                image.attr('src', link_still);
                image.attr('data-link-moving',link_moving);
                image.attr('data-link-static',link_still);
                image.attr('data-state','static');

            var p = $('<p>');
                p.append(image);
                images_div.append(p);

        });
    
    }

    //Wait for DOM to load and toggle moving/static images
    $('.response').on('click', 'img', function(){

        if ($(this).attr('data-state')=='static')
            {
            var link_moving = $(this).attr('data-link-moving');
            console.log(link_moving); //returns undefined TO DO 12/10/2018
            $(this).attr('src', link_moving);
            $(this).attr('data-state', 'moving');
            } 

        else if ($(this).attr('data-state')=='moving')
            {
            var link_static = $(this).attr('data-link-static');
            console.log(link_static); //returns undefined TO DO 12/10/2018
            $(this).attr('src', link_static);
            $(this).attr('data-state', 'static');
            } 
        
    });


////////////////////

    //On page Load render buttons
    render(animal_array);
    
    
