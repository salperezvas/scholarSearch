$(document).ready(function() {
    displayUserData();
    logout();
    showStudentAccounts();
    deleteAccount();
    showCompanyAccount();
    deleteCopmanyAccount();
    showScholarships();
    deleteScholarship();
    scholarshipPending();
    rejectScholarship();
    rejectedScholarships();
    approveScholarship();
    accountPending();
    approveAccount();
    rejectAccount();

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

function scholarshipPending() {
    $.ajax({
        url: "/scholarshipPending",
        type: "GET",
        success: function(response) {
            console.log("pending scholarship:", response);
            const container = $("#scholarshipPendingContainer");
            container.empty();
            response.forEach((scholarship, index) => {
                const card = $(`
                    <div class="scholarship-card">
                        <h3>${scholarship.title}</h3>
                        <h4>$${scholarship.amount}</h4>
                        <p>${scholarship.description}</p>
                        <button class="btn btn-danger reject-scholarship" data-id="${scholarship.scholarship_id}">Reject</button>
                        <button class="btn btn-success approve-scholarship" data-id="${scholarship.scholarship_id}">Approve</button>
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

function approveScholarship() {
    $(document).on("click", ".approve-scholarship", function () {
        const scholarshipId = $(this).data("id");

        if (confirm("Are you sure you want to approve this scholarship?")) {
            $.ajax({
                url: `/approveScholarship/${scholarshipId}`,
                type: "POST",
                success: function (response) {
                    alert(response.msg);
                    scholarshipPending();
                    rejectedScholarships();
                },
                error: function (error) {
                    console.error("Error:", error);
                }
            });
        }
    });
}

function rejectScholarship() {
    $(document).on("click", ".reject-scholarship", function () {
        const scholarshipId = $(this).data("id");

        if (confirm("Are you sure you want to reject this scholarship?")) {
            $.ajax({
                url: `/rejectScholarship/${scholarshipId}`,
                type: "POST",
                success: function (response) {
                    alert(response.msg);
                    scholarshipPending();
                    rejectedScholarships();
                },
                error: function (error) {
                    console.error("Error:", error);
                }
            });
        }
    });
}

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

function rejectedScholarships() {
    $.ajax({
        url: "/rejectedScholarships",
        type: "GET",
        success: function(response) {
            console.log("pending scholarship:", response);
            const container = $("#rejectedScholarships");
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

function accountPending() {
    $.ajax({
        url: "/accountPending",
        type: "GET",
        success: function(response) {
            console.log("pending accounts:", response);
            const container = $("#accountPendingContainer");
            container.empty();
            response.forEach((account, index) => {
                const card = $(`
                    <div class="scholarship-card">
                        <h3>${account.name}</h3>
                        <h4>${account.lastName}</h4>
                        <p>${account.email}</p>
                        <button class="btn btn-danger reject-account" data-id="${account.student_id}">Reject</button>
                        <button class="btn btn-success approve-account" data-id="${account.student_id}">Approve</button>
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

function approveAccount() {
    $(document).on("click", ".approve-account", function () {
        const scholarshipId = $(this).data("id");

        if (confirm("Are you sure you want to approve this account?")) {
            $.ajax({
                url: `/approveAccount/${scholarshipId}`,
                type: "POST",
                success: function (response) {
                    alert(response.msg);
                    scholarshipPending();
                    rejectedScholarships();
                    accountPending();
                },
                error: function (error) {
                    console.error("Error:", error);
                }
            });
        }
    });
}

function rejectAccount() {
    $(document).on("click", ".reject-account", function () {
        const scholarshipId = $(this).data("id");

        if (confirm("Are you sure you want to reject this account?")) {
            $.ajax({
                url: `/rejectAccount/${scholarshipId}`,
                type: "POST",
                success: function (response) {
                    alert(response.msg);
                    scholarshipPending();
                    rejectedScholarships();
                    accountPending();
                },
                error: function (error) {
                    console.error("Error:", error);
                }
            });
        }
    });
}