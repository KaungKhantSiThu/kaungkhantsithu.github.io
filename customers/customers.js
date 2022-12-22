var customers = []

$(document).ready(function () {
    console.log("ready!");
    // load data
    $.ajax({
        url: "data.json"
    }).done(function (data) {
        //$(this).addClass("done"); 
        console.log("DONE",data)
        dataStr = ""
        for(let d in data){
            //save the data record into local storage $("#data-table tr:last").after(dataStr)
            customers.push(data[d])
            dataStr += `<tr>
                <td><img class='icon' src='icon-delete.png' onclick='deleteCustomer("${d}")' style='width:20px;height:20px;margin-right:7px;'>${data[d].name}</td>
                <td>${data[d].email}</td>
                <td>${data[d].phone}</td>
            </tr>`
        }
        $('#customerBody').html(dataStr)

        console.log(customers)
    });
});

function deleteCustomer(index) {

    console.log("DELETE",index)

    delete customers[index]  

    $('#customerBody').html("")

    loadData()

}

function addToTable() {
    let customerObj = {
        name: $('#customerName').val(),
        email: $('#customerEmail').val(),
        phone: $('#customerPhone').val()
    }
    

    // Clear existing items in the table
    //let productList = document.getElementById("productList")
    //for (let x = 0; x < products.length; x++) {
        //productList.deleteRow(1)
        // productList.removeChild(tableRows[x]);
    //}

    customers.push(customerObj)
    loadData()
}

function loadData() {
    let allRows = ""

    for (let c in customers) {
        let cellName = `<td><img class='icon' src='icon-delete.png' onclick='deleteCustomer("${c}")' style='width:20px;height:20px;'> ` + customers[c].name + "</td>"
        let cellEmail = '<td>' + customers[c].email + "</td>"
        let cellPhone = '<td>' + customers[c].phone + "</td>"
        let row = `<tr>${cellName}${cellEmail}${cellPhone}</tr>`
        allRows += row
    }
    $('#customerBody').html(allRows)
    console.log(customers)
}