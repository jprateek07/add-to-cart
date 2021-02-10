var cartData=[]
var data=[]
$.ajax({
    url:'assets/data.json',
    dataType:'json',
    success: function (data){
        loadData(data)
    },
    error: function (err) {
                alert(err);
            }
})
function loadData(jsonData)
{      
    data=jsonData
    $.each(jsonData , function(index, item) {
        if(item.category=="vegetable")
        {
        var vegetableSection=$('#vegetable')  
        vegetableSection.append("<div class='col-md-3' id='"+item.id+"'><div class='card my-4'><div class='vegetable-img'><img src='"+item.itemSrc+"' class='card-img-top vegetables' alt='...'></div><div class='card-body'><h5 class='card-title item-name'>"+item.itemName+"</h5><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star'></span><span class='fa fa-star'></span><p class='text-dark'>1kg</p><div class='d-flex justify-content-between align-items-center'><p class='card-text font-weight-bold'>&#x20B9<span class='item-price'>"+item.itemPrice+"</span></p><button type='button' class='btn btn-outline-danger rounded-pill add-to-cart' id='image-"+item.id+"' onclick='addToCart("+item.id+");this.disabled=true'>Add to cart</button></div></div></div></div>");
        }
        else if(item.category=="fruit")
        {
            var fruitSection=$('#fruit')
            fruitSection.append("<div class='col-md-3' id='"+item.id+"'><div class='card my-4'><div class='vegetable-img'><img src='"+item.itemSrc+"' class='card-img-top vegetables' alt='...'></div><div class='card-body'><h5 class='card-title item-name'>"+item.itemName+"</h5><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star'></span><span class='fa fa-star'></span><p class='text-dark'>1kg</p><div class='d-flex justify-content-between align-items-center'><p class='card-text font-weight-bold'>&#x20B9<span class='item-price'>"+item.itemPrice+"</span></p><button type='button' class='btn btn-outline-danger rounded-pill add-to-cart' onclick='addToCart("+item.id+");this.disabled=true'>Add to cart</button></div></div></div></div>");
        }
    })
}
function addToCart(id)
{
    const currentObject = Object.values(data).find(item => item.id === id);
    cartData.push(currentObject)
    $("#cart-items").append("<tr>" +
    "<td><img src='"+currentObject.itemSrc+"' class='cart-item-image'><p class='text-center cart-item-name'>"+currentObject.itemName+"</p></td>" +
    "<td><div class='d-flex align-items-center'><div class='dec-btn' onclick='decrement(this,"+currentObject.id+")'><i class='fas fa-minus text-white'></i></div><span class='btn-inner--text'><input type='number' name='qty' class='text-center' id='qty' min='1' value='1'></span><div class='dec-btn' onclick='increment(this,"+currentObject.id+")'><i class='fa fa-plus text-white' aria-hidden='true'></i></div></div></td>" +
    "<td id='totalamt'> Rs. "+currentObject.itemPrice+"</td>"+
    "<td><button type='button' onclick='deleteRow(this,"+currentObject.id+")' class='btn-sm btn-danger rounded-pill'><i class='fa fa-trash' aria-hidden='true'></i></button></td>"+
    "</tr>");
    document.getElementById("lblCartCount").innerHTML=document.getElementById("cart-table").rows.length-1
    updateTotalAmount()  
}
function  updateTotalAmount()
{
    var cartRows=document.getElementById("cart-table").rows.length
    var total=0
    var i=0
    for(i=1;i<cartRows;i++)
    {
        total=parseInt(document.getElementById("cart-table").rows[i].cells[2].innerHTML.substring(4))+total
    }
    document.getElementById("final-amt").innerHTML=''
    document.getElementById("final-amt").innerHTML=total    

}
function increment(curr,id)
{
    const currentObject = Object.values(cartData).find(item => item.id === id);
    curr.parentNode.childNodes[1].childNodes[0].stepUp();
    var itemPrice=currentObject.itemPrice
    var qty=curr.parentNode.querySelector("#qty").value
    var totalAmount=itemPrice*qty
    curr.parentNode.parentNode.parentNode.childNodes[2].innerHTML="Rs. "+totalAmount
    updateTotalAmount()
}
function decrement(curr,id)
{
    const currentObject = Object.values(cartData).find(item => item.id === id);
    curr.parentNode.childNodes[1].childNodes[0].stepDown();
    var itemPrice=currentObject.itemPrice
    var qty=curr.parentNode.querySelector("#qty").value
    var totalAmount=itemPrice*qty
    curr.parentNode.parentNode.parentNode.childNodes[2].innerHTML="Rs. "+totalAmount
    updateTotalAmount()
}
function UpdateCart()
{
    $("#cart-items").empty()
    for( index in cartData)
    {
        console.log("inside")
        $("#cart-items").append("<tr>" +
        "<td><img src='"+cartData[index].itemSrc+"' class='cart-item-image'><p class='text-center cart-item-name'>"+cartData[index].itemName+"</p></td>" +
        "<td><div class='d-flex align-items-center'><div class='dec-btn' onclick='decrement(this,"+cartData[index].id+")'><i class='fas fa-minus text-white'></i></div><span class='btn-inner--text'><input type='number' name='qty' class='text-center' id='qty' min='1' value='1'></span><div class='dec-btn' onclick='increment(this,"+cartData[index].id+")'><i class='fa fa-plus text-white' aria-hidden='true'></i></div></div></td>" +
        "<td id='totalamt'> Rs. "+cartData[index].itemPrice+"</td>"+
        "<td><button type='button' onclick='deleteRow(this,"+cartData[index].id+")' class='btn-sm btn-danger rounded-pill'><i class='fa fa-trash' aria-hidden='true'></i></button></td>"+
        "</tr>");
    }
    document.getElementById("lblCartCount").innerHTML=document.getElementById("cart-table").rows.length-1
}
function deleteRow(r,id) {
    document.getElementById("image-"+id).disabled=false
    const currentObject = Object.values(cartData).find(item => item.id === id);
    cartData=cartData.filter(function(item){return item.id!=id})
    UpdateCart()
    updateTotalAmount()
  }
  function switchVisible() {
    if (document.getElementById('cart-table')) {

        if (document.getElementById('cart-table').style.display == 'none') {
            document.getElementById('cart-table').style.display = 'block';
            document.getElementById('checkout-form').style.display = 'none';
        }
        else {
            document.getElementById('cart-table').style.display = 'none';
            document.getElementById('checkout-form').style.display = 'block';
        }
    }
}
  $(".checkout").click(function(){
    $("#cart-table").toggle();
    if(localStorage.getItem('name') && localStorage.getItem('pw')) 
    {
        var options = {
            "key": "rzp_test_rGbrc5hXxJ9r9I",
            "amount": 2000, // Example: 2000 paise = INR 20
            "name": "MERCHANT name",
            "description": "description",
            "image": "img/logo.png",// COMPANY LOGO
            "handler": function (response) {
                console.log(response);
                // AFTER TRANSACTION IS COMPLETE YOU WILL GET THE RESPONSE HERE.
            },
            "prefill": {
                "name": "ABC", // pass customer name
                "email": 'A@A.COM',// customer email
                "contact": '+919123456780' //customer phone no.
            },
            "notes": {
                "address": "address" //customer address 
            },
            "theme": {
                "color": "#15b8f3" // screen color
            }
        };
        console.log(options);
        var propay = new Razorpay(options);
        propay.open();
    }
    else{
        $("#checkout-form").toggle(); 
    }
  });

