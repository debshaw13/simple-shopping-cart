var calculateSubTotal = function(ele) {
  var price = parseFloat($(ele).children('.price').text().replace(/\$|,/g, ''));
  var quantity = parseFloat($(ele).find('.quantity input').val());

  //subtotal is price times quantity
  var subTotal = (price * quantity);
  $(ele).children('.subtotal').html("$" + subTotal.toFixed(2));

  return subTotal;
}

var sum = function (acc, x) { return acc + x; };

var updateTotal = function() {
  var totalArray = [];

  $('.mainBody tr').each(function (i, ele) {
    var eachTotal = calculateSubTotal(ele);
    totalArray.push(eachTotal);
  });

  var total = totalArray.reduce(sum);
  $('#total').html("$" + total.toFixed(2));
}

$(document).ready(function () {
  updateTotal();

  $(document).on('click', '.btn.remove', function (event) {
    $(this).closest('tr').remove();
    updateTotal();
  });

  var timeout;
  $(document).on('input', 'tr input', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      updateTotal();
    }, 100);
  });

  $('#addItem').on('submit', function (event) {
    event.preventDefault();
    var newInputName = $(this).find('[name=newInputName]').val();
    var newInputPrice = $(this).find('[name=newInputPrice]').val();

  $('tbody').append('<tr>' +
    '<td class="name">' + newInputName + '</td>' +
    '<td class="price">' + '$' + parseFloat(newInputPrice).toFixed(2) + '</td>' +
    '<td class="quantity">' + '<input type="number" value="1">' + '</td>' +
    '<td class="subtotal"></td>' +
    '<td><button class="btn btn-light btn-sm remove">Remove</button></td>' +
  '</tr>');

  updateTotal();
  });
});
