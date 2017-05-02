

//initiate skrollr. Turn smooth scrolling on if you wish. It's a different look
var s = skrollr.init({"data-smooth-scrolling":false});

$(window).on("load", function(){
    s.refresh();
})

//create variable to store vimeo videos
var vimeoVideos = [],
    videoHolder;

//when clicking on either header section button
$('header[role="banner"] button').on("click", function(i,e){
  
  //if they clicked on vimeo video button...
  if($(this).data("onclickplayvimeo")){


    //if we haven't played the video previously...
    if(!$("#opening-video").length){

      //use RegEx to get just the numerical video ID
      var videoUrl = $(this).data("onclickplayvimeo").match(/\d+/);
      
      //create a <div> tag that's fixed and covers everything
      videoHolder = $("<div />").css({
        "opacity": 0,
        "position": "fixed",
        "z-index": 9000,
        "top": 0,
        "left": 0,
        "width": "100vw",
        "height": "100vh",
        "background-color":"#000000"
      });

      //append the iframe to this video tag using video ID above
      videoHolder.append('<iframe id="opening-video" width="100%" height="100%" src="https://player.vimeo.com/video/' + videoUrl + '?title=0&byline=0&portrait=0"></iframe>');

      //append to the body of our page
      $("body").append(videoHolder);

      //load vimeo API so we can call commands on it
      $("#opening-video").vimeoLoad();
        
        

      //now, we're ready to animate its opacity to 100% over 1000 milliseconds
      videoHolder.animate({opacity:1}, {duration:1000, 

        //when animation is done
        done:function(){

          //play it.
          $("#opening-video")
          .vimeo("play")

          //when it's paused
          .on("pause", function(){

            //animate it to zero opacity over 500 milliseconds
            videoHolder.animate({opacity:0}, {duration: 500, 

              //when that's done, make it invisible
              done:function(){
                videoHolder.css({"display":"none"});
              }});
          });
        }
      });

    } else { // we've played this video before, don't create it

      //make it display block so we can show it
      videoHolder
        .css({"display":"block"})

        //animate opacity to 100 percent
        .animate({opacity:1}, {duration: 1000, 

          //when that's done, play video
          done: function(){
            $("#opening-video")
              .vimeo("play");
            }
        });
    }

  } else { //they click the scroll button instead

    //scroll down the height of the window
    $("html,body").stop().animate({"scrollTop":$(window).height()}, 700, 'easeInOutCubic');

  }
});

//cool-looking easeInOutCubic effect
jQuery.extend(jQuery.easing, {easeInOutCubic: function(e,f,a,h,g) {if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a}});
