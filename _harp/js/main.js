//TODO: Refactor
//Priorities landing resize?

(function (){
  function toggleHandler(toggle) {
    var iconplease = document.getElementById("cmn-toggle-switch");
    (iconplease.classList.contains("active") === true) ? iconplease.classList.remove("active") : iconplease.classList.add("active");
  }

  var dropdown      = document.querySelectorAll('.dropdownToggle');
  var dropdownArray = Array.prototype.slice.call(dropdown,0);

  dropdownArray.forEach(function (dropdown){
    var button = dropdown.querySelector('a[data-toggle="dropdown"]');
    var menu   = dropdown.querySelector('.nav-settings-dropdown') || dropdown.querySelector('.dropdown-menu');

    var wait = false;

    window.onclick = function (event){
      wait = !wait;
      if(menu.hasClass('show') && wait){
        menu.classList.remove('show');
        menu.classList.add('hide');
        toggleHandler();
      }
    };

    button.onclick = function(event) {
      wait = true;
      if(!menu.hasClass('show')) {
        menu.classList.add('show');
        menu.classList.remove('hide');
        toggleHandler();
      }else{
        menu.classList.remove('show');
        menu.classList.add('hide');
        toggleHandler();
      };
    };

    window.onscroll=function(){
      wait = !wait;
      if(menu.hasClass('show') && wait){
        menu.classList.remove('show');
        menu.classList.add('hide');
        toggleHandler();
      }
    };
  });

  Element.prototype.hasClass = function(className) {
    var a = this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
    return a;
  };
}());

/**
 *  Animation/style-related
 *
 */
var fac = (function (){
    /**
     *  Reveal object with public
     *  methods to be returned
     *  when the function is invoked
     */
    var reveal = {
        nav_scroll: nav_scroll,
        // changeText: changeText
    };
    var navbar_animation = {
        /**
         *  Resize navbar menu on load
         *
         */
        nav_resize: function () {
          var distanceY = window.pageYOffset || document.documentElement.scrollTop;
          var navbar = document.getElementById("navbar");
          var icon = document.getElementById("cmn-toggle-switch");
          var navTablet = document.getElementById("nav-dd-tablet");
          if (distanceY > 300) {
            navbar.classList.add("small-nav");
            navTablet.classList.add("small-dd-tabet");
            icon.classList.add("small-icon");
          } else {
            if(navbar.className.match(/(?:^|\s)small-nav(?!\S)/)) {
            navbar.classList.remove("small-nav");
            navTablet.classList.remove("small-dd-tabet");
            icon.classList.remove("small-icon");
            }
          }
        },
        /**
         *  Resize navbar menu on scroll
         *
         */
        nav_resize_scroll: function () {
          window.addEventListener('scroll', function(){
            var distanceY = window.pageYOffset || document.documentElement.scrollTop;
            var navbar = document.getElementById("navbar");
            var icon = document.getElementById("cmn-toggle-switch");
            var navTablet = document.getElementById("nav-dd-tablet");
            if (distanceY > 300) {
                navbar.classList.add("small-nav");
                navTablet.classList.add("small-dd-tabet");
                icon.classList.add("small-icon");
            } else {
              if(navbar.className.match(/(?:^|\s)small-nav(?!\S)/)) {
                navbar.classList.remove("small-nav");
                navTablet.classList.remove("small-dd-tabet");
                icon.classList.remove("small-icon");
              }
            }
          });
        },
        /**
         *  Resize dropdown menu on load
         *
         */
        dropdown_resize: function () {
          var distanceY = window.pageYOffset || document.documentElement.scrollTop;
          var elements = document.getElementsByClassName('nav-dd');
            if (distanceY > 300) {
                for (var i=elements.length; i--;) {
                    elements[i].classList.add("small-dd");
                }
            } 
            else {
                if(elements[0].className.match(/(?:^|\s)small-dd(?!\S)/)) {
                    for (var i=elements.length; i--;) {
                        elements[i].classList.remove("small-dd");
                    }
                }
            }
        },

         /**
         *  Resize dropdown menu on scroll
         *
         */
        dropdown_resize_scroll: function () {
          window.addEventListener('scroll', function(e){
              var distanceY = window.pageYOffset || document.documentElement.scrollTop;
              var elements = document.getElementsByClassName('nav-dd');
              if (distanceY > 300) {
                  for (var i=elements.length; i--;) {
                      elements[i].classList.add("small-dd");
                  }
              } 
              else {
                  if(elements[0].className.match(/(?:^|\s)small-dd(?!\S)/)) {
                      for (var i=elements.length; i--;) {
                          elements[i].classList.remove("small-dd");
                      }
                  }
              }
          });
        }
    };

    function nav_resize() {
      navbar_animation.nav_resize();
      navbar_animation.nav_resize_scroll();
      navbar_animation.dropdown_resize();
      navbar_animation.dropdown_resize_scroll();
    }
    /**
     *  Consistent aspect ration for portfolio images
     *
     */  
    function img_resize()	{
        var imgWidth = document.getElementById("img").offsetWidth;
        var elements = document.getElementsByClassName('im');
        for (var i=elements.length; i--;) {
            elements[i].style.height = imgWidth*0.66 + "px";
        }
    }
    function home_resize() {
        if (window.location.pathname == '/' || window.location.pathname == /portfolio/ ) {
            img_resize();
            window.onresize = function() {
                img_resize();
            };
        }
    }
    window.onload = function() {
        nav_resize();
        home_resize();
    }
    /**
     * Changes the text for the client quotes on the landing page
     *
     */
    // function changeText(nameText, quoteText){

    //     var client_name  = document.getElementById('client-name');
    //     var client_quote = document.getElementById('client-quote');

    //     client_name.style.opacity = 0;
    //     client_quote.style.opacity = 0;
    //     timeout = setTimeout(function(thing) {
    //         client_name.innerHTML = nameText;
    //         client_quote.innerHTML = quoteText;
    //         client_name.style.opacity = 1;
    //         client_quote.style.opacity = 1;
    //     }, 1000);
    // }
    function currentYPosition() {
        if (self.pageYOffset) return self.pageYOffset;
        if (document.documentElement && document.documentElement.scrollTop)
            return document.documentElement.scrollTop;
        if (document.body.scrollTop) return document.body.scrollTop;
        return 0;
    }

    function elmYPosition(eID) {
        var elm = document.getElementById(eID);
        var y = elm.offsetTop;
        var node = elm;
        while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        } return y;
    }
    /**
     * Scroll section into view.
     *
     */
    function smoothScroll (eID) {
        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
    }
    /**
     *  Get the user to the specific section. Scrolls to section 
     *  if already on the correct page. Navigates directly to content
     *  if navigating between pages.
     *
     *  @param {String} - path to the page where
     *                    where section is
     *  @param {String} - id of the section
     */
    function nav_scroll(page, anchor) {
        if(anchor) {
          if (window.location.pathname != page) {
              location = page+'#'+anchor
          }
          // stop page scrolling before load
          setTimeout(function() {
              smoothScroll(anchor);
          }, 1);
        }
        if(!anchor) {
          if (window.location.pathname != page) {
              location = page+'#'
          }
        }
      }
    /**
     *  Returns object with the
     *  public methods
     */
    return reveal;
}());

