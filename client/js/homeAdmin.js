$(document).ready(function() {
    displayUserData();
    logout();
    showStudentAccounts();
    deleteAccount();
    showCompanyAccount();
    deleteCopmanyAccount();
    showScholarships();
    deleteScholarship();

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

/*
function showPendingApproval() {
    $.ajax({
        url: "/showPendingApproval",
        type: "GET",
        success: function(response) {
            console.log("scholarship:", response);
            const container = $("#pendingApprovalContainer");
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
                    showCompanyAccount();
                    showStudentAccounts();
                    showAllScholarships();
                    showPendingApproval();
                },
                error: function (error) {
                    console.error("Error:", error);
                }
            });
        }
    });
}
*/

function showCompanyAccount() {
    $.ajax({
        url: "/showCompanyAccount",
        type: "GET",
        success: function(response) {
            console.log("Company accounts:", response);
            const container = $("#companyAccountsContainer");
            container.empty();
            response.forEach((account, index) => {
                const card = $(`
                    <div class="scholarship-card">
                        <h3>${account.name}</h3>
                        <h4>${account.lastName}</h4>
                        <p>${account.email}</p>
                        <button class="btn btn-danger delete-companyAccount" data-id="${account.company_id}">Delete</button>
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

function deleteCopmanyAccount() {
    $(document).on("click", ".delete-companyAccount", function () {
        const accountId = $(this).data("id");

        if (confirm("Are you sure you want to delete this account?")) {
            $.ajax({
                url: `/deleteCopmanyAccount/${accountId}`,
                type: "DELETE",
                success: function (response) {
                    alert(response.msg);
                    showCompanyAccount();
                    showStudentAccounts();
                    showAllScholarships();
                    showPendingApproval();
                },
                error: function (error) {
                    console.error("Error:", error);
                }
            });
        }
    });
}

function showStudentAccounts() {
    $.ajax({
        url: "/showStudentAccounts",
        type: "GET",
        success: function(response) {
            console.log("student accounts:", response);
            const container = $("#studentAccountsContainer");
            container.empty();
            response.forEach((account, index) => {
                const card = $(`
                    <div class="scholarship-card">
                        <h3>${account.name}</h3>
                        <h4>${account.lastName}</h4>
                        <p>${account.email}</p>
                        <button class="btn btn-danger delete-account" data-id="${account.student_id}">Delete</button>
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

function deleteAccount() {
    $(document).on("click", ".delete-account", function () {
        const accountId = $(this).data("id");

        if (confirm("Are you sure you want to delete this account?")) {
            $.ajax({
                url: `/deleteAccount/${accountId}`,
                type: "DELETE",
                success: function (response) {
                    alert(response.msg);
                    showCompanyAccount();
                    showStudentAccounts();
                    showAllScholarships();
                    showPendingApproval();
                },
                error: function (error) {
                    console.error("Error:", error);
                }
            });
        }
    });
}
///

function showScholarships() {
    $.ajax({
        url: "/showEveryScholarships",
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

function deleteScholarship() {
    $(document).on("click", ".delete-scholarship", function () {
        const scholarshipId = $(this).data("id");

        if (confirm("Are you sure you want to delete this scholarship?")) {
            $.ajax({
                url: `/deleteScholarship/${scholarshipId}`,
                type: "DELETE",
                success: function (response) {
                    alert(response.msg);
                    showScholarships();
                },
                error: function (error) {
                    console.error("Error:", error);
                }
            });
        }
    });
}
