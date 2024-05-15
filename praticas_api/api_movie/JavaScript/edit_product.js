const id_produto = localStorage.getItem('id_produto');

console.log(id_produto)

$(document).ready(function() {
  getProducts();
});


function getProducts() {
  $('#products-container').empty();

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": `http://127.0.0.1:3000/product/${id_produto}`,
    "method": "GET"
  };

  $.ajax(settings).done(function(response) {
    var produtos = response.product;



      $('#name').val(produtos.name),
      $('#description').val(produtos.description),
      $('#rate').val(produtos.rating),
      $('#price').val(produtos.price),
      $('#picture').val(produtos.picture)
    
  });
}



function putProducts() {
  var produto = {
    name: $('#name').val(),
    description: $('#description').val(),
    rating: $('#rate').val(),
    price: $('#price').val(),
    picture: $('#picture').val()
  };

  var settings = {
    async: true,
    crossDomain: true,
    url: `http://127.0.0.1:3000/product/update/${id_produto}`,
    method: "PUT",
    contentType: "application/json",
    data: JSON.stringify(produto)
  };

  $.ajax(settings).done(function(response) {
    showAlert( response.status, response.mssg);
  }).fail(function(jqXHR, textStatus, errorThrown) {
    showAlert('danger', textStatus, errorThrown);
  });
}

function showAlert(status, mssg) {
  alert("Status: "+status +" "+"Mensagem: "+mssg)
    setTimeout(function() {
    // Redireciona para outra página
    window.location.href = "index.html";
  }, 1500);
}
