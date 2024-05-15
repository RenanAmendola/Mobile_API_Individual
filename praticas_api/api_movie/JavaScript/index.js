$(document).ready(function() {
    getProducts();
  });



function getProducts() {
    $('#products-container').empty();

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://127.0.0.1:3000/product/",
      "method": "GET"
    };

    $.ajax(settings).done(function(response) {
      var produtos = response.products;

      for (let index = 0; index < produtos.length; index++) {

        var productHtml = `
        <div class="col" >

          <div class="card bg-info">

            <img src="${produtos[index].picture}" class="card-img-top imagem_css" alt="${produtos[index].name}">

            <div class="card-body">
              <h5 class="card-title">${produtos[index].name}</h5>
              <p class="card-text">${produtos[index].description}</p>
            </div>

            <ul class="list-group list-group-flush">
              <li class="list-group-item">Rating: ${produtos[index].rating}</li>
              <li class="list-group-item">Price: ${produtos[index].price}</li>
            </ul>

            <div class="card-body" style=" display: flex; justify-content: space-around;">
            <a class="btn btn-warning" onclick="pegarIdProduto('${produtos[index]._id}')">Editar Produto</a>
            <a class="btn btn-danger" onclick="confirmDelete('${produtos[index]._id}')">Deletar Produto</a>
            </div>

          </div>
        </div>
        `;

        $('#products-container').append(productHtml);
      }
    });
  }


  function pegarIdProduto(id) {
    localStorage.setItem('id_produto', id);
    window.location.href = "edit_product.html";
}








  function confirmDelete(id) {
    localStorage.setItem('id_produto', id);
    var confirmation = confirm("Você tem certeza que deseja deletar este produto?");
    if (confirmation) {
      deleteProduto();
    }
  }


function deleteProduto() {
      //var productId = $('#product-id').val();
      const id_produto = localStorage.getItem('id_produto');
      var settings = {
        async: true,
        crossDomain: true,
        url: `http://127.0.0.1:3000/product/delete/${id_produto}`,
        method: "DELETE"
      };

      $.ajax(settings).done(function(response) {
        showAlert(response.status, response.mssg);
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