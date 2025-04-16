$(document).ready(function() {
    displayUserData();
    logout();
    showScholarships();
});

function displayUserData() {
    $.ajax({
        url: "/getUserData",
        type: "GET",
        success: function(response) {
            console.log("User data:", response);
            if (response.user) {
                $("#welcome").text(`Welcome, ${response.user.name}`);
            }
        },
        error: function( status, error) {
            console.error("Error:", error, "Status:", status);
        }
    });
}

function logout() {
    $("#signOut").click(function(e) {
        e.preventDefault();
        
        $.ajax({
            url: "/signout",
            type: "POST",
            success: function(response) {
                if (response.success) {
                    window.location.href = "/login";
                } else {
                    alert("Signout failed: " + (response.error));
                }
            },
            error: function(status, error) {
                console.error("Signout error:", status, error);
                alert("Signout failed. Please check console for details.");
            }
        });
    });
}

function showScholarships() {
    $.ajax({
        url: "/showScholarships",
        type: "GET",
        success: function(response) {
            console.log("scholarship:", response);
            response.forEach((scholarship, index) => {
                const elementId = `#scholarship${index + 1}`;
                $(elementId).html(`
                    <h3>${scholarship.title}</h3>
                    <h4>$${scholarship.amount}</h4>
                    <p>${scholarship.description}</p>
                `);
            });
        },
        error: function( status, error) {
            console.error("Error:", error, "Status:", status);
        }
    });
}

function searchScholarship() {
    const searchValue = $("#searchScholarship").val().toLowerCase();
    $(".scholarship").each(function() {
        const title = $(this).find("h3").text().toLowerCase();
        if (title.includes(searchValue)) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}