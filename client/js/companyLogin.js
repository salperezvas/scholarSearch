$('#data-submit').click(function(event) {
    event.preventDefault();

    var username = $('#username').val();
    var password = $('#password').val();

    var jsonString = {
        username: username,
        password: password
    };

    $.ajax({
        url: "http://localhost:777/companylogin",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(jsonString),
        success: function(response) {
            if (response.msg === "Login successful") {
                alert("Welcome, " + username);
                window.location.href = "studentDB"; 
            } else if (response.msg === "Please enter username and password") {
                alert("Please enter username and password");
            } else if (response.msg === "Database error") {
                alert("Database error");
            } else if (response.msg === "Invalid username or password") {
                alert("Invalid username or password");
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