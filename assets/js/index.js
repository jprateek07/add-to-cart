var cartData = []
var data = []
var userEmail = localStorage.getItem('email')
var userPwd = localStorage.getItem('pw');
var paymentStatus = 0
checkCartButton()
$.ajax({
    url: 'assets/data.json',
    dataType: 'json',
    success: function (data) {
        loadData(data)
    },
    error: function (err) {
        alert(err);
    }
})

function loadData(jsonData) {
    data = jsonData
    $.each(jsonData, function (index, item) {
        if (item.category == "vegetable") {
            var vegetableSection = $('#vegetable')
            vegetableSection.append("<div class='col-md-3 animate__animated' id='" + item.id + "'><div class='card my-4'><div class='vegetable-img'><img src='" + item.itemSrc + "' class='card-img-top vegetables' alt='...'></div><div class='card-body'><h5 class='card-title item-name'>" + item.itemName + "</h5><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star'></span><span class='fa fa-star'></span><p class='text-dark'>1kg</p><div class='d-flex justify-content-between align-items-center'><p class='card-text font-weight-bold'>&#x20B9<span class='item-price'>" + item.itemPrice + "</span></p><button type='button' class='btn btn-outline-danger rounded-pill add-to-cart' id='button" + item.id + "' onclick='addToCart(" + item.id + ");this.disabled=true'>Add to cart</button></div></div></div></div>");
        } else if (item.category == "fruit") {
            var fruitSection = $('#fruit')
            fruitSection.append("<div class='col-md-3 animate__animated' id='" + item.id + "'><div class='card my-4'><div class='vegetable-img'><img src='" + item.itemSrc + "' class='card-img-top vegetables' alt='...'></div><div class='card-body'><h5 class='card-title item-name'>" + item.itemName + "</h5><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star'></span><span class='fa fa-star'></span><p class='text-dark'>1kg</p><div class='d-flex justify-content-between align-items-center'><p class='card-text font-weight-bold'>&#x20B9<span class='item-price'>" + item.itemPrice + "</span></p><button type='button' class='btn btn-outline-danger rounded-pill add-to-cart' id='button" + item.id + "' onclick='addToCart(" + item.id + ");this.disabled=true'>Add to cart</button></div></div></div></div>");
        } else if (item.category == "tshirt") {
            var Section = $('#mens-wear')
            Section.append("<div class='col-md-3 animate__animated' id='" + item.id + "'><div class='card my-4'><div class='vegetable-img'><img src='" + item.itemSrc + "' class='card-img-top vegetables' alt='...'></div><div class='card-body'><h5 class='card-title item-name'>" + item.itemName + "</h5><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star'></span><span class='fa fa-star'></span><p class='text-dark'>1kg</p><div class='d-flex justify-content-between align-items-center'><p class='card-text font-weight-bold'>&#x20B9<span class='item-price'>" + item.itemPrice + "</span></p><button type='button' class='btn btn-outline-danger rounded-pill add-to-cart' id='button" + item.id + "' onclick='addToCart(" + item.id + ");this.disabled=true'>Add to cart</button></div></div></div></div>");
        } else if (item.category == "footwear") {
            var Section = $('#footwear')
            Section.append("<div class='col-md-3 animate__animated' id='" + item.id + "'><div class='card my-4'><div class='vegetable-img'><img src='" + item.itemSrc + "' class='card-img-top vegetables' alt='...'></div><div class='card-body'><h5 class='card-title item-name'>" + item.itemName + "</h5><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star'></span><span class='fa fa-star'></span><p class='text-dark'>1kg</p><div class='d-flex justify-content-between align-items-center'><p class='card-text font-weight-bold'>&#x20B9<span class='item-price'>" + item.itemPrice + "</span></p><button type='button' class='btn btn-outline-danger rounded-pill add-to-cart' id='button" + item.id + "' onclick='addToCart(" + item.id + ");this.disabled=true'>Add to cart</button></div></div></div></div>");
        }
    })
}
function addToCart(id) {
    document.getElementById("cart").classList.add("animate__bounce")
    const currentObject = Object.values(data).find(item => item.id === id);
    document.getElementById(currentObject.id).classList.add("animate__rollOut")
    cartData.push(currentObject)
    document.getElementById("lblCartCount").innerHTML = cartData.length
    setTimeout(function () {
        document.getElementById("cart").classList.remove("animate__bounce");
        document.getElementById(currentObject.id).classList.remove("animate__rollOut")
    }, 1000);
    UpdateCart()
    updateTotalAmount()
    checkCartButton()
}
function updateTotalAmount() {
    var cartRows = document.getElementById("cart-table").rows.length
    var total = 0
    var i = 0
    for (i = 1; i < cartRows; i++) {
        total = parseInt(document.getElementById("cart-table").rows[i].cells[2].innerHTML.substring(4)) + total
    }
    document.getElementById("final-amt").innerHTML = ''
    document.getElementById("final-amt").innerHTML = total
}
function increment(curr, id) {
    const currentObject = Object.values(cartData).find(item => item.id === id);
    curr.parentNode.childNodes[1].childNodes[0].stepUp();
    var itemPrice = currentObject.itemPrice
    var qty = curr.parentNode.querySelector("#qty").value
    var totalAmount = itemPrice * qty
    curr.parentNode.parentNode.parentNode.childNodes[2].innerHTML = "Rs. " + totalAmount
    updateTotalAmount()
    checkCartButton()
}
function decrement(curr, id) {
    const currentObject = Object.values(cartData).find(item => item.id === id);
    curr.parentNode.childNodes[1].childNodes[0].stepDown();
    var itemPrice = currentObject.itemPrice
    var qty = curr.parentNode.querySelector("#qty").value
    var totalAmount = itemPrice * qty
    curr.parentNode.parentNode.parentNode.childNodes[2].innerHTML = "Rs. " + totalAmount
    updateTotalAmount()
    checkCartButton()
}
function UpdateCart() {
    $("#cart-items").empty()
    for (index in cartData) {
        $("#cart-items").append("<tr>" +
            "<td><img src='" + cartData[index].itemSrc + "' class='cart-item-image'><p class='text-center cart-item-name'>" + cartData[index].itemName + "</p></td>" +
            "<td><div class='d-flex align-items-center'><div class='dec-btn' onclick='decrement(this," + cartData[index].id + ")'><i class='fas fa-minus text-white'></i></div><span class='btn-inner--text'><input type='number' name='qty' class='text-center' id='qty' min='1' value='1'></span><div class='dec-btn' onclick='increment(this," + cartData[index].id + ")'><i class='fa fa-plus text-white' aria-hidden='true'></i></div></div></td>" +
            "<td id='totalamt'> Rs. " + cartData[index].itemPrice + "</td>" +
            "<td><button type='button' onclick='deleteRow(this," + cartData[index].id + ")' class='btn-sm btn-danger rounded-pill'><i class='fa fa-trash' aria-hidden='true'></i></button></td>" +
            "</tr>");
    }
    document.getElementById("lblCartCount").innerHTML = document.getElementById("cart-table").rows.length - 1
    checkCartButton()
}
function deleteRow(r, id) {
    document.getElementById("button" + id).disabled = false
    const currentObject = Object.values(cartData).find(item => item.id === id);
    cartData = cartData.filter(function (item) {
        return item.id != id
    })
    UpdateCart()
    updateTotalAmount()
    checkCartButton()
    if (cartData.length == 0) {
        location.href = '/';
    }
}
$(".checkout").click(function () {
    $("#cart-table").toggle();
    userEmail = localStorage.getItem('email')
    userPwd = localStorage.getItem('pw')
    if (userEmail) {
        var amount = document.querySelector("#final-amt").innerHTML
        var options = {
            "key": "rzp_test_rGbrc5hXxJ9r9I",
            "amount": parseInt(amount) * 100, 
            "name": "prateek jain",
            "description": "description",
            "image": "../assets/images/apple.png", 
            "handler": function (response) {
                if (response.razorpay_payment_id) {
                    paymentStatus = 1
                    if (paymentStatus) {
                        $.each(cartData, function (index, item) {
                            document.getElementById("button" + item.id).disabled = false
                        })
                        document.getElementById("final-amt").innerHTML = 0
                        location.href='./'
                    }
                }
            },
            "prefill": {
                "name": "prateek jain", 
                "email": userEmail, 
                "contact": '+919123456780'
            },
            "notes": {
                "address": "123,delhi" 
            },
            "theme": {
                "color": "#C82333" 
            }
        };
        var propay = new Razorpay(options);
        propay.open();
        cartData = []
        UpdateCart()
    } else {
        $("#checkout-form").toggle();
    }
});
function showPopUp() {
    if (userEmail.trim().length > 0) {
        $('[data-toggle="popover"]').popover({
            title: "<h5>" + userEmail + "</h5>",
            content: "<p class='btn btn-danger text-center' id='logout'>Logout</p>"
        });

    } else {
        $('[data-toggle="popover"]').popover({
            title: "<h5 class='btn btn-info' id='login-form'>Login</h5>",
            content: "<p>you are not logged in</p>"
        });
    }
}
$(document).on("click", "#logout", function () {
    localStorage.setItem('email', '');
    localStorage.setItem('pw', '');
    $(this).parents(".popover").popover('hide');
    cartData = []
    location.href = './'
})
$(document).on("click", "#login-form", function () {
    $(this).parents(".popover").popover('hide');
    location.href = "login.html"
})

