import React from "react";

function ProductCard({ produto, adicionarCarrinho, abrirProduto }) {
  const disponivel = produto.estoque > 0;

  return (
    <article className="product-card">

      <div
        className="product-image"
        onClick={() => abrirProduto(produto)}
      >
        <img
          src={`/Perfumes/Imagens/${produto.imagem}`}
          alt={produto.nome}
        />

        {produto.estoque <= 3 && produto.estoque > 0 && (
          <span className="stock-badge">
            Últimas unidades
          </span>
        )}

        {produto.estoque === 0 && (
          <span className="sold-out">
            ESGOTADO
          </span>
        )}
      </div>

      <div className="product-info">

        <span className="product-category">
          {produto.categoria}
        </span>

        <h3>{produto.nome}</h3>

        <p className="product-description">
          {produto.descricao}
        </p>

        <div className="product-bottom">

          <strong>
            R$ {produto.preco.toFixed(2).replace(".", ",")}
          </strong>

          <button
            disabled={!disponivel}
            onClick={() => adicionarCarrinho(produto)}
          >
            {disponivel ? "Adicionar" : "Esgotado"}
          </button>

        </div>

      </div>

    </article>
  );
}

export default ProductCard;