import React from "react";

function ProductCard({
  produto,
  adicionarAoCarrinho,
  abrirProduto,
}) {
  const temPreco =
    produto.preco !== null && produto.preco > 0;

  function consultarWhatsApp() {
    const mensagem = encodeURIComponent(
      `Olá! Gostaria de consultar o preço e a disponibilidade do perfume ${produto.nome}.`
    );

    window.open(
      `https://wa.me/5562993265596?text=${mensagem}`,
      "_blank"
    );
  }

  return (
    <article className="product-card">

      <div
        className="product-image"
        onClick={() => abrirProduto(produto)}
      >
<img
  src={
    produto.imagem?.startsWith("http")
      ? produto.imagem
      : `/Perfumes/Imagens/${produto.imagem}`
  }
  alt={produto.nome}
/>
      </div>

      <div className="product-info">

        <span className="product-category">
          {produto.categoria}
        </span>

        <h3>
          {produto.nome}
        </h3>

        <div className="product-description">
  <p>
    {produto.descricao}
  </p>

  {produto.descricao?.length > 100 && (
    <button
      type="button"
      className="product-more"
      onClick={() => abrirProduto(produto)}
    >
      Saiba mais...
    </button>
  )}
</div>

        <div className="product-bottom">

          {temPreco ? (
            <strong>
              R$ {produto.preco
                .toFixed(2)
                .replace(".", ",")}
            </strong>
          ) : (
            <strong>
              Confira!
            </strong>
          )}

          {temPreco ? (
            <button
              type="button"
              onClick={() =>
                adicionarAoCarrinho(produto)
              }
            >
              Adicionar ao carrinho
            </button>
          ) : (
            <button
              type="button"
              onClick={consultarWhatsApp}
            >
              Consultar no WhatsApp
            </button>
          )}

        </div>

      </div>

    </article>
  );
}

export default ProductCard;