function store() {
    var userEmail = document.getElementById('email');
    var userPwd = document.getElementById('pw');
    localStorage.setItem('email', userEmail.value);
    localStorage.setItem('pw', userPwd.value);
}

function check() {
    var storedEmail = localStorage.getItem('email');
    var storedPw = localStorage.getItem('pw');
    var userEmail = document.getElementById('userEmail');
    var userPw = document.getElementById('userPw');
    var amount = document.querySelector("#final-amt").innerHTML
    if (userEmail.value == storedEmail && userPw.value == storedPw) {
        var options = {
            "key": "rzp_test_rGbrc5hXxJ9r9I",
            "amount": amount,
            "name": "Prateek store",
            "description": "description",
            "image": "img/logo.png",
            "handler": function (response) {
                if (response.razorpay_payment_id) {
                    var paymentStatus = 1
                    if (paymentStatus) {
                        $.each(cartData, function (index, item) {
                            document.getElementById("button" + item.id).disabled = false
                        })
                        document.getElementById("final-amt").innerHTML = 0
                        location.href='./'
                    }
                }
            },
            "prefill": {
                "name": "prateek",
                "email": 'prateek@gmail.com',
                "contact": '+919123456780'
            },
            "notes": {
                "address": "123,delhi"
            },
            "theme": {
                "color": "#C82333"
            }
        };
        var propay = new Razorpay(options);
        propay.open();
    } else {
        alert('Invalid credentials');
    }
}

function checkCartButton() {
    if (document.getElementById("lblCartCount").innerHTML == 0) {
        document.getElementById("cart").disabled = true
    } else {
        document.getElementById("cart").disabled = false
    }
}
// paypal config keys
// key id:rzp_test_rGbrc5hXxJ9r9I
//key secret:T547NJt8PqDOT8YjFyWoTMJo