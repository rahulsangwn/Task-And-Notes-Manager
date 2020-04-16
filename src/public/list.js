function listing(sortId) {
    $('.myclass').empty()
    console.log(sortId)
    $.getJSON('/todos', function (data) {
        if (sortId == 1) {
            data.sort(function (a, b) {
                return new Date(b.DueDate) - new Date(a.DueDate);
            });
        } else if (sortId == 2) {
            data.sort(function (a, b) {
                return new Date(a.DueDate) - new Date(b.DueDate);
            });
        } else if (sortId == 3) {
            var sortOrder = ['High', 'Medium', 'Low'];   
            data.sort(
                function (a, b) {                             
                    if (a.Priority == b.Priority) {                   
                        return a.Title.localeCompare(b.Title); 
                    } else {                                   
                        return sortOrder.indexOf(a.Priority) - sortOrder.indexOf(b.Priority); 
                    }
                }
            );
        } else if (sortId == 4) {
            var sortOrder = ['Incomplete', 'Complete'];  
            data.sort(
                function (a, b) {                             
                    if (a.State == b.State) {                    
                        return a.Title.localeCompare(b.Title); 
                    } else {                                   
                        return sortOrder.indexOf(a.State) - sortOrder.indexOf(b.State); 
                    }
                }
            );
        }



        console.log(data)
        data.forEach(element => {
            var text = `
            <a href="#collapse${element.Id}" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="collapse${element.Id}" 
                class="list-group-item list-group-item-action flex-column align-items-start" id="${element.Id}" onclick="notesView(this.id)">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">${element.Title}</h5>
                    <small>Priority: ${element.Priority}</small>
                </div>
                <p class="mb-1">${element.Description}</p>
                <div class="d-flex w-100 justify-content-between">
                    <h6 class="">State: ${element.State}</h6>
                    <small>Due Date: ${element.DueDate.substring(0, 10)}</small>
                </div>
            </a>
            <div class="collapse" id="collapse${element.Id}">
                
            </div>
            `
            $(".myclass").append(text);
        });
    })
}