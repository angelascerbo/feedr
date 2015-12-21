/*
  Please add all Javascript code to this file.
----> Do loading icon with jquery ajax like onreadystatechange in JS
*/


var topArticles,
    article,
    title,
    thumbnail,
    impressions;


$(document).on('ready', function() {
    $('#popUp').toggleClass('hidden');

    $('.closePopUp').on('click', function(event){
        event.preventDefault();
        $(this).parent().find('h2').empty();
        //$(this).parent().find("a.popUpAction").attr("href").empty();
        $('#popUp').addClass('hidden');

    });

    $.ajax({
        type: "GET",
        url: "https://www.reddit.com/top.json",
        dataType: "json",
        success: function(response) {
            $('#popUp').toggleClass('hidden');

            topArticles = response.data.children;
            
            for(var i = 0; i < topArticles.length; i++) {
                article = topArticles[i];
                title = article.data.title;
                thumbnail = article.data.thumbnail;
                impressions = article.data.score;
                category = article.data.subreddit;
                url = article.data.url;
                appendArticle(title, thumbnail, impressions, category, url);
            }
        }
    });
});

function appendArticle (title, thumbnail, impressions, category, url) {
    var source = $('#feedr-template').html(); 
    var template = Handlebars.compile(source);

    var articleContent = {
        articleTitle: title,
        articleThumbnail: thumbnail,
        articleScore: impressions,
        articleCategory: category,
        articleUrl: url
    }

    var compileTemplate = template(articleContent);
    $('#main').append(compileTemplate);
};

$(document).on('click', '.articleContent', function(event){
    event.preventDefault();
    title = $(this).parent().find('h3').text();
    url = $(this).parent().find('.articleUrl').html();
    $('#popUp').find('h2').append(title);
    $('#popUp').find("a.popUpAction").attr("href", url);
    $('#popUp').removeClass('loader');
    $('#popUp').toggleClass('hidden');
});


$('#search a').on('click', function(event){
    event.preventDefault();
    $('#search').toggleClass('active');
    $('#newsSource').toggleClass('searchActive');
});

$('input').keypress(function(event){
    if (event.keyCode == 13) {
        $('#search').toggleClass('active');
        $('#newsSource').toggleClass('searchActive');
    }
});
