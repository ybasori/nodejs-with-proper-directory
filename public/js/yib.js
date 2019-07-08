const yib={
    openCard: function(){
        if(typeof $("#yib-modal-uploader").html() == "undefined"){
            $("body").prepend(`<div class="modal" id="yib-modal-uploader" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <ul class="nav nav-tabs" id="yib-uploader-tab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="yib-uploader-link-tab" data-toggle="tab" href="#link" role="tab" aria-controls="link" aria-selected="true">Link</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="yib-uploader-upload-tab" data-toggle="tab" href="#upload" role="tab" aria-controls="upload" aria-selected="false">Upload</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="yib-uploader-tab-content">
                            <div class="tab-pane fade show active" id="link" role="tabpanel" aria-labelledby="yib-uploader-link-tab">
                                <form id="yib-uploader-get-image" class="mt-3">
                                    <div class="row">
                                        <div class="col-md-9">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <input name="url" class="form-control" placeholder="http:// or https://">
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div class="col-md-3">
                                            <button class="btn btn-secondary" type="submit">Insert</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="tab-pane fade" id="upload" role="tabpanel" aria-labelledby="yib-uploader-upload-tab">dua</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>`);
        }
        else{

        }
        $("#yib-modal-uploader").modal("show");
    },
    formInsertLinkImage: function(e){
        e.preventDefault();
        var err_total = 0;
        var err = {};
        $("form#yib-uploader-get-image .error").remove();
        var url = $(this).find("[name='url']").val();
        if(url == ""){
            if(typeof err.url == "undefined"){
                err.url = [];
            }
            err.url.push("Image url is required.");
            err_total++;
        }
        if ((url.indexOf("http://") != 0 && url.indexOf("https://") != 0)) {
            
            if(typeof err.url == "undefined"){
                err.url = [];
            }
            err.url.push("Image url is invalid.");
            err_total++;
        }
        else if(!(url.match(/\.(jpeg|jpg|gif|png)$/) != null)){
            if(typeof err.url == "undefined"){
                err.url = [];
            }
            err.url.push("Image url is invalid.");
            err_total++;
        }

        if(err_total!=0){
            for(var key in err){
                var value = err[key];
                var html = "";
                for(var i = 0; i<value.length; i++){
                    html = html + "<li>" + value[i] + "</li>";
                }
                html="<ul>"+html+"</ul>";
                $("form#yib-uploader-get-image [name='"+key+"']").parent().append(`<div class="error alert alert-danger">${html}</div>`);
            }
        }

        console.log(err);
    },
    init: function(){
        $(".yib-uploader").on("click", this.openCard);
        $("body").on("submit", "form#yib-uploader-get-image", this.formInsertLinkImage);
    }
}