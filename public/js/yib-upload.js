const yibUpload={
    variable: {
            storageUrl: null,
            activeNav: "yib-uploader-link-tab",
            collectionPage: 1,
            collectionLimit: 10,
            collectionTotalPage: 0,
            target: null
    },
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
                                            <input type="hidden" name="_csrf" value="${$("meta[name='csrf-token']").attr("content")}">
                                            <button class="btn btn-secondary" type="submit">Save</button>
                                        </div>
                                    </div>
                                </form>
                                <div class="row mt-3">
                                    <div class="col-md-12" id="result">
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="upload" role="tabpanel" aria-labelledby="yib-uploader-upload-tab">
                                <div class="row mt-3">
                                    <div class="col-md-12">
                                        <form id="upload-form">
                                            <input type="file" name="photo" accept="image/*">
                                            <input type="hidden" name="_csrf" value="${$("meta[name='csrf-token']").attr("content")}">
                                            <button class="btn btn-secondary" type="submit">Upload</button>
                                        </form>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-12">
                                        <div class="row" id="all-photos">

                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4 text-left">
                                        <a href="javascript:void(0)" id="prev-collection">prev</a>
                                    </div>
                                    <div class="col-md-4 text-center">
                                        <span id="page-collection"></span>
                                    </div>
                                    <div class="col-md-4 text-right">
                                        <a href="javascript:void(0)" id="next-collection">next</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" id="close-card">Close</button>
                        <button type="button" class="btn btn-primary" id="insert-selected" disabled >Insert</button>
                    </div>
                </div>
            </div>
        </div>`);
        }
        else{
            
        }
        yibUpload.variable.target = $(this).data("target");
        $("#yib-modal-uploader").modal("show");
    },
    closeCard: function(){
        $("#yib-modal-uploader #result").html("");
        $("#yib-modal-uploader #yib-uploader-link-tab").click();
        yibUpload.variable.storageUrl = null;
        $("#yib-modal-uploader #insert-selected").attr("disabled","");
    },
    formInsertLinkImage: function(e){
        e.preventDefault();
        var err_total = 0;
        var err = {};
        $("#yib-modal-uploader form#yib-uploader-get-image .error").remove();
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
        // else if(!(url.match(/\.(jpeg|jpg|gif|png)$/) != null)){
        //     if(typeof err.url == "undefined"){
        //         err.url = [];
        //     }
        //     err.url.push("Image url is invalid.");
        //     err_total++;
        // }

        if(err_total!=0){
            for(var key in err){
                var value = err[key];
                var html = "";
                for(var i = 0; i<value.length; i++){
                    html = html + "<li>" + value[i] + "</li>";
                }
                html="<ul>"+html+"</ul>";
                $("#yib-modal-uploader form#yib-uploader-get-image [name='"+key+"']").parent().append(`<div class="error alert alert-danger">${html}</div>`);
            }
        }
        else{
            $.ajax({
                url: "/save-image",
                type: "POST",
                data: new FormData(this),
                contentType: false,
                cache: false,
                processData: false,
                beforeSend: function(){
                    Swal.showLoading();
                },
                success: function(data){
                    Swal.fire({
                        type: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(function(){
                        $("#yib-modal-uploader #result").html(`
                            <img src="/${data.data}" style="width: 300px">
                        `);

                        yibUpload.variable.storageUrl = data.data;

                        $("#yib-modal-uploader form#yib-uploader-get-image")[0].reset();
                        $("#yib-modal-uploader #insert-selected").removeAttr("disabled");
                    });
                },
                error: function(xhr){
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: xhr.responseJSON.msg,
                        footer: '<a href>Why do I have this issue?</a>'
                    });
                }
            });
        }
    },
    resetStorageUrl: function(){
        
        yibUpload.variable.storageUrl = null;
        $("#yib-modal-uploader #insert-selected").attr("disabled","");
        
        yibUpload.variable.activeNav = $(this).attr("id");

        if($(this).attr("id")=="yib-uploader-upload-tab"){
            $("#yib-modal-uploader #all-photos").html("");
            $.ajax({
                url: "/get-my-image/"+yibUpload.variable.collectionLimit+"/"+yibUpload.variable.collectionPage,
                type: "GET",
                beforeSend: function(){
                    
                },
                success: function(data){
                    data.data.data.forEach((value, key)=>{
                        $("#yib-modal-uploader #all-photos").append("<div class=\"col-md-3 item-photo mb-1\" data-url=\""+value.name+"\"><img class=\"img-fluid\" src=\"/"+value.nameCache+"\"></div>");
                    });
                    var total = data.data.total;
                    var limit = yibUpload.variable.collectionLimit;
                    yibUpload.variable.collectionTotalPage = Math.ceil(total/limit)

                    $("#yib-modal-uploader #page-collection").text(`${yibUpload.variable.collectionPage}/${yibUpload.variable.collectionTotalPage}`);
                },
                error: function(xhr){
                    
                }
            });
        }
    },
    selectedPhoto: function(){
        $("#yib-modal-uploader .item-photo").attr("style", "");
        $(this).attr("style", "background-color: #ccc;");
        yibUpload.variable.storageUrl = $(this).data("url");
        $("#yib-modal-uploader #insert-selected").removeAttr("disabled");
    },
    uploadForm: function(e){
        e.preventDefault();

        if($("#yib-modal-uploader #upload-form [name='photo']")[0].files.length!=0){
            $.ajax({
                url: "/upload-image",
                type: "POST",
                data: new FormData(this),
                contentType: false,
                cache: false,
                processData: false,
                beforeSend: function(){
                    Swal.showLoading();
                },
                success: function(data){
                    Swal.fire({
                        type: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(function(){

                        $("#yib-modal-uploader #upload-form")[0].reset();
                        yibUpload.variable.collectionPage = 1;
                        $("#yib-modal-uploader #"+yibUpload.variable.activeNav).click();
                    });
                },
                error: function(xhr){
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: xhr.responseJSON.msg,
                        footer: '<a href>Why do I have this issue?</a>'
                    });
                }
            });
        }
    },
    insertToTarget: function(){
        $(yibUpload.variable.target).val(yibUpload.variable.storageUrl);
        $("#yib-modal-uploader").modal('hide');
        $("#yib-modal-uploader #close-card").click();
    },
    nextCollection: function(){

        if((yibUpload.variable.collectionPage + 1) <= yibUpload.variable.collectionTotalPage){
            yibUpload.variable.collectionPage = yibUpload.variable.collectionPage + 1;
            $("#yib-modal-uploader #"+yibUpload.variable.activeNav).click();
        }

    },
    prevCollection: function(){

        if((yibUpload.variable.collectionPage - 1) >= 1){
            yibUpload.variable.collectionPage = yibUpload.variable.collectionPage - 1;
            $("#yib-modal-uploader #"+yibUpload.variable.activeNav).click();
        }

    },
    init: function(){
        $(".yib-uploader").on("click", this.openCard);
        $("body").on("hide.bs.modal", "#yib-modal-uploader", this.closeCard);
        $("body").on("submit", "#yib-modal-uploader form#yib-uploader-get-image", this.formInsertLinkImage);
        $("body").on("click", "#yib-modal-uploader .nav-link", this.resetStorageUrl);
        $("body").on("click","#yib-modal-uploader .item-photo", this.selectedPhoto);
        $("body").on("submit","#yib-modal-uploader #upload-form", this.uploadForm);
        $("body").on("click", "#yib-modal-uploader #insert-selected", this.insertToTarget);
        $("body").on("click", "#yib-modal-uploader #next-collection", this.nextCollection);
        $("body").on("click", "#yib-modal-uploader #prev-collection", this.prevCollection);
    }
}