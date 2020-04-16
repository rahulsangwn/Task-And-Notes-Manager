function updateTask(id) {
    console.log(id)

    var Duedate = document.getElementById("duedateTask").value;
    var Priority = document.getElementById("priorityTask").value;
    var State = "Incomplete";
    if (document.getElementById('stateTask').checked) {
        taskStatus = "Complete";
    }
    $.ajax({
        datatype: 'json',
        url: '/todos/' + id,
        type: 'patch',
        data: { state: State, duedate: Duedate, priority: Priority },
        success: function (data) {
            console.log("successfully edited Task ");
        }

    });
    //reloadComponent;
    location.reload(true);
}

$(document).ready(function () {
    var d = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var month = d.getMonth() + 1;
    var day = d.getDate();

    var output = d.getFullYear() + '-' +
        (month < 10 ? '0' : '') + month + '-' +
        (day < 10 ? '0' : '') + day;

    $('#due-date').val(output)


    var flag = false;
    $('a.list-group-item').click(function () {
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
        $.getJSON(urlNotes, function (data) {
            data.forEach(element => {
                var text = `<li class="list-group-item list-group-item-success">${element.Body}</li>`
                $(collapseid).append(text);
            })
        });

        const urlTask = 'http://localhost:3001/todos/' + id

        $.getJSON(urlTask, function (data) {
            console.log("requested")
            const url = 'http://localhost:3001/todos/' + data.Id
            var editContent = `
            <div class="collapse ${flag ? "show" : ""}" id="${collapseid2}">
                <h4 class="text-center">Edit "${data.Title}" Task</h4>
                <form class="form-inline">
                    <div class="form-check my-1 mr-sm-2">
                        <label class="form-check-label" for="stateTask">Is Completed? </label>
                        <input type="checkbox" style="margin-left: 8px;" value="" name="state" id="stateTask" class="form-check-input">
                    </div>
                    <input type="hidden" name="id" id="idTask" value="${data.Id}">
                    <div>
                        <input class="form-control" type="date" id="duedateTask" name="duedate" value=${data.DueDate.substring(0, 10)}>
                    </div>

                    <select class="custom-select my-1 mr-sm-2" id="priorityTask" name="priority">
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>


                    <button type="button" class="btn btn-primary my-1" onclick="updateTask(${data.Id})">Update</button>
                </form>
                <hr>
            </div>
            `

            $('.editTag').append(editContent);
            $('select').val(data.Priority).attr("selected", "selected")
            if (data.State == 'Complete') {
                //document.getElementById('stateTask').checked = true;
                $('#stateTask').prop('checked', true);
            }
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
        contentType: "application/json",
        success: function (data) {
            console.log(data)
        }

    });
    var collapseid = '#collapse' + id
    var text = `<li class="list-group-item list-group-item-success">${note}</li>`
    $(collapseid).append(text);
}

$('#form-create-task').submit(function () {
    var obj = $('#form-create-task').serializeJSON();

    $.ajax({
        type: "POST",
        url: "http://localhost:3001/todos/",
        data: JSON.stringify(obj),
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            console.log(data)
        }

    });
})






