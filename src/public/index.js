$(document).ready(function(){
    var d = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var month = d.getMonth()+1;
    var day = d.getDate();

    var output = d.getFullYear() + '-' +
        (month<10 ? '0' : '') + month + '-' +
        (day<10 ? '0' : '') + day;

    $('#due-date').val(output)


    $('a.list-group-item').click(function() { 
        var id = $(this).attr('id');
        var collapseid = '#collapse' + id
        $(collapseid).empty()
        //$container.cycle(id.replace('#', '')); 
        //return false; 
        const url = 'http://localhost:3001/todos/' + id + '/notes'
        console.log(url)
        $.getJSON(url, function(data) {
            data.forEach(element => {
                var text = `<li class="list-group-item list-group-item-success">${element.Body}</li>`
                
                $(collapseid).append(text);
            })
        });
    })
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






