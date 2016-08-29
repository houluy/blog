/***************** Susbscribe Submit ******************/
$(document).ready(function() {
    $(function(){
        $('#mail').blur(function() {
            var $parent = $(this).parent();
            //$parent.find(".formtips").remove();
            var msg = "";
            if(this.value == "" || (this.value != "" && !/.+@.+\.[a-zA-Z]{2,4}$/.test(this.value) ) ){
                msg = "Invalid email address!";
            }else{
                msg = "Success!";
            } 
            $parent.append("<span >" + msg + "</span>");
        }
    });

    $('#subsub').click(function() {
        $(this).submit();
    });
});
