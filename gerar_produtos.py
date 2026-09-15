from pathlib import Path
import re
import shutil
import unicodedata
import json


# =========================
# PASTAS
# =========================

PASTA_IMAGENS = Path("Perfumes/Imagens")
PASTA_PUBLICA = Path("public/Perfumes/Imagens")
ARQUIVO_TXT = PASTA_IMAGENS / "Produtos.txt"
ARQUIVO_JS = Path("src/data/produtos.js")


# =========================
# CRIAR PASTAS
# =========================

PASTA_PUBLICA.mkdir(
    parents=True,
    exist_ok=True
)

ARQUIVO_JS.parent.mkdir(
    parents=True,
    exist_ok=True
)


# =========================
# FUNÇÕES
# =========================

def gerar_id(nome):
    texto = unicodedata.normalize(
        "NFKD",
        nome
    )

    texto = texto.encode(
        "ascii",
        "ignore"
    ).decode("ascii")

    texto = texto.lower()

    texto = re.sub(
        r"[^a-z0-9]+",
        "-",
        texto
    )

    texto = texto.strip("-")

    return texto


def converter_preco(valor):
    valor = valor.strip()

    valor = valor.replace(
        "R$",
        ""
    ).strip()

    # =========================
    # PRODUTO SEM PREÇO
    # =========================

    if valor.lower() in [
        "confira",
        "consulte",
        "sob consulta"
    ]:
        return None

    # =========================
    # CONVERSÃO DO PREÇO
    # =========================

    # Aceita:
    #
    # 129.90
    # 129,90
    # 1.299,90

    if "," in valor:

        valor = valor.replace(
            ".",
            ""
        )

        valor = valor.replace(
            ",",
            "."
        )

    return float(valor)


# =========================
# VERIFICAR PRODUTOS.TXT
# =========================

if not ARQUIVO_TXT.exists():

    print(
        "ERRO: Produtos.txt não encontrado."
    )

    exit()


# =========================
# LER PRODUTOS.TXT
# =========================

texto = ARQUIVO_TXT.read_text(
    encoding="utf-8"
)

blocos = texto.split(
    "\n\n"
)

produtos = []


# =========================
# PROCESSAR PRODUTOS
# =========================

for bloco in blocos:

    linhas = bloco.strip().splitlines()

    if not linhas:
        continue

    dados = {}

    for linha in linhas:

        if ":" not in linha:
            continue

        chave, valor = linha.split(
            ":",
            1
        )

        dados[chave.strip()] = valor.strip()

    # Produto precisa ter nome

    if "Nome" not in dados:
        continue

    nome = dados["Nome"]

    produto = {

        "id": gerar_id(nome),

        "nome": nome,

        "descricao": dados.get(
            "Descricao",
            ""
        ),

        "preco": converter_preco(
            dados.get(
                "Preco",
                "0"
            )
        ),

        "imagem": dados.get(
            "Imagem",
            ""
        ),

        "categoria": dados.get(
            "Categoria",
            ""
        ),

        "estoque": int(
            dados.get(
                "Estoque",
                "0"
            )
        )
    }

    produtos.append(
        produto
    )


# =========================
# ORDENAR POR NOME
# =========================

produtos.sort(
    key=lambda produto:
        unicodedata.normalize(
            "NFKD",
            produto["nome"]
        )
        .encode(
            "ascii",
            "ignore"
        )
        .decode("ascii")
        .lower()
)


# =========================
# COPIAR IMAGENS
# =========================

for produto in produtos:

    nome_imagem = produto["imagem"]

    # Se não tiver imagem,
    # não tenta copiar

    if not nome_imagem:
        continue

    origem = (
        PASTA_IMAGENS /
        nome_imagem
    )

    destino = (
        PASTA_PUBLICA /
        nome_imagem
    )

    if origem.exists():

        shutil.copy2(
            origem,
            destino
        )

        print(
            f"Imagem copiada: {nome_imagem}"
        )

    else:

        print(
            f"AVISO: imagem não encontrada: "
            f"{nome_imagem}"
        )


# =========================
# GERAR JAVASCRIPT
# =========================

conteudo = (
    "const produtos = "
)

conteudo += json.dumps(
    produtos,
    ensure_ascii=False,
    indent=2
)

conteudo += """

export default produtos;
"""


ARQUIVO_JS.write_text(
    conteudo,
    encoding="utf-8"
)


# =========================
# RELATÓRIO
# =========================

print()

print(
    "=============================="
)

print(
    " PRODUTOS GERADOS"
)

print(
    "=============================="
)

print()


for produto in produtos:

    if produto["preco"] is None:

        preco = "Confira!"

    else:

        preco = (
            f'R$ '
            f'{produto["preco"]:.2f}'
        )

    print(
        f'{produto["nome"]} - '
        f'{preco} - '
        f'{produto["imagem"]}'
    )


print()

print(
    f"Total de produtos: "
    f"{len(produtos)}"
)

print()

print(
    "Arquivo gerado:"
)

print(
    ARQUIVO_JS
)

print()