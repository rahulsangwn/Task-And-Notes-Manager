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

        var input = `<div class="input-group">
            <input type="text" class="form-control" id="task${id}" placeholder="Enter Note to Create" aria-label="Recipient's username" aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <button class="btn btn-primary note-create" id="${id}" type="button" onclick="createNote(this.id)">Create</button>
                </div>
            </div>`
        $(collapseid).append(input)
        //$container.cycle(id.replace('#', '')); 
        //return false; 
        const url = 'http://localhost:3001/todos/' + id + '/notes'
        //console.log(url)
        $.getJSON(url, function(data) {
            data.forEach(element => {
                var text = `<li class="list-group-item list-group-item-success">${element.Body}</li>`
                $(collapseid).append(text);
            })
        });
    })
})

function createNote(id) {
    taskId = 'task' + id
    var note = document.getElementById(taskId).value
    var item = {}
    item["body"] = note;
    item["id"] = id;
    console.log(item);
    const url = 'http://localhost:3001/todos/' + id + '/notes'
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(item),
        dataType: "json",
        contentType : "application/json",
        success: function(data){
            console.log(data)
        }
        
    });
    var collapseid = '#collapse' + id
    var text = `<li class="list-group-item list-group-item-success">${note}</li>`
    $(collapseid).append(text);
}

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






