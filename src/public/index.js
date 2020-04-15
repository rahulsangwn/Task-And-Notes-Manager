$(document).ready(function(){
    var d = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var month = d.getMonth()+1;
    var day = d.getDate();

    var output = d.getFullYear() + '-' +
        (month<10 ? '0' : '') + month + '-' +
        (day<10 ? '0' : '') + day;

    $('#due-date').val(output)
})

$('#form-create-task').submit(function() {
    var obj = $('#form-create-task').serializeJSON();

    $.ajax({
        type: "POST",
        url: "http://localhost:3001/todos/",
        data: JSON.stringify(obj),
        dataType: "json",
        contentType : "application/json",
        success: function(data){
            console.log(data)
        }
        
      });
})

