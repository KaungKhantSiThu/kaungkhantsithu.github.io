var products = []

$(document).ready(function () {
    console.log("ready!");
    // load data
    $.ajax({
        url: "mockup-data.json"
    }).done(function (data) {
        //$(this).addClass("done"); 
        console.log("DONE",data)
        let gross = 0
        let totalDiscount = 0
        data = processData(data)
        for(let d in data){
            //save the data record into local storage $("#data-table tr:last").after(dataStr)
            products.push(data[d])
            let amount = data[d].price * data[d].quantity
            let discountedAmount = amount - data[d].discount
            gross += discountedAmount
            totalDiscount += data[d].discount
            let dataStr = `<tr>
                <td class="text-center"><img class='icon' src='icon-delete.png' onclick='deleteProduct("${d}")' style='width:20px;height:20px;margin-right:7px;'></td>
                <td>${data[d].quantity}</td>
                <td>${data[d].itemName}</td>
                <td>${data[d].price}</td>
                <td>${data[d].discount}</td>
                <td>${amount}</td>
                <td>${discountedAmount}</td>
            </tr>`
            $("#data-table > tbody").append(dataStr)
        }
        //$('#customerBody').html(dataStr)
        $("#gross").html(gross.toFixed(2))
        $("#discount-footer").html('-' + totalDiscount.toFixed(2))

        let vat = gross * 0.07
        let net = gross + vat
        $("#vat").html(vat.toFixed(2))
        $("#net").html(net.toFixed(2))
        console.log(filteredData)
    });
});


function addToTable() {
    if ($('#quantity').val() == 0 || $('#itemName').val() == "" || $('#ppu').val() == 0) {
        alert("One of the inputs could be empty or wrong inputs")
    } else {
        $.valHooks.number = {
            get: function( elem ) {
              return elem.value * 1;
            }
          };

        let productObj = {
            quantity: $('#quantity').val(),
            itemName: $('#itemName').val(),
            price: $('#ppu').val(),
            discount: $('#discount').val()
        }
        
    
        // Clear existing items in the table
        //let productList = document.getElementById("productList")
        //for (let x = 0; x < products.length; x++) {
            //productList.deleteRow(1)
            // productList.removeChild(tableRows[x]);
        //}
    
        products.push(productObj)
        console.log("Added!", productObj)
        loadData()
    }
}

function deleteProduct(index) {

    console.log("DELETE",index)

    delete products[index]  

    $('#productBody').html("")

    loadData()

}

function clearTable() {
    $('#productBody').html("")
    $("#gross").html(0)
    $("#discount-footer").html(0)
    $("#vat").html(0.00)
    $("#net").html(0.00)

    console.log("clear the table")
}

function loadData() {
    let allRows = ""
    products = processData(products)
    let gross = 0
    let totalDiscount = 0
    for (let p in products) {
        let amount = products[p].price * products[p].quantity
        let discountedAmount = amount - products[p].discount
        gross += discountedAmount
        totalDiscount += products[p].discount
            let row = `<tr>
                <td class="text-center"><img class='icon' src='icon-delete.png' onclick='deleteProduct("${p}")' style='width:20px;height:20px;margin-right:7px;'></td>
                <td>${products[p].quantity}</td>
                <td>${products[p].itemName}</td>
                <td>${products[p].price}</td>
                <td>${products[p].discount}</td>
                <td>${amount}</td>
                <td>${discountedAmount}</td>
            </tr>`
        allRows += row

    }
    $('#productBody').html(allRows)
    console.log(products)
    
    $("#gross").html(gross.toFixed(2))
    $("#discount-footer").html('-' + totalDiscount.toFixed(2))
    let vat = gross * 0.07
    let net = gross + vat
    $("#vat").html(vat.toFixed(2))
    $("#net").html(net.toFixed(2))
}

function processData(dataArray) {
    filteredData = []
    dataArray.forEach(function(item) {
        var existing = filteredData.filter(function(v, i) {
            return v.itemName == item.itemName && v.price == item.price;
        });
        if (existing.length) {
            var existingIndex = filteredData.indexOf(existing[0]);
            filteredData[existingIndex].quantity += item.quantity;
            filteredData[existingIndex].discount += item.discount;
        } else {
            if (typeof item.price == 'number')
            filteredData.push(item);
        }
        });
    return filteredData
}
