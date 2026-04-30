
// =================================================================
// Firebase
// =================================================================
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {

    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Firebase configuration
    const firebaseConfig = {
        apiKey: "Firebase API Key (Removed due as it is sensitive)",
        authDomain: "furtastic-16c9d.firebaseapp.com",
        databaseURL: "https://furtastic-16c9d-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "furtastic-16c9d",
        storageBucket: "furtastic-16c9d.appspot.com",
        messagingSenderId: "914223496279",
        appId: "1:914223496279:web:57e2c3956de844169e3712"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const auth = getAuth(app);

    /* ===============================================
    Registration
    ============================================== */
    $("#registration-form").submit(function (event) {
        event.preventDefault(); // Prevent the default form submission behavior
        var username = $('#username').val();
        var email = $('#reg_email').val();
        var password = $('#reg_password').val();
        var confirmPassword = $('#confirm_password').val();

        if (password !== confirmPassword) {
            $("#register_feedback").removeClass("is-valid").addClass("is-invalid");
            $(".invalid-feedback").html("Your passwords do not match!");
            $(".invalid-feedback").show();
        }
        else {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    set(ref(database, 'users/' + user.uid), {
                        username: username,
                        email: email,
                    });
                    // Close the login form and show the new login message
                    $(".wrapper").removeClass('active-popup');
                    /* ===============================================
                        Registration Message
                    ============================================== */
                    // Check if the user has already login successfully
                    if (typeof Storage !== "undefined") {
                        // Show the cookie consent modal if not accepted
                        $('#registerMessage').modal('show');

                        // Handle the "Accept" button click event
                        $('#registerok').click(function () {
                            // Set a flag in local storage to indicate consent
                            localStorage.setItem('furtasticLogin', 'true');
                            // Hide the modal
                            $('#registerMessage').modal('hide');
                            window.location.href = 'index1.html';
                        });
                    }
                    else {
                        alert("Your browser does not support cookies")
                    }
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    $("#register_feedback").removeClass("is-valid").addClass("is-invalid");
                    if (errorCode === "auth/email-already-exists") {
                        $(".invalid-feedback").html("Email has been registered!");
                    }
                    else if (errorCode === "auth/invalid-email") {
                        $(".invalid-feedback").html("Invalid Email Entered!");
                    }
                    else if (errorCode === "auth/weak-password") {
                        $(".invalid-feedback").html("Password should be at least 6 characters!");
                    }
                    else if (errorCode === "auth/email-already-in-use") {
                        $(".invalid-feedback").html("Email has already in use!");
                    }
                    else {
                        $(".invalid-feedback").html(errorMessage);
                    }
                    $(".invalid-feedback").show();
                });
        }

    });

    /* ===============================================
        Login
        ============================================== */
    $('#login-form').submit(function (event) {
        event.preventDefault(); // Prevent the default form submission behavior
        var email = $('#login_email').val();
        var password = $('#login_password').val();

        // Login
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                update(ref(database, 'users/' + user.uid), {
                    lastLogin: Date.now()
                });
                // Close the login form and show the new login message
                $(".wrapper").removeClass('active-popup');
                /* ===============================================
                    Login Message
                ============================================== */
                // Check if the user has already login successfully
                if (typeof Storage !== "undefined") {
                    // Show the cookie consent modal if not accepted
                    $('#loginMessage').modal('show');

                    // Handle the "Accept" button click event
                    $('#loginok').click(function () {
                        // Set a flag in local storage to indicate consent
                        localStorage.setItem('furtasticLogin', 'true');
                        // Hide the modal
                        $('#loginMessage').modal('hide');
                        window.location.href = 'index1.html';
                    });
                }
                else {
                    alert("Your browser does not support cookies")
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                $("#login_feedback").removeClass("is-valid").addClass("is-invalid");
                if (errorCode === "auth/wrong-password") {
                    $(".invalid-feedback").html("Wrong Password!");
                }
                else if (errorCode === "auth/invalid-email") {
                    $(".invalid-feedback").html("Wrong Email Entered!");
                }
                else if (errorCode === "auth/user-not-found") {
                    $(".invalid-feedback").html("Email has not been registered!");
                }
                else if (errorCode === "auth/too-many-requests") {
                    $(".invalid-feedback").html("Access to this account has been temporarily disabled due to many failed login attempts. Reset your password or try again later!");
                }
                else {
                    $(".invalid-feedback").html(errorMessage);
                }
                $(".invalid-feedback").show();
            });

        $("#rememberme").click(function () {
            // Check if the user has already accepted the consent
            if (typeof Storage !== "undefined") {
                // Expiry Date
                var expDate = new Date();
                expDate.setMinutes(expDate.getMinutes() + 100000);
                // Store user email in cookies
                document.cookie = "email=" + email + "; expires=" + expDate.toUTCString();
            }
            else {
                alert("Your browser does not support cookies")
            }
        });

    });

    const user = auth.currentUser;
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            // The user object has basic properties such as display name, email, etc.
            const displayName = user.displayName;
            const email = user.email;
            const photoURL = user.photoURL;
            const emailVerified = user.emailVerified;
            // ...
        } else {
            // User is signed out
            // ...
        }
    });

    /* ===============================================
    Log Out
    ============================================== */
    $('.logout').click(function (event) {
        event.preventDefault(); // Prevent the default form submission behavior
        signOut(auth).then(() => {
            /* ======================= LogOut Message ========================*/
            // Check if the user has already login successfully
            if (typeof Storage !== "undefined") {
                // Show the cookie consent modal if not accepted
                $('#logoutMessage').modal('show');

                // Handle the "Accept" button click event
                $('#logoutok').click(function () {
                    // Set a flag in local storage to indicate consent
                    localStorage.setItem('furtasticLogin', 'false');
                    // Hide the modal
                    $('#logoutMessage').modal('hide');
                    // Redirect to landing page after successful logout
                    window.location.href = 'index.html';
                });
            }
            else {
                alert("Your browser does not support cookies")
            }

        }).catch((error) => {
            // An error happened.
            console.error("Logout error:", error);
        });
    });

    // firebase.auth().onAuthStateChanged(function (user) {
    //     if (user) {
    //         // User is signed in.
    //     } else {
    //         // No user is signed in.
    //     }
    // });


});
