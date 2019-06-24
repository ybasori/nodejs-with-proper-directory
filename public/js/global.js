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