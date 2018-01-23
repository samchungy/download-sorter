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
    var text = "    <div class=\"section\" data-editmode=\"false\">\n" +
        "        <button class=\"accordion\">New Category</button>\n" +
        "        <div class=\"panel\">\n" +
        "\t\t\t<br>\n" +
        "            <span>Lorem ipsum dolor sit amet.</span>\n" +
        "            <hr>\n" +
        "            <div class=\"tools\">\n" +
        "                <span class=\"rename\"><a href=\"#\">Rename</a></span>\n" +
        "                <span class=\"delete\"><a href=\"#\">Delete</a></span>\n" +
        "            </div>\n" +
        "\t\t\t<br>\n" +
        "\t\t\t<br>\n" +
        "        </div>\n" +
        "    </div>";

    $( ".collapsible" ).append( $( text ) );
}

function show_default_folder(){
    chrome.downloads.showDefaultFolder();
}


document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('show').addEventListener('click',
    show_default_folder);
document.getElementById('add').addEventListener('click',
    add_category);

$(document).ready(function(){

    //Category Toggles
    $("#categories").on('click', '.accordion', function() {
        if ($(this).parent().attr('data-editmode') == "false"){
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight){
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
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
        var confirmation = "<span class=\"floatleft\"><a href=\"#\" class=\"confirm_rename\">Done</a> | <a href=\"#\" class=\"cancel_rename\">Cancel</a>\n" +
            "</span>";
		var oldtext = $(this).parent().parent().parent().find('button').text();
		var textinput = "<input class=\"textedit\" type=\"text\" name=\"firstname\" value=\"" + oldtext + "\" placeholder=\"" + oldtext + "\" maxlength=\"20\">";
		$(this).parent().parent().parent().find('button').html(textinput);
		$(this).parent().parent().parent().attr('data-editmode',true);
        $(this).replaceWith(confirmation);
    });
	
	//Enter Key pressed
	$("#categories").on('keypress','.textedit', function(e) {
            if (e.keyCode == 13) {
                var oldtext = "<span class=\"rename\"><a href=\"#\">Rename</a></span>";
                $(this).parent().parent().find('.floatleft').replaceWith(oldtext);
                var new_name = $(this).val();
                $(this).parent().parent().attr('data-editmode',false);
				$(this).parent().html(new_name);
            }
    });
	
	//Confirm Rename
    $("#categories").on('click','.confirm_rename',function(){
		var new_name = $(this).parent().parent().parent().parent().find('button').find('input').val();
		$(this).parent().parent().parent().parent().find('button').html(new_name);
		var rename = "<span class=\"rename\"><a href=\"#\">Rename</a></span>\n";
		$(this).parent().parent().parent().parent().attr('data-editmode',false);
        $(this).closest('span').replaceWith(rename);
    });
	
	//Canceled Rename
	$("#categories").on('click','.cancel_rename',function(){
		var new_name = $(this).parent().parent().parent().parent().find('button').find('input').attr('placeholder');
		$(this).parent().parent().parent().parent().find('button').html(new_name);
        var rename = "<span class=\"rename\"><a href=\"#\">Rename</a></span>\n"
        $(this).parent().parent().parent().parent().attr('data-editmode',false);
        $(this).closest('span').replaceWith(rename);
		
    });
	
    //Confirmed Deletion
    $("#categories").on('click','.confirm_delete',function(){
        $(this).closest('div').parent().closest('div').parent().remove();
    });

    //Canceled Deletion
    $("#categories").on('click','.cancel_delete',function(){
        var deletetext = "<span class=\"delete\"><a href=\"#\">Delete</a></span>";
        $(this).closest('span').replaceWith(deletetext);
    });

    //Change Directory
    $("#categories").on('click','.edit_dir',function(){
        $(this).parent().parent().parent().attr('data-editmode',true);
        var oldtext = $(this).prev('span').find('b').text();
        var confirmation = "<div class=\"directory\">\n" +
            "<span class=\"dir_name\"><input class=\"dir_input\" placeholder=\""+ oldtext + "\"" +
            "value=\"" + oldtext + "\"></span>" +
            "<span class=\"edit_dir_yes\"><a href=\"#\">&#10004;</a></span><br></div>";
        $(this).parent().replaceWith(confirmation);
    });

    //Edit Directory Confirm
    $("#categories").on('click','.edit_dir_yes',function(){
        $(this).parent().parent().parent().attr('data-editmode',false);
        var newtext = "<div class=\"directory\">\n" +
            "<span class=\"dir_name\"><em>[default directory]\\</em><b>"+ $(this).prev('span').find('input').val() +"</b></span>\n" +
            "<span class=\"edit_dir\"><a href=\"#\">&#9998;</a></span>\n" +
            "</div>";
        $(this).parent().replaceWith(newtext);
    });

    //Default Directory Prompt
    $("#categories").on('click','.popup',function(){
        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
    });

});
