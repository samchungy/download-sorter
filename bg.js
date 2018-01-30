chrome.downloads.onDeterminingFilename.addListener(function(item, __suggest) {
    function suggest(filename, conflictAction) {
        __suggest({filename: filename,
            conflictAction: conflictAction,
            conflict_action: conflictAction});
        // conflict_action was renamed to conflictAction in
        // https://chromium.googlesource.com/chromium/src/+/f1d784d6938b8fe8e0d257e41b26341992c2552c
        // which was first picked up in branch 1580.
    }
    if (item.mime == 'text/html'){
        console.log('success');
        suggest('documents\\'+item.filename,'overwrite');
    }
    console.log(item.mime);

});