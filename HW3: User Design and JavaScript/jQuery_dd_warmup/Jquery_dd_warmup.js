$(function () {
    $("#draggable").draggable({
        cursor: "move", // Changes the cursor during the drag
        revert: "invalid" // Ensures the draggable reverts if not dropped on a valid target
    });

    $("#droppable").droppable({
        drop: function (event, ui) {
            $(this)
                .addClass("ui-state-highlight")
                .find("p")
                .html("Dropped!");
        },
        over: function (event, ui) {
            $(this).css('background-color', 'limegreen'); // Changes color when draggable is over it
        },
        out: function (event, ui) {
            $(this).css('background-color', ''); // Resets to original color when draggable is moved away
        }
    });
});
