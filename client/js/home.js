$(document).ready(function() {
    displayUserData();
    showSavedScholarships();
    logout();
    showAppliedScholarships();
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

function showAppliedScholarships() {
    $.ajax({
        url: "/showAppliedScholarships",
        type: "GET",
        success: function(response) {
            console.log("scholarship:", response);
            const container = $("#scholarshipsContainer");
            container.empty();
            response.forEach((scholarship, index) => {
                const card = $(`
                    <div class="scholarship-card">
                        <h3>${scholarship.title}</h3>
                        <h4>$${scholarship.amount}</h4>
                        <p>${scholarship.description}</p>
                    </div>
                `);
                container.append(card);
            });
        },
        error: function( error) {
            console.error("Error:", error);
        }
    });
}

function showSavedScholarships() {
    $.ajax({
        url: "/showSavedScholarships",
        type: "GET",
        success: function(response) {
            console.log("scholarship:", response);
            const container = $("#savedScholarshipsContainer");
            container.empty();
            response.forEach((scholarship, index) => {
                const card = $(`
                    <div class="scholarship-card">
                        <h3>${scholarship.title}</h3>
                        <h4>$${scholarship.amount}</h4>
                        <p>${scholarship.description}</p>
                    </div>
                `);
                container.append(card);
            });
        },
        error: function( error) {
            console.error("Error:", error);
        }
    });
}
