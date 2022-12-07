// define data in JSON array
var products = [
    {
        name: "iPhone 14",
        quantity: 5,
        ppu: 799
    },
    {
        name: "iPhone 14 Plus",
        quantity: 2,
        ppu: 899
    },
    {
        name: "iPhone 14 Pro",
        quantity: 3,
        ppu: 999
    },
    {
        name: "iPhone 14 Pro Max",
        quantity: 2,
        ppu: 1099
    }
]

function loadData() {

    let productList = document.getElementById("productList")

    for (let p in products) {
        let row = document.createElement("tr")
        let productName = document.createElement("td")
        productName.innerHTML = products[p].name

        let quantity = document.createElement("td")
        quantity.innerHTML = products[p].quantity
        quantity.classList.add("text-center")

        let ppu = document.createElement("td")
        ppu.innerHTML = products[p].ppu
        ppu.classList.add("text-right")

        let total = document.createElement("td")
        total.innerHTML = products[p].ppu * products[p].quantity 
        total.classList.add("text-right")

        row.appendChild(productName)
        row.appendChild(quantity)
        row.appendChild(ppu)
        row.appendChild(total)
        productList.appendChild(row)
    }

    let gross = products.map(products=>products.ppu).reduce((prev, cur) => prev + cur);

    document.getElementById("gross").innerHTML = gross

    let vat = gross * 0.07
    let net = gross + vat
    document.getElementById("vat").innerHTML = vat.toFixed(2)
    document.getElementById("net").innerHTML = net.toFixed(2)

}