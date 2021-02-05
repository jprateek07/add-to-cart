function newElement(e) {  
    $("#product-items").append("<tr>" +
        "<td>" + e.parentNode.parentNode.childNodes[3].innerHTML+ "</td>" +
        "<td>" +e.parentNode.parentNode.childNodes[5].innerHTML + "</td>" +
        "<td><div class='d-flex'><button onclick='decrement(this)' class='btn-sm btn-danger'><span class='btn-inner--icon'><i class='fas fa-minus'></i></span></button><span class='btn-inner--text'><input type='number' name='qty' class='text-center' id='qty' min='1' value='1'></span><button class='btn-sm btn-danger' onclick='increment(this)'><span class='btn-inner--icon'><i class='fa fa-plus' aria-hidden='true'></i></span></button></div></td>" +
        "<td><button type='button' class='btn-sm btn-success rounded-pill'>Add</button></td>"+
        "<td><button type='button' onclick='deleteRow(this)' class='btn-sm btn-danger rounded-pill'>Remove</button></td>"+
        "</tr>");
}
function increment(curr)
{
    curr.parentNode.childNodes[1].childNodes[0].stepUp();
}
function decrement(curr)
{
    curr.parentNode.childNodes[1].childNodes[0].stepDown();
}
function deleteRow(r) {
    var index = r.parentNode.parentNode.rowIndex;
    var wishlistItem=r.parentNode.parentNode.childNodes[0].innerHTML
    var rowLength=document.getElementById("product-table").rows.length
    for(i=1;i<rowLength;i++)
    {
        var productItem = document.getElementById("product-table").rows[i].cells[1].innerHTML
        if(productItem==wishlistItem)
        {
            document.getElementById("product-table").rows[i].cells[3].childNodes[0].disabled=false
        }
    }
    document.getElementById("wishlist-table").deleteRow(index);
  }