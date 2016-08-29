$(document).ready(function() {
    $(function() {
        $('#mail').focus(function() {
            $(document).keydown(function(e) {
                if (e.keyCode == 13) {
                    console.log('fuck');
                }
            });
        });
    });
});
