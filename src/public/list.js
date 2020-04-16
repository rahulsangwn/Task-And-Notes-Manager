function listing(sortId) {
    $('.myclass').empty()
    console.log(sortId)
    $.getJSON('http://localhost:3001/todos', function (data) {
        if (sortId == 1) {
            data.sort(function (a, b) {
                return new Date(b.DueDate) - new Date(a.DueDate);
            });
        } else if (sortId == 2) {
            data.sort(function (a, b) {
                return new Date(a.DueDate) - new Date(b.DueDate);
            });
        } else if (sortId == 3) {
            var sortOrder = ['High', 'Medium', 'Low'];   // Declare a array that defines the order of the elements to be sorted.
            data.sort(
                function (a, b) {                              // Pass a function to the sort that takes 2 elements to compare
                    if (a.Priority == b.Priority) {                    // If the elements both have the same `type`,
                        return a.Title.localeCompare(b.Title); // Compare the elements by `name`.
                    } else {                                   // Otherwise,
                        return sortOrder.indexOf(a.Priority) - sortOrder.indexOf(b.Priority); // Substract indexes, If element `a` comes first in the array, the returned value will be negative, resulting in it being sorted before `b`, and vice versa.
                    }
                }
            );
        } else if (sortId == 4) {
            var sortOrder = ['Incomplete', 'Complete'];   // Declare a array that defines the order of the elements to be sorted.
            data.sort(
                function (a, b) {                              // Pass a function to the sort that takes 2 elements to compare
                    if (a.State == b.State) {                    // If the elements both have the same `type`,
                        return a.Title.localeCompare(b.Title); // Compare the elements by `name`.
                    } else {                                   // Otherwise,
                        return sortOrder.indexOf(a.State) - sortOrder.indexOf(b.State); // Substract indexes, If element `a` comes first in the array, the returned value will be negative, resulting in it being sorted before `b`, and vice versa.
                    }
                }
            );
        }



        console.log(data)
        data.forEach(element => {
            var text = `
            <a href="#collapse${element.Id}" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="collapse${element.Id}" 
                class="list-group-item list-group-item-action flex-column align-items-start" id="${element.Id}">
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