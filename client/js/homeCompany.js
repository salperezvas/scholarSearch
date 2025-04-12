$(document).ready(function() {
    displayUserData();
    logout();
    showApprovedScholarships();
    showRejectedScholarships();
    showPendingScholarships();
    deleteScholarship();
    showAllScholarships();
    uploadScholarships();
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
            const container = $("#activeScholarshipContainer");
            container.empty();
            response.forEach((scholarship, index) => {
                const card = $(`
                    <div class="scholarship-card">
                        <h3>${scholarship.title}</h3>
                        <h4>$${scholarship.amount}</h4>
                        <p>${scholarship.description}</p>
                        <button class="btn btn-danger delete-scholarship" data-id="${scholarship.scholarship_id}">Delete</button>
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

function showRejectedScholarships() {
    $.ajax({
        url: "/showRejectedScholarships",
        type: "GET",
        success: function(response) {
            console.log("scholarship:", response);
            const container = $("#rejectedScholarshipContainer");
            container.empty();
            response.forEach((scholarship, index) => {
                const card = $(`
                    <div class="scholarship-card">
                        <h3>${scholarship.title}</h3>
                        <h4>$${scholarship.amount}</h4>
                        <p>${scholarship.description}</p>
                        <button class="btn btn-danger delete-scholarship" data-id="${scholarship.scholarship_id}">Delete</button>
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

function showPendingScholarships() {
    $.ajax({
        url: "/showPendingScholarships",
        type: "GET",
        success: function(response) {
            console.log("scholarship:", response);
            const container = $("#pendingScholarshipContainer");
            container.empty();
            response.forEach((scholarship, index) => {
                const card = $(`
                    <div class="scholarship-card">
                        <h3>${scholarship.title}</h3>
                        <h4>$${scholarship.amount}</h4>
                        <p>${scholarship.description}</p>
                        <button class="btn btn-danger delete-scholarship" data-id="${scholarship.scholarship_id}">Delete</button>
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

function deleteScholarship() {
    $(document).on("click", ".delete-scholarship", function () {
        const scholarshipId = $(this).data("id");

        if (confirm("Are you sure you want to delete this scholarship?")) {
            $.ajax({
                url: `/deleteScholarship/${scholarshipId}`,
                type: "DELETE",
                success: function (response) {
                    alert(response.msg);
                    showRejectedScholarships();
                    showPendingScholarships();
                    showApprovedScholarships();
                    showAllScholarships();
                },
                error: function (error) {
                    console.error("Error:", error);
                }
            });
        }
    });
}

function showAllScholarships() {
    $.ajax({
        url: "/showAllScholarships",
        type: "GET",
        success: function(response) {
            console.log("scholarship:", response);
            const container = $("#allScholarshipsContainer");
            container.empty();
            response.forEach((scholarship, index) => {
                const card = $(`
                    <div class="scholarship-card">
                        <h3>${scholarship.title}</h3>
                        <h4>$${scholarship.amount}</h4>
                        <p>${scholarship.description}</p>
                        <button class="btn btn-danger delete-scholarship" data-id="${scholarship.scholarship_id}">Delete</button>
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

function uploadScholarships() {
    $("#data-submit").click(function(e) {
        e.preventDefault();

        if (!this.checkValidity()) {
            this.reportValidity();
            return;
        }
        
        var title = $("#title").val();
        var description = $("#description").val();
        var amount = $("#amount").val();
        var deadline = $("#deadline").val();

        var jsonString = {
            title: title,
            description: description,
            amount: amount,
            deadline: deadline
        };

        $.ajax({
            url: "/uploadScholarships",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(jsonString),
            success: function(response) {
                if (response.msg === "Scholarship uploaded successfully") {
                    alert("Scholarship uploaded successfully");
                    $("#uploadScholarshipForm")[0].reset();
                    showPendingScholarships();
                    showAllScholarships();
                } else {
                    alert("Error uploading scholarship missing data");
                }
            },
            error: function(err) {
                alert("An error occurred. Please try again.");
                console.error("Error:", err);
            }
        });
    });
}