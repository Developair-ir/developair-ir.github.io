$(document).ready(function(){
    toggleSearchResultDisplay()
    
    $('#search-input').on('keyup', () => {
        toggleSearchResultDisplay()
    });

    $('#results-container').on('DOMSubtreeModified',  () => {
        toggleSearchResultDisplay()
   });
});

function toggleSearchResultDisplay() {
    var hasValue = $('#results-container li').length > 0 || $('#results-container').html() != "";
        if (!hasValue) {
            $('#results-container').css('display',"none")
        }else {
            $('#results-container').css('display',"flex");
        }
}