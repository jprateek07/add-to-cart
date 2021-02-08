function addToCart(e)
{
    var itemName=e.parentNode.parentNode.parentNode.querySelector(".item-name").innerHTML
    // var item=e.parentNode.parentNode.parentNode.querySelector(".vegetable-img").innerHTML
    var imge=e.parentNode.parentNode.parentNode.querySelector(".vegetable-img").childNodes[1]
    var amt=e.parentNode.querySelector(".item-price").innerHTML
    var qty=1
    var Imgcontainer=document.createElement("div")
    var cartImg =document.createElement("img")
    cartImg.src=imge.src
    cartImg.className="cart-item-image"
    Imgcontainer.appendChild(cartImg)
    $("#cart-items").append("<tr>" +
    "<td>" +Imgcontainer.innerHTML+"<p class='text-center cart-item-name'>"+itemName+"</p></td>" +
    "<td><div class='d-flex align-items-center'><div class='dec-btn' onclick='decrement(this)'><i class='fas fa-minus text-white'></i></div><span class='btn-inner--text'><input type='number' name='qty' class='text-center' id='qty' min='1' value='1'></span><div class='dec-btn' onclick='increment(this)'><i class='fa fa-plus text-white' aria-hidden='true'></i></div></div></td>" +
    "<td id='totalamt'> Rs. "+amt+"</td>"+
    "<td><button type='button' onclick='deleteRow(this)' class='btn-sm btn-danger rounded-pill'><i class='fa fa-trash' aria-hidden='true'></i></button></td>"+
    "</tr>");
    var cartRows=e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector("#cart-table").rows.length
    e.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector("#lblCartCount").innerHTML=cartRows-1    
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
    alert(total)
    document.getElementById("final-amt").innerHTML=''
    document.getElementById("final-amt").innerHTML=total    

}
function increment(curr)
{
    curr.parentNode.childNodes[1].childNodes[0].stepUp();
    var itemPrice=curr.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector(".item-price").innerHTML
    var qty=curr.parentNode.querySelector("#qty").value
    var totalAmount=itemPrice*qty
    curr.parentNode.parentNode.parentNode.childNodes[2].innerHTML="Rs. "+totalAmount
    updateTotalAmount()
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
    var cartItem=r.parentNode.parentNode.querySelector(".cart-item-name").innerHTML
    // console.log(r.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector(".add-to-cart").disabled=true)
    var index = r.parentNode.parentNode.rowIndex;
    const elements = document.querySelectorAll('.item-name');
    Array.from(elements).forEach((element, index) => {
        var itemName=element.innerHTML
        if(itemName==cartItem)
        {
            element.parentNode.querySelector(".add-to-cart").disabled=false
        }
      });
    var bodypart=r.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
    r.parentNode.parentNode.parentNode.parentNode.deleteRow(index)
    var cartRows=bodypart.querySelector("#cart-table").rows.length
    bodypart.querySelector("#lblCartCount").innerHTML=cartRows-1
  }
  