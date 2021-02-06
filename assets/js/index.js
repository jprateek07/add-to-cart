function addToCart(e)
{
    var item=e.parentNode.parentNode.parentNode.querySelector(".vegetable-img").innerHTML
    var imge=e.parentNode.parentNode.parentNode.querySelector(".vegetable-img").childNodes[1]
    var amt=e.parentNode.querySelector(".item-price").innerHTML
    var qty=1
    var Imgcontainer=document.createElement("div")
    var cartImg =document.createElement("img")
    cartImg.src=imge.src
    cartImg.className="cart-item-image"
    Imgcontainer.appendChild(cartImg)
    $("#cart-items").append("<tr>" +
    "<td>" +Imgcontainer.innerHTML+"</td>" +
    "<td><div class='d-flex'><button onclick='decrement(this)' class='btn-sm btn-danger'><span class='btn-inner--icon'><i class='fas fa-minus'></i></span></button><span class='btn-inner--text'><input type='number' name='qty' class='text-center' id='qty' min='1' value='1'></span><button class='btn-sm btn-danger' onclick='increment(this)'><span class='btn-inner--icon'><i class='fa fa-plus' aria-hidden='true'></i></span></button></div></td>" +
    "<td id='totalamt'> Rs. "+amt+"</td>"+
    "<td><button type='button' onclick='deleteRow(this)' class='btn-sm btn-danger rounded-pill'>Remove</button></td>"+
    "</tr>");
    var cartRows=e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector("#cart-table").rows.length
    e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector("#lblCartCount").innerHTML=cartRows-1    
}
function increment(curr)
{
    curr.parentNode.childNodes[1].childNodes[0].stepUp();
    var itemPrice=curr.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector(".item-price").innerHTML
    var qty=curr.parentNode.querySelector("#qty").value
    var totalAmount=itemPrice*qty
   curr.parentNode.parentNode.parentNode.childNodes[2].innerHTML="Rs. "+totalAmount
}
function decrement(curr)
{
    curr.parentNode.childNodes[1].childNodes[0].stepDown();
    var itemPrice=curr.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector(".item-price").innerHTML
    var qty=curr.parentNode.querySelector("#qty").value
    var totalAmount=itemPrice*qty
    curr.parentNode.parentNode.parentNode.childNodes[2].innerHTML="Rs."+totalAmount
}
function deleteRow(r) {
    // console.log(r.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector(".add-to-cart").disabled=true)
    var index = r.parentNode.parentNode.rowIndex;
    var bodypart=r.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
    r.parentNode.parentNode.parentNode.parentNode.deleteRow(index)
    var cartRows=bodypart.querySelector("#cart-table").rows.length
    bodypart.querySelector("#lblCartCount").innerHTML=cartRows-1
  }