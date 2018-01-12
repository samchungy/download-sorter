// Saves options to chrome.storage.sync.
function save_options() {
    var color = document.getElementById('color').value;
    var likesColor = document.getElementById('like').checked;
    chrome.storage.sync.set({
        favoriteColor: color,
        likesColor: likesColor
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        favoriteColor: 'red',
        likesColor: true
    }, function(items) {
        document.getElementById('color').value = items.favoriteColor;
        document.getElementById('like').checked = items.likesColor;
    });
}

function add_category(){
    console.log("Category Added");
    var text = "    <div class=\"section\">\n" +
        "        <button class=\"accordion\">New Category</button>\n" +
        "        <div class=\"panel\">\n" +
        "            <span>Lorem ipsum dolor sit amet.</span>\n" +
        "            <hr>\n" +
        "            <div class=\"tools\">\n" +
        "                <span class=\"rename\"><a href=\"#\">Rename</a></span>\n" +
        "                <span class=\"delete\"><a href=\"#\">Delete</a></span>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </div>"

    $( ".collapsible" ).append( $( text ) );
}

function add_listener(){

}


document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('add').addEventListener('click',
    add_category);

$(document).ready(function(){
    //Category Toggles
    $("#categories").on('click', '.accordion', function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight){
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });

    //Delete Category Prompt Confirmation
    $("#categories").on('click','.delete',function(){
        var confirmation = "<span class=\"floatright\"> Are you sure you want to delete this?\n" +
            "    <a href=\"#\" class=\"confirm_delete\">Yes</a> | <a href=\"#\" class=\"cancel_delete\">No</a>\n" +
            "</span>"
        $(this).replaceWith(confirmation);
    });

    //Rename Category
    $("#categories").on('click','.rename',function(){
        var confirmation = "<span class=\"floatright\"> Are you sure you want to delete this?\n" +
            "    <a href=\"#\" class=\"confirm_delete\">Yes</a> | <a href=\"#\" class=\"cancel_delete\">No</a>\n" +
            "</span>"
        $(this).replaceWith(confirmation);
    });

    //Confirmed Deletion
    $("#categories").on('click','.confirm_delete',function(){
        $(this).closest('div').parent().closest('div').parent().closest('div').remove();
    });

    //Cancelled Deletion
    $("#categories").on('click','.cancel_delete',function(){
        var deletetext = "<span class=\"delete\"><a href=\"#\">Delete</a></span>";
        $(this).closest('span').replaceWith(deletetext);
    });

});