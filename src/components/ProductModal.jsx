import React from "react";

function ProductModal({ produto, fechar, adicionarCarrinho }) {
  if (!produto) return null;

  const disponivel = produto.estoque > 0;

  return (
    <div className="modal-overlay" onClick={fechar}>

      <div
        className="product-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <button className="modal-close" onClick={fechar}>
          ×
        </button>

        <div className="modal-image">
          <img
  src={
    produto.imagem?.startsWith("http")
      ? produto.imagem
      : `/Perfumes/Imagens/${produto.imagem}`
  }
  alt={produto.nome}
/>
        </div>

        <div className="modal-content">

          <span className="product-category">
            {produto.categoria}
          </span>

          <h2>{produto.nome}</h2>

          <p>
            {produto.descricao}
          </p>

          <div className="modal-price">
            R$ {produto.preco.toFixed(2).replace(".", ",")}
          </div>

          <span className="modal-stock">
            {disponivel
              ? `${produto.estoque} unidade(s) disponível(is)`
              : "Produto esgotado"}
          </span>

          <button
            className="modal-cart-button"
            disabled={!disponivel}
            onClick={() => {
              adicionarCarrinho(produto);
              fechar();
            }}
          >
            {disponivel
              ? "ADICIONAR AO CARRINHO"
              : "ESGOTADO"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductModal;
