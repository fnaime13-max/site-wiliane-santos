# Pendências · Site Wiliane Santos

Legenda: **[FORNECIDO]** veio do Instagram/briefing · **[INFERÊNCIA]** dedução que precisa de confirmação · **[PENDENTE]** falta.

## 1. Dados profissionais
- [FORNECIDO] Nome, "Nutricionista", **CRN-9 25524** (bio do Instagram), Betim/MG.
- [PENDENTE] Formação: instituição e ano da graduação. O site não cita nenhuma formação.
- [PENDENTE] Pós-graduações ou especializações. Não citei nenhuma. Os eventos listados em "Onde tenho me atualizado" vêm dos posts dela, são **participações em eventos** e não certificações. Ela precisa confirmar se quer que apareçam.
- [PENDENTE] Endereço do consultório, se ela quiser mostrar. O site diz só "Atendimento em Betim/MG".
- [PENDENTE] Ela atende **online**? Um post usa #consultoriaonline, mas não está confirmado. Se atender, inclua no CTA final e no JSON-LD.
- [PENDENTE] Como funciona a consulta: duração, retornos, aplicativo, bioimpedância, valores. As três etapas do site (escuta, estratégia e acompanhamento) usam somente o que ela escreve nos posts.

## 2. Contato
- [FORNECIDO] WhatsApp: `https://wa.me/message/M722J2E4X3CCK1` (link da bio). Teste se o link ainda está ativo.
- [PENDENTE] E-mail. Não incluí nenhum.
- [PENDENTE] Domínio. Usei `www.nutriwilisantos.com.br` como provisório em: canonical, og:url, og:image, JSON-LD, robots.txt e sitemap.xml.

## 3. Regras do CFN (Res. 856/2026)
- **Depoimentos:** não usei nenhum. O Instagram tem prints de WhatsApp e o caso "Letícia perdeu 25 kg". O código proíbe antes/depois e promessa de resultado, e a regra para depoimentos ainda precisa ser lida no texto integral. Até lá, a sugestão é apontar para as avaliações do Google.
- **IA na comunicação:** os textos do site foram escritos com apoio de IA, a partir dos posts dela. O código exige declarar o uso de IA. Confirme com ela onde colocar esse aviso (por exemplo, no rodapé).
- O CRN aparece no hero (selo sobre a foto e linha de cima) e no rodapé (Art. 24).
- Ela precisa revisar a seção "Nutri sem enrolação". As respostas resumem os posts dela, inclusive o que ela diz sobre medicação.

## 4. Imagens
Todas foram tiradas do Instagram dela (PDFs + página salva). Para trocar uma foto, substitua o arquivo **com o mesmo nome**. Se um arquivo sumir, o site mostra um placeholder com o nome e a dimensão esperada.

| Arquivo | Seção | Dimensão / proporção | Direção |
|---|---|---|---|
| `wiliane-recorte.webp` | Hero | 1000×1701, WebP **sem fundo** | Corpo até o quadril, sorrindo, roupa clara. A original está em `_originais/WILIANE_AAA_11.jpeg` |
| `atendimento.webp` | A consulta | 1100×1250 (≈4:5) | Atendimento real. **Confirmar se a paciente autorizou o uso da imagem** |
| `corrida-chegada.webp` | Quem sou | 1000×1777 (vertical) | Prova de corrida, braço erguido |
| `medalha.webp` | Quem sou | 900×1120 | Medalha contra o céu |
| `retrato-serio.webp` | Sem enrolação | 1000×1250 (4:5) | Retrato de estúdio em fundo escuro |
| `og-image.jpg` | Compartilhamento | 1200×630 | Gerada automaticamente. Pode ser trocada por uma arte final |

As fotos vieram de posts e devem ter crédito de @rodriguesvictoroficial (ensaio). **Confirmar se ela tem o direito de uso** das fotos do ensaio no site.

## 5. Marca
- [PENDENTE] Logo oficial. No laptop dela aparece um monograma "WS". Criei um monograma provisório, um dente-de-leão num círculo terracota, usado em `index.html` (símbolo `#mark`) e em `assets/icons/favicon.svg`. Se ela tiver o logo em vetor, troque nos dois lugares.

## 6. Decisões para aprovar
- Conceito "leveza com constância": terracota, areia e dente-de-leão interativo (pedido do cliente). A corrida aparece na seção Sobre.
- A frase principal "Emagrecer sem parar de viver." foi adaptada do post dela: "Você não precisa escolher entre emagrecer e viver."
