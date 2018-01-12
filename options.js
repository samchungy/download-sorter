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
    var text = "<li>\n" +
        "        <div class=\"collapsible-header\">New Category</div>\n" +
        "        <div class=\"collapsible-body\">\n" +
        "            <span>Lorem ipsum dolor sit amet.</span>\n" +
        "            <hr>\n" +
        "            <div class=\"tools\">\n" +
        "                <span class=\"rename\"><a href=\"#\">Rename</a></span>\n" +
        "                <span class=\"delete\"><a href=\"#\">Delete</a></span>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </li>"

    $( ".collapsible" ).append( $( text ) );
}


document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('add').addEventListener('click',
    add_category);
$(document).ready(function(){
    $("#categories").on('click','.delete',function(){
        $(this).closest('li').remove();
    });
});