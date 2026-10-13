# Site · Wiliane Santos, Nutricionista (CRN-9 25524)

Site de uma página, feito em HTML, CSS e JavaScript puros, sem build e sem dependências.

## Conceito
**Leveza com constância.** Fundo areia claro, terracota de destaque e um dente-de-leão fofo, com carinha, como elemento interativo. O layout segue a linha arejada do site da Luanna (menu no topo, foto em card, serifa itálica de destaque, faixa escura de manifesto, faixa com o @ do Instagram), com identidade própria.
- **Abertura:** o dente-de-leão ganha sementes enquanto a contagem vai de 0 a 100%. No final, ele faz "o" e as sementes são sopradas.
- **Hero:** o mouse perto do dente-de-leão funciona como vento: a flor se inclina, as sementes tremem e, se o mouse passa rápido, algumas se soltam e saem voando. O clique ou toque sopra um punhado. Quando sobra pouco, ele rebrota sozinho. A carinha pisca e se assusta.
- **Ciclo:** pista interativa com restrição → exagero → culpa → compensação.
- **Sobre:** a rota Flexeiras → Porto Calvo → Betim se desenha conforme a página rola.

Paleta: areia `#F8F2EA`, terracota `#B5583B`, café `#2B1E18`, manteiga `#F6C770`. Fontes: Schibsted Grotesk (títulos), Instrument Serif itálica (destaques) e Hanken Grotesk (texto), todas do Google Fonts.

## Estrutura
```
index.html          página
css/styles.css      estilos (as cores e espaçamentos ficam em :root, no topo)
js/main.js          interações (o CONFIG fica no topo)
assets/images/      fotos
assets/icons/       favicon
_originais/         fotos extraídas do Instagram (não publicar)
qa/                 script de capturas (Playwright) e screenshots (não publicar)
PENDENCIAS.md       o que falta confirmar
```

## Como alterar
- **WhatsApp e Instagram:** edite `CONFIG` no topo de `js/main.js`. Todos os botões com `data-wa` usam esse link. Também vale trocar o `href` no HTML, que funciona como reserva caso o JS falhe.
- **Fotos:** substitua o arquivo em `assets/images/` mantendo o mesmo nome. A foto do hero precisa estar sem fundo.
- **Logo:** edite o `<symbol id="mark">` no final do `index.html` e o `assets/icons/favicon.svg`.
- **Dente-de-leão:** é gerado em `js/main.js` pela função `buildDandelion` (quantidade e comprimento das sementes). As cores ficam nas variáveis `--dl-*` do `css/styles.css`.
- **Textos:** estão todos no `index.html`, separados por seção (`KM 0`, `KM 3`…).
- **Domínio:** procure `nutriwilisantos.com.br` em `index.html`, `robots.txt` e `sitemap.xml` e troque pelo domínio real.

## Publicar
Envie para a hospedagem (Hostinger, Netlify, Vercel, GitHub Pages…) o conteúdo da pasta, **exceto** `_originais/` e `qa/`.

## QA
`node qa/shots.cjs`: gera capturas em 1440, 1024, 768, 390 e 360 px, e aponta overflow horizontal, imagens quebradas e erros de console.

## Acessibilidade e movimento
- Com `prefers-reduced-motion`, a abertura dura cerca de 0,3 s, o dente-de-leão fica parado (o clique ainda tira as sementes, sem voo) e as revelações aparecem direto.
- A abertura completa só roda na primeira visita da sessão. Nas seguintes, ela é mais curta.
- O ciclo usa `tablist` com navegação por setas. O FAQ usa `<details>` nativo.
