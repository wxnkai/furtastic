
window.addEventListener('DOMContentLoaded', event => {

    /* ===============================================
        Preloader
    ============================================== */
    setTimeout(function () {
        $('.loader_bg').animate({
            height: 'toggle',
        });
    }, 1500);

    /* ===============================================
        Cookies Consent
    ============================================== */
    // Check if the user has already accepted the consent
    if (typeof Storage !== "undefined") {
        if (!localStorage.getItem('furtasticCookies')) {
            // Show the cookie consent modal if not accepted
            $('#cookie').modal('show');
        }
        // Handle the "Accept" button click event
        $('#acceptCookies').click(function () {
            // Set a flag in local storage to indicate consent
            localStorage.setItem('furtasticCookies', 'true');
            // Hide the modal
            $('#cookie').modal('hide');
        });
    }
    else {
        alert("Your browser does not support cookies")
    }

    /* ===============================================
        User Log in
       ============================================== */
    // Check if the user has already logged in
    // var currentURL = window.location.href;
    // alert(currentURL);
    // if (typeof Storage !== "undefined") {
    //     if (currentURL === "http://127.0.0.1:53650/index1.html") {
    //         if (!localStorage.getItem('furtasticlogin')) {
    //             window.location.href = "index.html";
    //             // Prompt user to login first
    //             $('#accessMessage').modal('show');
    //         }
    //     }
    //     // Handle the "Accept" button click event
    //     $('#ok').click(function () {
    //         // Set a flag in local storage to indicate consent
    //         localStorage.setItem('furtasticCookies', 'true');
    //         // Hide the modal
    //         $('#accessMessage').modal('hide');
    //     });
    // }
    // else {
    //     alert("Your browser does not support cookies")
    // }

    /* ===============================================
        Navigation Events
       ============================================== */
    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY <= 500) {
            navbarCollapsible.classList.remove('navbar-shrink');
            document.getElementById("logo").src = "/assets/img/logo/furtasticword4black.png";
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
            document.getElementById("logo").src = "/assets/img/logo/furtasticword.png";
        }

    };
    // Shrink the navbar 
    navbarShrink();
    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });



    /* ===============================================
        LOGIN/REGISTER FORM
       ============================================== */
    $(".register-link").click(function () {
        $(".wrapper").addClass('active');
    });

    $(".login-link").click(function () {
        $(".wrapper").removeClass('active');
        $("#register_feedback").removeClass("is-invalid");
    });

    $(".bthLogin-popup").click(function () {
        $(".wrapper").addClass('active-popup');
    });

    $(".register").click(function () {
        $(".wrapper").addClass('active-popup');
    });

    $("#unlock").click(function () {
        $(".wrapper").addClass('active-popup');
    });

    $(".icon-close").click(function () {
        $(".wrapper").removeClass('active-popup');
    });

    // To show  and hide password
    $("#show_password1").click(function () {
        var passwordField = $("#login_password");
        var icon = $("#icon1");
        if (passwordField.attr("type") === "password") {
            passwordField.attr("type", "text");
            icon.attr("name", "eye");
        } else {
            passwordField.attr("type", "password");
            icon.attr("name", "eye-off");
        }
    });

    $("#show_password2").click(function () {
        var passwordField = $("#reg_password");
        var icon = $("#icon2");
        if (passwordField.attr("type") === "password") {
            passwordField.attr("type", "text");
            icon.attr("name", "eye");
        } else {
            passwordField.attr("type", "password");
            icon.attr("name", "eye-off");
        }
    });

    $("#show_password3").click(function () {
        var passwordField = $("#confirm_password");
        var icon = $("#icon3");
        if (passwordField.attr("type") === "password") {
            passwordField.attr("type", "text");
            icon.attr("name", "eye");
        } else {
            passwordField.attr("type", "password");
            icon.attr("name", "eye-off");
        }
    });





    /* ===============================================
        Section HOME - TYPING EFFECT JS
       ============================================== */

    const spans = document.querySelectorAll('.title span');

    spans.forEach((span, idx) => {
        span.addEventListener('click', (e) => {
            e.target.classList.add('active');
        });
        span.addEventListener('animationend', (e) => {
            e.target.classList.remove('active');
        });

        // Initial animation
        setTimeout(() => {
            span.classList.add('active');
        }, 750 * (idx + 1))
    });

    /* ===============================================
    Section DISPLAY - WORD EFFECT JS
   ============================================== */

    var words = document.getElementsByClassName('word');
    var wordArray = [];
    var currentWord = 0;

    words[currentWord].style.opacity = 1;
    for (var i = 0; i < words.length; i++) {
        splitLetters(words[i]);
    }

    function changeWord() {
        var cw = wordArray[currentWord];
        var nw = currentWord == words.length - 1 ? wordArray[0] : wordArray[currentWord + 1];
        for (var i = 0; i < cw.length; i++) {
            animateLetterOut(cw, i);
        }

        for (var i = 0; i < nw.length; i++) {
            nw[i].className = 'letter behind';
            nw[0].parentElement.style.opacity = 1;
            animateLetterIn(nw, i);
        }

        currentWord = (currentWord == wordArray.length - 1) ? 0 : currentWord + 1;
    }

    function animateLetterOut(cw, i) {
        setTimeout(function () {
            cw[i].className = 'letter out';
        }, i * 80);
    }

    function animateLetterIn(nw, i) {
        setTimeout(function () {
            nw[i].className = 'letter in';
        }, 340 + (i * 80));
    }

    function splitLetters(word) {
        var content = word.innerHTML;
        word.innerHTML = '';
        var letters = [];
        for (var i = 0; i < content.length; i++) {
            var letter = document.createElement('span');
            letter.className = 'letter';
            letter.innerHTML = content.charAt(i);
            word.appendChild(letter);
            letters.push(letter);
        }

        wordArray.push(letters);
    }

    changeWord();
    setInterval(changeWord, 4000);

    /* ===============================================
        Animation On Scroll
    ============================================== */
    window.addEventListener('load', () => {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
            mirror: false
        });
    });

    /* ===============================================
    Contact Card Navigation
    ============================================== */
    $('.contact').click(function () {
        window.location.href = "contact.html";
    });

    $('.whatsapp-contact').click(function () {
        window.location.href = "https://api.whatsapp.com/send?phone=+60177700711&text=Hi%20Furtastic!%F0%9F%90%BE%20I%20would%20like%20to%20ask%20you%20about...";
    });

    /* ===============================================
    Profile Picture
      ============================================== */
    // Check if there's a stored profile picture in local storage
    const storedProfilePicture = localStorage.getItem("profilePicture");

    if (storedProfilePicture) {
        // Display the stored profile picture
        $(holder).find(".pic").attr("src", storedProfilePicture);
    }



});

