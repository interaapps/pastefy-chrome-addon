function fakePost(params) {   
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "https://pastefy.ga/create:paste");
    
    for(var key in params) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);

        form.appendChild(hiddenField);
    }
    document.body.appendChild(form);
    form.submit();
}
$(document).ready(function() {
    $("#submit").click(function() {
        console.log("asfdasfdasfdasfdas");
        fakePostCode = fakePost.toString().replace(/(\n|\t)/gm,'');
        const params = {
            title: $("#title").val(),
            content: $("#input_contents").val(),
            folder: $("#folderList").val()
        };
        console.log(JSON.stringify(params));
        chrome.tabs.create({"url" : "javascript:"+fakePostCode+"; fakePost("+JSON.stringify(params)+");"});
    });

    $(".clear").click(function(){
        $("#input_contents").val("");
    });

    $("#optional_paste_options").hide();
    $("#optional_button").click(function(){
        $("#optional_paste_options").show();
    });

    $("#folderLoadingIndicator").html("<br>Loading the folders, please wait... are you logged in? <a target='_blank' href='https://pastefy.ga/pasteList'>Login</a> <br>");
    Cajax.post("https://pastefy.ga/get:folder").then((resp)=>{
        responseJson = JSON.parse(resp.responseText);
        $("#folderLoadingIndicator").html("");
        for (obj in responseJson) {
            var option = new Option(responseJson[obj], obj);
            $(option).html(responseJson[obj]);
            $("#folderList").append(option);
            if (window.location.hash=="#"+obj)
                $("#folderList").val(obj);
        }

    }).catch(()=>{
        $("#folderLoadingIndicator").html("Couldn't load the folder!");
    }).send();
});
