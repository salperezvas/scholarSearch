$('#data-submit').click(function(event) {
    event.preventDefault();

    var username = $('#username').val();
    var password = $('#password').val();
    var name = $('#name').val();
    var lastName = $('#lastName').val();
    var email = $('#email').val();

    var jsonString = {
        username: username,
        password: password,
        name: name,
        lastName: lastName,
        email: email
    };

    $.ajax({
        url: "http://localhost:777/signUp",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(jsonString),
        success: function(response) {
            if (response.msg === "User registered successfully") {
                alert("Username, " + username + " , registered successfully");
                window.location.href = "login"; 
            } else if (response.msg === "Username already exists") {
                alert("Username already exists");
            } else if (response.msg === "Database error") {
                alert("Database error");
            } else if (response.msg === "Error inserting user") {
                alert("Error inserting user");
            } else {
                alert("Error: " + response.msg);
            }
        },
        error: function(err) {
            alert("An error occurred. Please try again. lmao it's not working");
        }
    });

    return false;
});