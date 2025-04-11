$(document).ready(function() {
    displayUserData();
    logout();
    showApprovedScholarships();
    showRejectedScholarships();
    showPendingScholarships();
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

function showApprovedScholarships() {
    $.ajax({
        url: "/showApprovedScholarships",
        type: "GET",
        success: function(response) {
            console.log("scholarship:", response);
            response.forEach((scholarship, index) => {
                const elementId = `#activeScholarship${index + 1}`;
                $(elementId).html(`
                    <h3>${scholarship.title}</h3>
                    <h4>$${scholarship.amount}</h4>
                    <p>${scholarship.description}</p>
                    <button class="btn btn-primary" id="deleteApprovedScholarship${index + 1}">Delete</button>
                `);
            });
        },
        error: function( error) {
            console.error("Error:", error);
        }
    });
}

function showRejectedScholarships() {
    $.ajax({
        url: "/showRejectedScholarships",
        type: "GET",
        success: function(response) {
            console.log("scholarship:", response);
            response.forEach((scholarship, index) => {
                const elementId = `#rejectedScholarships${index + 1}`;
                $(elementId).html(`
                    <h3>${scholarship.title}</h3>
                    <h4>$${scholarship.amount}</h4>
                    <p>${scholarship.description}</p>
                    <button class="btn btn-primary" id="deleteRejectedScholarship${index + 1}">Delete</button>
                `);
            });
        },
        error: function( error) {
            console.error("Error:", error);
        }
    });
}

function showPendingScholarships() {
    $.ajax({
        url: "/showPendingScholarships",
        type: "GET",
        success: function(response) {
            console.log("scholarship:", response);
            response.forEach((scholarship, index) => {
                const elementId = `#pendingScholarships${index + 1}`;
                $(elementId).html(`
                    <h3>${scholarship.title}</h3>
                    <h4>$${scholarship.amount}</h4>
                    <p>${scholarship.description}</p>
                    <button class="btn btn-primary" id="deletePendingScholarship${index + 1}">Delete</button>
                `);
            });
        },
        error: function( error) {
            console.error("Error:", error);
        }
    });
}