var Username = document.getElementById('name');
var pw = document.getElementById('pw');

// storing input from register-form
function store() {
    localStorage.setItem('name', Username.value);
    localStorage.setItem('pw', pw.value);
}

// check if stored data from register-form is equal to entered data in the   login-form
function check() {

    // stored data from the register-form
    var storedName = localStorage.getItem('name');
    var storedPw = localStorage.getItem('pw');

    // entered data from the login-form
    var userName = document.getElementById('userName');
    var userPw = document.getElementById('userPw');

    // check if stored data from register-form is equal to data from login form
    if(userName.value == storedName && userPw.value == storedPw) {
        var settings = {
            "url": "https://api.razorpay.com/v1/orders",
            "method": "POST",
            "timeout": 0,
            "headers": {
              "Content-Type": "application/json",
              "Authorization": "Basic cnpwX3Rlc3RfckdicmM1aFh4SjlyOUk6VDU0N05KdDhQcURPVDhZakZ5V29UTUpv",
              "Access-Control-Allow-Origin":"*"
            },
            "crossDomain":true,
            "data": JSON.stringify({"amount":50000,"currency":"INR"})
          };
          
          $.ajax(settings).done(function (response) {
            console.log(response);
          });
    }else {
        alert('ERROR.');
    }
}

// paypal config keys
// key id:rzp_test_rGbrc5hXxJ9r9I
//key secret:T547NJt8PqDOT8YjFyWoTMJo