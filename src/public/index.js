$(document).ready(function(){
    var d = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var month = d.getMonth()+1;
    var day = d.getDate();

    var output = d.getFullYear() + '-' +
        (month<10 ? '0' : '') + month + '-' +
        (day<10 ? '0' : '') + day;

    $('#due-date').val(output)


    var flag = false;
    $('a.list-group-item').click(function() { 
        var id = $(this).attr('id');
        flag = !flag
        const collapseid = '#collapse' + id
        const collapseid2 = 'collapse' + id
        $(collapseid).empty()
        $('.editTag').empty()

        var input = `<div class="input-group">
            <input type="text" class="form-control" id="task${id}" placeholder="Enter Note to Create" aria-label="Recipient's username" aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <button class="btn btn-primary note-create" id="${id}" type="button" onclick="createNote(this.id)">Create</button>
                </div>
            </div>`
        $(collapseid).append(input)
        //$container.cycle(id.replace('#', '')); 
        //return false; 
        const urlNotes = 'http://localhost:3001/todos/' + id + '/notes'
        //console.log(url)
        $.getJSON(urlNotes, function(data) {
            data.forEach(element => {
                var text = `<li class="list-group-item list-group-item-success">${element.Body}</li>`
                $(collapseid).append(text);
            })
        });

        const urlTask = 'http://localhost:3001/todos/' + id
        
        $.getJSON(urlTask, function(data) {
            console.log("requested")
            var editContent = `
            <div class="collapse ${flag ? "show": ""}" id="${collapseid2}">
                <h4 class="text-center">Edit this Task</h4>
                <form class="form-inline">
                    <div class="custom-control custom-checkbox my-1 mr-sm-2">
                        <input type="checkbox" class="custom-control-input" id="customControlInline">
                        <label class="custom-control-label" for="customControlInline">Is Completed?</label>
                    </div>

                    <div>
                        <input class="form-control" type="date" name="duedate" id="">
                    </div>

                    <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                        <option selected>Priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>


                    <button type="submit" class="btn btn-primary my-1">Update</button>
                </form>
                <hr>
            </div>
            `

            $('.editTag').append(editContent);
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






