$(document).ready(function() {
    displayUserData();
    logout();
    showScholarships();
    searchScholarships();
    applyScholarship();
    clearSearch();
    saveScholarship();
    reportScholarship();
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
            const container = $("#scholarshipContainer");
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

function searchScholarships() {
    $("#search").click(function(e) {
        e.preventDefault();
        
        const title = $("#title").val().trim();
        if (!title){
            alert("Please enter a title to search.");
            return;
        }

        $.ajax({
            url: "/searchScholarship",
            type: "GET",
            contentType: "application/json",
            data: { title: title },
            success: function(response) {
                const container = $("#scholarshipContainer");
                container.empty();
                
                if (response.length === 0) {
                    container.html("<p>No scholarships found.</p>");
                    return;
                }
                console.log("scholarship:", response);
                response.forEach((scholarship) => {
                    const card = $(`
                        <div class="scholarship-card">
                            <h3>${scholarship.title}</h3>
                            <h4>$${scholarship.amount}</h4>
                            <p>${scholarship.description}</p>
                            <button class="btn btn-success apply-scholarship" data-id="${scholarship.scholarship_id}">Apply</button>
                        </div>
                    `);
                    container.append(card);
                });
            },
            error: function(err) {
                alert("An error occurred. Please try again.");
                console.error("Error:", err);
            }
        });
    });
}

function clearSearch() {
    $("#clearSearch").click(function () {
        $("#title").val("");
        showScholarships();
        window.location.href = "/studentDB";
    });
}
