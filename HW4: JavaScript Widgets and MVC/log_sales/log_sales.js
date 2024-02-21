$(document).ready(function () {
    const salespersonName = "Aarushi Sharma";
    let clients = [
        "Shake Shack",
        "Toast",
        "Computer Science Department",
        "Teacher's College",
        "Starbucks",
        "Subsconsious",
        "Flat Top",
        "Joe's Coffee",
        "Max Caffe",
        "Nussbaum & Wu",
        "Taco Bell",
    ];

    $("#clientName").autocomplete({
        source: clients, select: function (event, ui) {
            // Handle client selection
        }
    });


    let sales = [
        {
            "salesperson": "James D. Halpert",
            "client": "Shake Shack",
            "reams": 100
        },
        {
            "salesperson": "Stanley Hudson",
            "client": "Toast",
            "reams": 400
        },
        {
            "salesperson": "Michael G. Scott",
            "client": "Computer Science Department",
            "reams": 1000
        },
    ];

    updateSalesView()

    // Click event for the submit button
    $("#submitSale").click(function () {
        handleAddSale();
    });

    // Key press (Enter key) event for the "#reams" input field
    $("#reams").keypress(function (e) {
        if (e.which === 13) { // Check for the Enter key press
            e.preventDefault(); 
            handleAddSale(); 
        }
    });

    $("#trash").droppable({
        accept: ".sale-record",
        classes: {
            "ui-droppable-hover": "trash-hover" 
        },
        drop: function (event, ui) {
            const index = ui.draggable.data('index');
            sales.splice(index, 1); // Update the model
            updateSalesView(); // Refresh the view to reflect model changes
        }
    });


    // Function to handle adding a sale
    function handleAddSale() {
        let client = $("#clientName").val().trim();
        let reams = $("#reams").val().trim();

        // Reset error messages and flag for errors
        let hasErrors = false;
        $("#clientError, #reamsError").empty(); // Clear all error messages at once

        // Validate client name
        if (!client) {
            $("#clientError").text("Please enter a client name."); 
            hasErrors = true;
        } else if (!clients.includes(client)) {
            clients.push(client); // Add new client to the array if it doesn't exist
            $("#clientName").autocomplete("option", "source", clients); // Update the autocomplete source
        }

        // Validate reams input
        if (!reams || isNaN(parseFloat(reams))) {
            $("#reamsError").text("Reams must be a number.");
            hasErrors = true;
        }

        // Focus on the first field with an error or proceed if no errors
        if (hasErrors) {
            !client ? $("#clientName").focus() : $("#reams").focus();
            return; // Stop execution
        } else {
            // Add new sale to the model and reset form
            sales.unshift({ salesperson: salespersonName, client: client, reams: parseInt(reams, 10) });
            updateSalesView(); 
            $("#clientName, #reams").val(''); // Clear both inputs at once
            $("#clientName").focus(); // Set focus back to the client input
        }
    }

    function updateSalesView() {
        let salesRecordsDiv = $("#salesRecords");
        salesRecordsDiv.empty(); // Clear existing view first

        sales.forEach((sale, index) => {
            // Constructing sale record HTML string
            let saleRecordHTML = `
                <div class="row mb-2 sale-record" data-index="${index}">
                    <div class="col">${sale.salesperson}</div>
                    <div class="col">${sale.client}</div>
                    <div class="col">${sale.reams}</div>
                    <div class="col">
                        <button class="btn btn-danger delete-sale" data-index="${index}">Delete</button>
                    </div>
                </div>`;

            // Append the new sale to the view
            let saleRecord = $(saleRecordHTML).appendTo(salesRecordsDiv);
            saleRecord.draggable({
                cursor: "move",
                helper: "clone",
                revert: "invalid",
                start: function () { $(this).css('opacity', '0.5'); },
                stop: function () { $(this).css('opacity', '1'); }
            });
        });



    }

    // Use event handler for clicka on delete button
    $("#salesRecords").on('click', '.delete-sale', function () {
        let index = $(this).data("index"); // Get the index of the sale to be deleted
        sales.splice(index, 1); // Remove the sale from the model
        updateSalesView(); // Refresh the view to reflect the updated model
    });


    // Droppable trash area setup
    $("#trash").droppable({
        accept: ".sale-record",
        classes: { "ui-droppable-hover": "trash-hover" },
        drop: function (event, ui) {
            let index = ui.draggable.data('index');
            sales.splice(index, 1); // Remove from the model
            updateSalesView(); // Update view to reflect the current model
        }
    });

});