/**
 *  Contact form
 *  
 */

var contact_form = (function (){
    var reveal = {
        sendMail:sendMail
    };
    /**
     *  Constructs the email for Mandrill
     *  which we will recieve
     */
    function createParams(name, email, message, location) { 
        var params = {
            "message": {
                "from_email":email,
                "to":[{"email":"contact@foundersandcoders.org"}],
                "subject": name + " from " + location,
                "text": message
            }
        };
        return params;
    };
    /**
     *  TODO
     *  
     */
    m = new mandrill.Mandrill('J23eakjghP54ii1jfviYfg');
     /**
     *  Send params with input value
     *  from contact form to Madrill
     */
    function sendMail() {
        var contactName = document.getElementById("contact-form-name").value;
        var contactEmail = document.getElementById("contact-form-email").value;
        var contactMessage = document.getElementById("contact-form-message").value;
        var pathName = window.location.pathname;
        m.messages.send(createParams(contactName, contactEmail, contactMessage, pathName), function(res) {
            alert('Your message has been sent. Thank you!')
        }, function(err) {
            alert('Error sending message.');
        });
    }
    /**
     *  Returns object with the
     *  public methods
     */
    return reveal;
}());



/**
 *  New contact form functionality with Heroku
 *  
 */
// var contact_form = (function (){

//     var reveal = {
//       sendMail:sendEmail
//     };

//     var apiEmail = "http://test-izaak.herokuapp.com/";

//   	function sendEmail (){

//       var postDate = getParams();

//       $.ajax({
//          type: 'POST',
//           url: apiEmail,
//           async: false,
//           jsonpCallback: 'jsonCallback',
//           contentType: "application/json",
//           dataType: 'jsonp',
//           success: function(json) {
//             console.dir(json.sites);
//           },
//           error: function(e) {
//             console.log(e.message);
//           }
//       });
//               		// var xhr = new XMLHttpRequest();
//               		// xhr.onreadstatechange = function () {
              			
//               		// 	console.log("OK");
//               		// }
              		
//               		// xhr.open("POST", apiEmail, true);
//                 //   xhr.withCredentials = true;
//               		// xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//               		// xhr.send(JSON.stringify(postDate));
//   	}

//     function getParams() {

//       return {
//         // contactName:    document.getElementById("contact-form-name").value,
//         address:   document.getElementById("contact-form-email").value,
//         message: document.getElementById("contact-form-message").value
//       }
//     }
//     /**
//      *  Returns object with the
//      *  public methods
//      */
//     return reveal;
// }());
