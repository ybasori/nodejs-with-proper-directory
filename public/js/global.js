const validator = {
    render: function(xhr){
        if(xhr){
            if(xhr.responseJSON){
                var error=xhr.responseJSON;
                if(error.errors!=undefined){
                    var errors = error.errors

                    return errors;
                }
            }
        }
    }
}

const navMenu = {
    init: function(){
        var uris = window.location.pathname.split("/");
        var i=0;
        uris.forEach(function(value, key){
            if(key!=0){
                $(".global-menu-"+value).addClass("active");
            }
        });
    }
}