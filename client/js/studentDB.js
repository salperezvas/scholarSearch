retrieveData();  //Get inital load

var tableSorterActive = false;

function retrieveData() {
    //Retrieve the library data and populate on page load
    // $.ajax({
    //     url: ,
    //     type:,
    //     success: function(response){

    //     },
    //     error: function(err){
    //         alert(err);
    //     }
    // });
}

function createLibraryTable(libraryData) {
    console.log(libraryData);

    var tableHTML = "";
    for(var i=0; i<libraryData.length; i++) {
        tableHTML += "<tr>";

        tableHTML += "<td>" + libraryData[i].bookId + "</td>";

        tableHTML += "<td>" + libraryData[i].bookTitle + "</td>";
        tableHTML += "<td>" + libraryData[i].author + "</td>";
        tableHTML += "<td>" + libraryData[i].publisher + "</td>";
        tableHTML += "<td>" + libraryData[i].yearPublished + "</td>";
        tableHTML += "<td>" + libraryData[i].isbn + "</td>";
        tableHTML += "<td>" 
                    +"<button class='btn btn-sm edit_btn delete-button' "
                    + "data-id='" + libraryData[i].ID 
                    + "'>DELETE</button>"
                    + "</td>";
        tableHTML += "</tr>";
    }

    $("#libraryTable").html(tableHTML);
    
    activateDelete();
}

function activateDelete() {
    $('.delete-button').click(function() {
        
        // $.ajax({
        //     url: ,
        //     type:,
        //     data: ,
        //     success: function(response){
        //     },
        //     error: function(err){
        //         alert(err);
        //     }
        // });

    });
}

