# Preparação: mudanças no FamilyCoachMD pedidas na reunião de 05/11/2026

> Documento-guia para a implementação. **Só planejamento: nada aqui foi implementado.**
> Preparado em 06/11/2026 para Ithalo (Haderach Solutions). Cliente: Dr. Larisa A. Che, MD (FamilyCoachMD LLC).
> **Vale mais do que** `preparacao-familycoachmd.md` e `auditoria-design-conteudo-2026-11-03.md` onde houver conflito.
> **Fontes:** transcrição `Conversacompleta/transcricao/parte-01` a `parte-10` (hora real = (parte − 1) × 20 min + T), telas em `Conversacompleta/frames/`, `larisa-cv.md`, código do site.
> **Linhas de código** conferidas em 06/11/2026, antes de qualquer alteração. Ao editar, as linhas mudam: procure pelo texto citado.

**Como ler cada item**

- **Status:** **Pedido dela** (ela pediu, ou é consequência direta do pedido, marcado "decorrente"), **Decisão do Ithalo** (tem prioridade sobre a fala dela), **A confirmar** (proposta nossa ou dúvida; não publicar como fato antes da resposta).
- **Texto:** o que está entre aspas e marcado "ditado" saiu da boca dela. O marcado **rascunho** foi escrito por nós e precisa da aprovação dela no Canva.
- **Origem:** `parte-NN T=mmss`, com a fala curta.

---

## 1. Resumo e novo mapa do site

**O que ela quer, em uma frase:** publicar logo (até o evento de 21/11), com o FamilyCoachMD como a **ala de saúde e bem-estar**, a medicação separada do coaching, o texto corrigido onde estiver errado, fotos reais no lugar das atuais e navegação que chegue em tudo sem rolar, porque rolar dói nos dedos dela.

**Por cima disso, três decisões do Ithalo:** planta 3D de verdade, livros na gangorra e remoção total da parte Assess.

**Quatro divergências entre o resumo da reunião e a fala, que afetam a implementação**

1. **As três linhas "Physician-led / Psychiatric medication management / Children and teens" são do título da seção Care (`index.html:305`), não do H1 do hero.** Quando ela dita, a tela mostra "Physician-led care for children and teens" (`frames/keep/1h09m00s.jpg`, `1h13m45s.jpg`), e ela diz "instead of care" (parte-04 T=0935). O H1 "Care for every season of family life" ela não pediu para mudar. Ver CA-01 e HE-01.
2. **A FAQ de recém-nascidos não existe.** Ela diz "Care for newborns, yep" (parte-07 T=0816), mas não há essa pergunta em `index.html` nem em `dist/index.html`, e a tela da hora (`frames/keep/2h08m00s.jpg`) mostra as mesmas 9 perguntas do código. É quase certamente erro do Gemini (provável "Can my school or childcare center…"). Nada a corrigir; ver FQ-07.
3. **"Care e Coaching levam ao mesmo lugar" não aparece no código.** Os links apontam para `#care` e `#coaching`, e as telas mostram destinos diferentes. A queixa real é que os dois pulam o mesmo bloco. Ver NV-03.
4. **Ela pediu para manter a parte Assess sem o Gesell; a decisão do Ithalo é tirar tudo.** E ela mostrou orgulho do acrônimo: "I remember coming up with this, look at me, I'm so clever" (parte-06 T=0028). Precisa ser avisada. Ver seção 2.8.

### Mapa do site: atual × proposto

| Ordem | Seção | `id` hoje | `id` proposto | No menu hoje | No menu proposto | Mudança principal |
|---|---|---|---|---|---|---|
| 0 | Loader | | | | | M e D chegam atrasados |
| 1 | Hero | `top` | `top` | logo | logo | Rosto no canto; lede novo |
| 2 | "Care before coaching" | nenhum | `welcome` | não | via "Who we help" | Âncora nova |
| 3 | "Whoever you are" | nenhum | `who` | não | **Who we help** | Âncora e botão novos; fotos |
| 4 | "Who you'll work with" | nenhum | `dr-che` | não | menu mobile e links | Credencial nova |
| 5 | "Every family goes through seasons" | `seasons` | `seasons` | não | **Seasons** | Botão novo; 2–5; sem assessment |
| 6 | Psychiatric care | `care` | `care` | Care | **Care** | Medication management |
| 7 | Coaching | `coaching` | `coaching` | Coaching | **Coaching** | Sessões, plano, planta 3D, sem Gesell |
| 8 | Courses | `courses` | `courses` | Courses | **Courses** | Credencial, livros, sem "periods" |
| 9 | Schools | `schools` | `schools` | Schools | **Schools** | Sem Assess, sem workplaces, 1 organização |
| 10 | Entrepreneurs at Play | `ep` | `ep` | não | rodapé e mobile | Ala acadêmica, 3 linhas, at capacity |
| 11 | Meet Dr. Che + Her story | `about` | `about` | About | **About** | Timeline corrigida |
| 12 | Credenciais / KETV | nenhum | nenhum | não | não | KETV clicável |
| 13 | Read, learn, grow | `learning` | `learning` | não (só mobile) | **Articles ↗** (Substack) | Blog vai para o Substack |
| 14 | FAQ | `faq` | `faq` | FAQ | **FAQ** | Medicação sim; sem assessment |
| 15 | Contato | `begin` | `begin` | botão | botão | Sem telefone |
| 16 | Rodapé | | | | | Sem telefone, sem workplaces, com redes |

**Menu desktop proposto:** `Who we help · Seasons · Care · Coaching · Courses · Schools · About · Articles ↗ · FAQ` + botão `Free 15-min call`. Ela notou o "C, C, C" de Care, Coaching e Courses e gostou (parte-04 T=0855), então os rótulos ficam.

---

## 2. Lista completa das mudanças, por seção

### 2.1 Estrutura e global

#### ES-01 · FamilyCoachMD como ala de saúde e bem-estar · **Pedido dela**
- **Hoje:** o site não define as duas alas. `index.html:488–489` chama o EP de "A FamilyCoachMD program" e "Our school program".
- **Passa a ser:** deixar claro em dois pontos: no lede do hero (HE-02) e no card do EP (EP-01). Texto curto, **rascunho:** "FamilyCoachMD is our health and wellness wing. Entrepreneurs at Play is our academic wing."
- **Origem:** parte-04 T=0809: "the academic wing is Entrepreneurs at Play. The health and wellness wing is Family Coach MD."

#### ES-02 · Dados estruturados e metadados refletem o novo escopo · **Pedido dela** (decorrente)
- **Hoje:** `index.html:6–7` e `:10–11` falam em "Child & Family Psychiatry" e "consulting for schools and childcare centers"; `:39–54` é o JSON-LD.
- **Passa a ser (rascunho):**
  - `<title>`: "FamilyCoachMD · Psychiatric Medication Management, Family Coaching and Parenting Courses in Omaha"
  - `description`: "Physician-led psychiatric medication management for children and teens, private family coaching and Positive Discipline parenting courses in Omaha, from a board-certified child and adolescent psychiatrist. Book a free 15-minute call."
  - JSON-LD: tirar `telephone` (`:44`, ver GL-01); manter `MedicalBusiness`; atualizar a URL do EP quando o domínio existir (`:54`).
- **Origem:** parte-04 T=0601: "psychiatric medication management"; parte-07 T=1037.

#### ES-03 · Imagem de compartilhamento · **Pedido dela** (decorrente)
- **Hoje:** `public/og-image.jpg` diz "Child & family psychiatry, coaching and courses". Ela não usou o termo "family psychiatry" e quer foco em crianças e adolescentes.
- **Passa a ser:** regenerar com "Psychiatric medication management, coaching and courses" (**rascunho**). Se o logo novo for aprovado depois, regenerar de novo. Não tem telefone, conferido.
- **Origem:** parte-04 T=1350.

#### GL-01 · Tirar o telefone de todo lugar · **Pedido dela**
- **Hoje:** 5 ocorrências em `index.html`: `:44` (JSON-LD), `:116` (menu), `:647` (contato), `:673` (fallback do formulário), `:706` (rodapé). `:641–642` falam em "email or phone".
- **Passa a ser:** só e-mail até ela ativar o número comercial.
  - `:641`: "You send a short request (this form or email)." (**rascunho**)
  - `:642`: "Dr. Che's team replies by email to find a time that works." (**rascunho**, a confirmar: ver BE-02)
  - `:673`: tirar ", or call …".
  - Manter `tel:988` e `tel:911` (`:708`). **Esses não podem sair.**
  - Não usar o número antigo do Squarespace nem criar número novo.
- **Origem:** parte-07 T=0906: "take (…) number because that's personal"; T=0940: "Just leave just the email for now"; T=1037: "take off the my phone number and just leave the email".

#### GL-02 · Remover "for workplaces & leaders" do site inteiro · **Pedido dela**
- **Hoje e o que muda:**
  - `index.html:476–480`: bloco inteiro sai.
  - `:659`: opção do formulário sai.
  - `:704`: link do rodapé sai; a coluna "Organizations" fica com um link só, ver FO-01.
  - `:693` e `src/ui.js:285`: tirar "and leadership" de "parenting and leadership tips".
  - `:604` (carta): "through coaching for families and organizations, consulting for schools, childcare centers and other organizations" passa a "through coaching for families, consulting for schools and childcare centers" (**rascunho**).
  - `:667` (placeholder): tirar "your organization".
  - CSS: `src/styles/main.css:673–675` e `:683` saem.
- **Fica, salvo ordem contrária (A confirmar):** os trechos de missão, que são palavras dela e não oferta de serviço: `:164` e `:603` ("at work"), `:602` ("a team, an organization"), `:518` ("organizations like yours"). A pergunta está na seção 7.
- **Origem:** parte-05 T=2134: "You can take off the 'workplace and leaders.' That's a different thing that I'm not very skilled in yet"; parte-06 T=0514 e T=0532; parte-05 T=0005: "I don't want to do corporate coaching or event series".

#### GL-03 · Termo "Psychiatric care" nos atalhos internos · **A confirmar**
- **Hoje:** `index.html:106` (menu), `:189` (tile), `:265` (estação), `:654` (formulário), `:703` (rodapé).
- **Passa a ser (rascunho):** "Medication management" nos atalhos pequenos e "Psychiatric medication management" no formulário. O rótulo do menu desktop continua **Care** e o eyebrow da seção continua "Psychiatric care".
- **Atenção:** o `value` de `:654` tem de ser igual ao `data-reason` de `:314`, ou a pré-seleção do formulário quebra (`src/ui.js:149–152`).
- **Origem:** parte-04 T=0601 e T=0828.

### 2.2 Barra de anúncios e hero

#### BA-01 · Anúncio "Now enrolling" contradiz a lotação · **Pedido dela** (decorrente)
- **Hoje:** `index.html:78`: "Now enrolling: Entrepreneurs at Play, opening January 2027".
- **Passa a ser (rascunho):** "Entrepreneurs at Play: enrichment starts January 5 · microschool waitlist open".
- **Origem:** parte-06 T=0558: "it's at capacity"; parte-07 T=2128: golfe em 5 de janeiro. Alinhar com a preparação do EP.

#### BA-02 · Anúncio de Care · **Pedido dela** (decorrente)
- **Hoje:** `index.html:79`: "Physician-led care for families, licensed in Nebraska and Iowa".
- **Passa a ser (rascunho):** "Physician-led psychiatric medication management, licensed in Nebraska and Iowa".
- **Origem:** parte-04 T=0935.

#### HE-01 · Testar um rosto no topo · **Pedido dela** (formato a confirmar)
- **Hoje:** o hero (`index.html:126–156`) só tem a planta; o retrato redondo só aparece em `:218`.
- **Passa a ser:** um círculo com o rosto dela no canto do hero, sobre o lado da planta. Ela usou as palavras "bring the circle to the corner", e o único círculo com rosto do site é `.doc-intro-photo` (`.doc-intro-photo` em `main.css`).
  - **Desktop:** `.hero-face`, posição absoluta, `right: 68px` (fora da faixa `.hero-marquee` de 44 px), `bottom: 96px`, 148 px, borda linen, `z-index: 4`, link para `#about`.
  - **Legenda:** à mão (Caveat), **rascunho:** "Hi, I'm Dr. Che".
  - **Telas < 1024 px:** 88 px ao lado dos botões, dentro de `.hero-copy`, para não aumentar a altura.
  - **Duas variantes no Canva:** (A) círculo no canto com a planta inteira; (B) círculo maior, encostado no vaso. Ela escolhe. Não trocar a planta pelo rosto: ela adora a planta.
  - Foto: `founder` serve só em tamanho pequeno (700 × 933), ver IM-13.
- **Origem:** parte-04 T=0313: "would they want to see a face"; T=0340: "something with a face or something. Maybe just bring the circle to the corner." Tela: `frames/keep/1h04m05s.jpg`.

#### HE-02 · Lede do hero · **A confirmar**
- **Hoje:** `index.html:138`: "Physician-led care, coaching and courses for families, schools and communities, from a child and adolescent psychiatrist and Omaha mom."
- **Passa a ser (rascunho):** "Physician-led psychiatric medication management, family coaching and parenting courses, from a board-certified child and adolescent psychiatrist and Omaha mom."
- **Origem:** parte-04 T=0601 e T=0741: "I think under Family Coach, yes, because that's the umbrella". H1 (`:136`), `hero-sub` (`:137`) e `hero-rotator` não mudam.

#### HE-03 · Credencial no chip do hero · **A confirmar** (baixo risco)
- **Hoje:** `index.html:144`: "Board-certified psychiatrist".
- **Passa a ser (rascunho):** "Board-certified child & adolescent psychiatrist". Ela mesma ditou "board certified in child and adolescent psychiatry" (CU-01). O mesmo vale para o letreiro: `:552` e `:556`.
- **Origem:** parte-05 T=1948.

### 2.3 Manifesto e "Whoever you are"

#### AU-01 · Âncoras novas · **Pedido dela**
- **Hoje:** `index.html:160`, `:170` e `:216` não têm `id`.
- **Passa a ser:** `id="welcome"`, `id="who"` e `id="dr-che"`, com botão no menu conforme NV-01.
- **Origem:** parte-07 T=1405: "Care before coaching, whoever you are, we're here for the journey. It doesn't link to up there."

#### AU-02 · Fotos dos 4 tiles · **Pedido dela**
- **Hoje:** `index.html:178`, `:186`, `:194`, `:202`.
- **Passa a ser:** fotos de banco reais, ver seção 4.
- **Origem:** parte-07 T=1438: "you can use those good stock pictures again".

#### AU-03 · Tile das escolas · **A confirmar** (depende de SC-03; AS-05 decidido: Align)
- **Hoje:** `index.html:204–205`: "Your school or center" e "C.A.R.E. consulting →".
- **Passa a ser:** mantém "C.A.R.E. consulting →", porque o Ithalo escolheu a Opção A (Align).

#### AU-04 · Tile "Your child or teen" · **A confirmar**
- **Hoje:** `index.html:189`: "Psychiatric care →".
- **Passa a ser (rascunho):** "Medication management →". Ver GL-03.

### 2.4 "Who you'll work with"

#### DI-01 · Texto da credencial · **A confirmar**
- **Hoje:** `index.html:222`: "Psychiatrist with a fellowship in child and adolescent psychiatry (Creighton University). Medical Director of NOVA Treatment Community and Assistant Clinical Professor at Creighton University School of Medicine. Certified Positive Discipline parent and early childhood educator. Omaha, Nebraska · licensed in Nebraska and Iowa."
- **Passa a ser (rascunho):** "Medical doctor board certified in child and adolescent psychiatry, with a fellowship at Creighton University. [Cargos atuais, ver DI-02.] Certified Positive Discipline parent and early childhood educator. Omaha, Nebraska · licensed in Nebraska and Iowa."
- **Origem:** parte-05 T=1948. O bloco ela leu e não reclamou (`frames/keep/2h10m55s.jpg`).

#### DI-02 · Quais cargos ainda são atuais · **A confirmar** (importante, site médico)
- **Hoje:** o site diz que ela é Medical Director da NOVA e Assistant Clinical Professor na Creighton em `index.html:222`, `:325–329`, `:543` e `:552`, com o rótulo "current roles" em `:325`. Vem do CV ("2024–presente").
- **O problema:**
  - Na reunião ela disse que largou o emprego e trabalha um dia por semana (parte-01 T=1656: "I've quit my job"; parte-08 T=0513).
  - Mostrou uma carta de demissão e disse que as instituições foram boas com ela (parte-05 T=1003).
  - A bio do Substack diz que ela "recently stepped back from her job as a physician" (`frames/keep/1h59m50s.jpg`).
- **Passa a ser:** perguntar antes de publicar. Se a NOVA não for mais atual, trocar para o histórico e tirar "current" de `:325`. Não contar a história da demissão no site sem ela autorizar.
- **Origem:** ela leu o card de 2024 e não corrigiu (parte-06 T=1410), por isso não presumimos erro, só perguntamos.

### 2.5 Estações

#### SE-01 · "The early years" 0–5 → 2–5 · **Pedido dela**
- **Hoje:** `index.html:243`: "Ages 0–5".
- **Passa a ser:** "Ages 2–5" (ditado).
- **Varredura:** é a única ocorrência de 0–5 no site. O CV cita 0–5 só no voluntariado, que não está no site. Não há menção a recém-nascidos.
- **Origem:** parte-07 T=1347: "It says the early years, 0 to 5. Put it 3 to 5, uh, 2 to 5."

#### SE-02 · Tirar o link "Developmental assessment" · **Decisão do Ithalo**
- **Hoje:** `index.html:247`.
- **Passa a ser:** a lista fica com "Family coaching" e "Parenting course". Ver AS-03.

#### SE-03 · Links de estação · **A confirmar**
- **Hoje:** `index.html:265` ("Psychiatric care") e `:274` ("Psychiatric evaluation").
- **Passa a ser (rascunho):** "Medication management" nos dois. `:256` ("Entrepreneurs at Play") fica.

#### SE-04 · Botão no menu · **Pedido dela**
- **Hoje:** `#seasons` existe, mas não está no menu desktop.
- **Passa a ser:** botão "Seasons". Ver NV-01.
- **Origem:** parte-07 T=1457: "every family goes through seasons. So this also doesn't link to up there."

### 2.6 Care (psychiatric medication management)

#### CA-01 · Título em três linhas · **Pedido dela**
- **Hoje:** `index.html:305`: "Physician-led care for *children* and teens."
- **Passa a ser (ditado):** em linhas separadas:
  ```
  Physician-led
  Psychiatric medication management
  Children and teens
  ```
- **Técnica:** cada linha é um `span` com `display: block` dentro do `h2.split`. A linha do meio é longa: testar na coluna `.care-main` e ajustar a fonte (`.h2` é `clamp(2.2rem, 4.8vw, 4.4rem)` com `max-width: 20ch`, em `main.css:77`).
- **Origem:** parte-04 T=0935: "instead of care, it will be psychiatric medication management"; T=0948: "You can separate it. It doesn't have to be a long sentence"; T=1350: "physician-led, next next line, psychiatric medication management, then children and teen".

#### CA-02 · Medication management separado do coaching, e ela prescreve · **Pedido dela**
- **Hoje:** `index.html:306` só fala em "careful look from a specialist". Não diz que ela prescreve.
- **Passa a ser (rascunho):** "When worry, mood, attention or behavior start to take over family life, your child deserves a careful look from a specialist. As a medical doctor, Dr. Che can prescribe and manage medication when it's appropriate, which is what sets her care apart from therapy and coaching. She trained in child and adolescent psychiatry at Creighton and has cared for young people in outpatient clinics, partial hospitalization and residential treatment."
- **Cuidado clínico:** não listar medicamentos, condições tratadas nem prometer resultado. "When it's appropriate" fica. A experiência citada está no CV (PICC, PHP, NOVA).
- **Origem:** parte-04 T=0513: "That's what distinguishes me from a therapist (…) I am a medical doctor and I can prescribe medications"; T=0542: "coaching is separate, medication management is separate".

#### CA-03 · Público: crianças e adolescentes · **A confirmar**
- **Hoje:** `index.html:321`: "Children, teens & their parents".
- **Passa a ser (rascunho):** "Children & teens". Ela disse que atende os pais também, mas prefere focar: "maybe I'll just stick with that so that I have a focus (…) and then I coach families".
- **Origem:** parte-04 T=1350.

#### CA-04 · "Video visits" → "Telehealth visits" · **Pedido dela**
- **Hoje:** `index.html:313`: "in-person or video visits".
- **Passa a ser:** "in-person or telehealth visits".
- **Origem:** parte-04 T=1024: "Instead of video visits, it's called tele telehealth, telehealth visit."

#### CA-05 · Passos da seção · **A confirmar**
- **Hoje:** `index.html:309–311`.
- **Passa a ser:** o passo 02, "A thorough evaluation", **fica**: é a avaliação psiquiátrica, parte normal da consulta, e não a avaliação de desenvolvimento removida (ver AS-07). No passo 03, **rascunho:** "Clear next steps for home, school and care, including medication when it's appropriate, and follow-up to see them through."
- **Origem:** parte-04 T=0542: "'Okay, let's talk about your medications, a prescription'".

#### CA-06 · Referência externa · **A confirmar**
- **Referência, não copiar:** ela citou a Omaha Integrative Care pelo termo "psychiatric medication management" (parte-04 T=0611). A tela `frames/chave/01-13-10_referencia-medication-management.jpg` mostra **outro** site, ocaomaha.com. Serve só de referência de termo e de separação de serviços.

#### CA-07 · Foto ou calor humano na seção · **A confirmar**
- **Hoje:** o cartão `:317–331` traz uma ilustração de guarda-chuva.
- **Passa a ser:** opcional, trocar a ilustração por um retrato pequeno se HE-01 não bastar. Não entra no mínimo de publicação.

### 2.7 Coaching

#### CO-01 · Tempo: uma sessão de 1 hora por semana, por 6 semanas · **Pedido dela**
- **Hoje:** `index.html:370`: "Two 1-hour sessions a week for 6 weeks. Family sessions mixed with one-on-one time. By phone or Zoom."
- **Passa a ser (rascunho sobre o ditado):** "One 1-hour session a week for 6 weeks. Family sessions mixed with one-on-one time. Video sessions, or in-person.* *Needs to be pre-arranged."
- **Dúvida:** o trecho sobre "one-on-one" ficou inaudível na fala (parte-05 T=1136); mantivemos.
- **Origem:** parte-05 T=1057: "one-hour sessions a week for six weeks. Nobody has time for two hours"; T=1158: "put video sessions. Then if you put in-person, then you put an asterisk"; T=1222: "Will need to be pre-arranged, that it's mostly video sessions".

#### CO-02 · Personalized · sem mudança · **Pedido dela**
- `index.html:371` fica como está. Ela leu e disse "Yes" (parte-05 T=1232).

#### CO-03 · Whole family · **Pedido dela**
- **Hoje:** `index.html:372`: "Invite grandparents, co-parents or anyone outside the home. When helpful, a developmental assessment for children 2½ to 9 (see below)."
- **Passa a ser (ditado):** "Can invite an extended family member for a bonus session." Com o mesmo asterisco de pre-arranged de CO-01 (**rascunho** quanto ao formato).
- **Origem:** parte-05 T=1314: "something about needs to be pre-arranged (…) 'can invite an extended family member for a bonus session.'"

#### CO-04 · Incluído: só o plano · **Pedido dela**
- **Hoje:** `index.html:373` lista assessment, personal plan, nutrição, mindfulness, exercício, e-mail ilimitado e ferramentas.
- **Passa a ser (ditado):** "A comprehensive trauma-informed plan." Tirar também `data-confirm="coaching-inclusions"`.
- **Origem:** parte-05 T=1336: "don't remove it, just put 'a comprehensive trauma-informed plan,' that's it"; parte-04 T=1749: "I'm not going to tell them nothing about nutrition."

#### CO-05 · Sem Gesell · **Pedido dela** e **Decisão do Ithalo**
- **Hoje:** `index.html:372` e `:375–389`.
- **Passa a ser:** bloco inteiro sai. Ver AS-01 e AS-02.
- **Origem:** parte-04 T=1758: "I didn't go through with this training"; T=1812 e T=1830; parte-05 T=1502.

#### CO-06 · Frase final do coaching · sem mudança · **Pedido dela**
- **Hoje:** `index.html:392`: "Coaching is practical support for family life; it is not therapy or medical treatment."
- **Passa a ser:** mantém. Ela leu e aprovou: "Yep, that's good, Claude. That's true." (parte-05 T=1502). A frase anterior, "Run a childcare center?…", depende de SC-03.

#### CO-07 · Planta 3D · **Decisão do Ithalo**
- **Hoje:** `index.html:352–362` e `src/sections.js:222–239`, broto em SVG.
- **Passa a ser:** ver a especificação em 3.1.
- **Origem:** parte-04 T=1655: "If you can even make it into a real plant that looks like it's growing"; T=1713: 3D, "Yes"; parte-05 T=1057.

#### CO-08 · Termos "phone" e "Zoom" na FAQ · ver FQ-03.

### 2.8 Varredura da remoção de Assess (Decisão do Ithalo)

**A divergência, por escrito.** Ela disse: "I will just take out the Gesell piece, but I will not take out the, this, this piece" (parte-06 T=0046) e "the thing here will just be to take out the Gesell in the assessment part" (T=0344). Também mandou tirar a FAQ (parte-07 T=0816). **A decisão do Ithalo vai além e tem prioridade.** Avisar a Larisa (pergunta 1 da seção 7).

#### AS-01 · Bloco expansível do Gesell · **Decisão do Ithalo**
- **Hoje:** `index.html:375–389` (`#assessment`).
- **Passa a ser:** sai. Remover também `main.css:662–672` e `:694` (`.more*`; nenhum outro elemento usa essas classes). O bloco `details` da privacidade (`.privacy`) é outro e fica.

#### AS-02 · Texto "Whole family" · **Decisão do Ithalo**
- `index.html:372`: sai a frase do assessment. Coberto por CO-03.

#### AS-03 · Link nas estações · **Decisão do Ithalo**
- `index.html:247`. Coberto por SE-02.

#### AS-04 · FAQ · **Pedido dela** e **Decisão do Ithalo**
- `index.html:624` sai inteira, com o link para `#assessment`.
- **Origem:** parte-07 T=0816: "The developmental assessment, you can take it out of here."

#### AS-05 · Passo "Assess" e o acrônimo C.A.R.E. · **Decisão do Ithalo: Opção A (Align); falta a aprovação dela**
- **Hoje:**
  - `index.html:462`: passo Assess, com link `#assessment`.
  - `:459`: letreiro C-A-R-E.
  - `:454`: "We help your team C.A.R.E."
  - `:205`: "C.A.R.E. consulting →".
  - `src/sections.js:276–310`: mostra um passo e acende uma letra.
- **Tirar o A quebra o acrônimo.** Três soluções:

| | **A. Manter a sigla, com outro A (recomendada)** | **B. Três passos, com a palavra CARE inteira** | **C. Três passos, sem letreiro de letras** |
|---|---|---|---|
| **Títulos** | Collaborate · **Align** · Re-imagine · Educate. Alternativa: **Attune** | Collaborate · Re-imagine · Educate | Collaborate · Re-imagine · Educate |
| **H2** | "We help your team *C.A.R.E.*" fica | "We help your team *care*." (rascunho) | "We help your team *grow*." (rascunho) |
| **Texto novo (rascunho)** | "We align on shared goals and everyday expectations across directors, teachers and families, so everyone is working toward the same thing." | nenhum | nenhum |
| **Layout** | Nenhum impacto | Nenhum: as letras seguem como a palavra | Letreiro vira 3 palavras grandes; altura cai de até 16rem para cerca de 6,5rem |
| **Animação** | Nada muda em `sections.js` | `sections.js:300`: `Math.min(2, Math.floor(self.progress * 3))`; `:299`: `end: '+=1500'`; `:291`: mapa `[[0],[1,2],[3]]` em vez de `k === i` | Como B, e `main.css:378–380` e `:640` mudam |
| **Mobile** | Nada | Nada: letreiro já oculto (`main.css:640`) | Nada |
| **Tile `:205`** | Fica | "School consulting →" | "School consulting →" |
| **Risco** | Ela precisa aprovar a palavra; "Align" soa um pouco próximo de Collaborate | "A" e "R" acendem juntas no passo 2, o que pode parecer estranho; perde a sigla | Perde a sigla e o trocadilho com "care" |

**Decisão do Ithalo (06/11/2026): Opção A, com "Align".** O acrônimo é dela, ela se orgulha dele (parte-06 T=0028), é o menor risco técnico e remove o que ela não faz (observar crianças com instrumento). O novo A **não pode mencionar** observação, instrumentos, ferramentas nem desenvolvimento da criança. **Se ela vetar a palavra ao aprovar, a alternativa é "Attune". As Opções B e C ficam só como registro.**

#### AS-06 · Redirecionamento antigo · **Decisão do Ithalo**
- **Hoje:** `vercel.json:10`: `/childcare-center-consultant/yale-assessment-td27b` → `/#assessment`.
- **Passa a ser:** → `/#schools` (`:13`, `:slug*`, já cobre esse caminho, então basta apagar a linha 10).

#### AS-07 · O que contém "evaluation" e deve ficar · **A confirmar**
- `index.html:310` ("A thorough evaluation") e `:274` ("Psychiatric evaluation", se SE-03 não mudar): é a avaliação psiquiátrica de medication management, ato médico que ela realiza.
- `:463` ("knowing when to refer a child for extra support or evaluation"): é encaminhamento.
- Recomendação: manter os três. "Assessment" no texto do coaching some com CO-04.

#### AS-08 · Metadados de confirmação · **Decisão do Ithalo**
- Tirar `data-confirm="assessment-instrument"` (some com AS-01). Foto de `:462` entra no inventário.

### 2.9 Courses

#### CU-01 · Credencial · **Pedido dela**
- **Hoje:** `index.html:439`: "Dr. Che is a Certified Positive Discipline Parent Educator (2018) and Early Childhood Educator (2021)."
- **Passa a ser (ditado):** "Medical doctor board certified in child and adolescent psychiatry and certified Positive Discipline parent educator."
- **Observação:** sai "Early Childhood Educator" deste card, a pedido: "just two things for it to fit". Fica em `:540`, `:553` e `:222`.
- **Origem:** parte-05 T=1948: "'medical doctor board certified in child and adolescent psychiatry and certified positive discipline parent educator,' those two."

#### CU-02 · Tirar "periods" · **Pedido dela**
- **Hoje:** `index.html:443`: "Talking with young kids about periods".
- **Passa a ser:** sai. Ficam "Kids and technology", "Parenting through the holidays" e "Defining your family's values".
- **Origem:** parte-05 T=2103: "you can take off the 'talking with kids about periods,' it's too specific".

#### CU-03 · Gangorra com livros · **Decisão do Ithalo**
- **Hoje:** `index.html:405–425`, `src/sections.js:242–273`, `main.css:345–353`.
- **Passa a ser:** ver a especificação em 3.2.

#### CU-04 · Fotos · ver seção 4 (a seção não tem foto hoje; `cooking` aparece em `:578`).

### 2.10 Schools

#### SC-01 · "Organization we served": só Nelson Mandela · **Pedido dela**
- **Hoje:** `index.html:470–471`: "Organizations we serve", New Community Omaha e Nelson Mandela Elementary.
- **Passa a ser (ditado):** eyebrow "Organization we served"; só o link de Nelson Mandela Elementary. Tirar `data-confirm="orgs-tense"`.
- **Origem:** parte-06 T=0435: "I did not even make it to New Community"; T=0514: "put just organization we served, Nelson Mandela".

#### SC-02 · Bloco workplaces · **Pedido dela**
- Coberto por GL-02. Com a saída de `:475–481`, conferir o espaço inferior da seção (`main.css:673` tinha o `margin-bottom`; `:676` zera o da `.cm-foot`).

#### SC-03 · Creches: fica, mas perguntar · **A confirmar** (não remover)
- **O que ela disse:** "I don't know if I should be doing this childcare center stuff (…) I've never done this one (…) I need to leave childcare centers alone" (parte-06 T=0344). Logo depois: "the thing here will just be to take out the Gesell". Sobre escolas, ela quer: "that's the coaching that I want to do with schools" (parte-05 T=0917).
- **Mapa do que muda, se ela decidir tirar creches:** `index.html:7`, `:109`, `:181–205`, `:392`, `:437`, `:453–455`, `:461`, `:473`, `:604`, `:621`, `:622`, `:656`, `:704`.
- **Variante pronta (rascunho):** eyebrow "Consulting for schools"; botão "Request a consultation for my school".

#### SC-04 · Foto do Educate com adulto · **Pedido dela**
- **Hoje:** `index.html:464`: menino de colete (`speaking`).
- **Passa a ser:** foto de banco com adulto, por exemplo professora em formação. Ver IM-09.
- **Origem:** parte-06 T=0344: "like this one, the educate again, some grown-up there".

#### SC-05 · Letreiro cortado pela navegação · **Pedido dela** (decorrente do "glitch" que ela viu)
- **Hoje:** com a seção presa, as letras começam em `top: 0` e o menu cobre o topo delas (`frames/keep/1h40m50s.jpg`, `1h41m10s.jpg`). Ithalo citou "a little glitch" na hora.
- **Passa a ser:** `.care-method.is-pinned-mode .cm-pin` com `padding-top` igual à altura do menu (cerca de 110 px), ou `start: 'top top+=110'` em `sections.js:299`. Conferir que o texto não se sobrepõe.
- **Origem:** parte-06 T=0045.

#### SC-06 · Menos rolagem presa e letras clicáveis · **Pedido dela** (decorrente da dor nos dedos)
- **Hoje:** `sections.js:299`: `end: '+=2000'`.
- **Passa a ser:** `+=1200`, e as letras viram botões que levam ao passo correspondente, como os pontos das estações (`sections.js:169–177`). As letras têm `aria-hidden` hoje (`index.html:459`); ao virar controle, deixam de ter.
- **Origem:** parte-05 T=0825.

#### SC-07 · Programas de escola dela · **A confirmar** (ideia)
- Ela mencionou "Why Do Kids Skip School" e "School Avoidance" (`frames/chave/01-28-25_canva-school-avoidance.jpg`) como o coaching que quer fazer com escolas (parte-05 T=0917). Não pediu para pôr no site; vale perguntar. Ver seção 8.

### 2.11 Entrepreneurs at Play

#### EP-01 · Descrição nova · **Pedido dela**
- **Hoje:** `index.html:489–490`: "Our school program: Entrepreneurs at Play." e "…multi-age microschool in Omaha for ages 2 to 12, in two pathways…".
- **Passa a ser (rascunho sobre o ditado; ela pediu para lapidar):**
  - H2: "Our academic wing: Entrepreneurs *at Play*."
  - Texto: "Entrepreneurs at Play is a physician-founded, multi-age, multi-faceted enrichment center in Omaha, with three lines of programming throughout the year: enrichment, summer camps and a microschool."
- **Alinhar** com o texto da preparação do EP (outra sessão) antes de publicar.
- **Origem:** parte-06 T=0752: "now you see our wording will change"; T=0823: "multi-faceted (…) enrichment center with three lines of programming throughout the year (…) ranging from enrichment, summer camps to a microschool".

#### EP-02 · Lotação, sem número de vagas · **Pedido dela**
- **Hoje:** `index.html:491`: "5 children to start, up to 12"; `:495`: badge "Opening January 4, 2027".
- **Passa a ser (ditado):** "Opening January 4, enrollment at capacity, join the waitlist for Fall."
  - Badge: "Enrollment at capacity" (**rascunho**).
  - Chips (**rascunho**): "Enrichment · Summer · Microschool" e "Omaha area". Saem "Ages 2–12" e "5 children".
  - **Nunca citar quantas vagas havia.**
- **Origem:** parte-06 T=0558, T=0652: "you don't even need to disclose the number of seats"; T=0703: "Opening January 4th, enrollment (…) at capacity. You can join the waitlist"; T=0717: "for the Fall semester".
- **Dúvida:** Fall 2027 (ela diz "Fall 2027" em T=0620). Escrever "Fall 2027" evita ambiguidade.

#### EP-03 · Botão da lista de espera · **A confirmar**
- **Hoje:** só "Visit Entrepreneurs at Play ↗" (`index.html:492`).
- **Passa a ser (rascunho):** manter esse e somar o link "Join the waitlist →" para a âncora do formulário do EP, quando existir. Até lá: `#begin` com `data-reason="Entrepreneurs at Play"`.

#### EP-04 · Clique no card · sem mudança · **Pedido dela**
- `index.html:494–502` continua levando ao site. Ela adorou (parte-06 T=0717, T=0934).

#### EP-05 · "Beta" na microschool · **A confirmar**
- Ela quer "something about the beta" (parte-01 T=0822). No FCMD pode não caber. Perguntar, ou deixar só no site do EP.

#### EP-06 · URL do EP · **A confirmar**
- **Hoje:** `index.html:54`, `:492`, `:494`, `:705` apontam para `entrepreneurs-at-play.vercel.app`.
- **Passa a ser:** trocar pelo domínio definitivo quando `entrepreneursatplay.com` for comprado (ninguém fechou quem compra).

#### EP-07 · Fotos do leque · **A confirmar**
- `index.html:497–499`. Ver IM-10 e a questão da amiga.

### 2.12 Meet Dr. Che e a timeline

#### TL-01 · Título · **Pedido dela**
- **Hoje:** `index.html:529`: "From Bafut to *Omaha*."
- **Passa a ser (ditado):** "From Cameroon to *Omaha*."
- **Origem:** parte-06 T=1124: "Instead of Bafut, you can put Cameroon."

#### TL-02 · 2003 · **Pedido dela**
- **Hoje:** `index.html:533`: "Secondary school at Presbyterian Secondary School, Bafut."
- **Passa a ser (ditado):** "Elementary and middle school at Presbyterian Secondary School, Bafut." Ano (2003–2008) e título "Bafut, Cameroon" ficam.
- **Origem:** parte-06 T=1124 e T=1311: "I don't know if Americans will understand what secondary school means."

#### TL-03 · Omaha · **Pedido dela**
- **Hoje:** `index.html:534`: "High school diploma, Benson High School."
- **Passa a ser (ditado):** "High school, Benson High School." Título "Omaha" fica.
- **Origem:** parte-06 T=1311: "You can just put high school, you take out the diploma"; T=1410: "just put Omaha and then Benson High School".

#### TL-04 · Fellowship · **A confirmar** (baixo risco)
- **Hoje:** `index.html:541`: "Child & adolescent fellowship".
- **Passa a ser (rascunho):** "Child & adolescent psychiatry fellowship". Ela se corrige ao ler, em voz alta (fala truncada). Bate com o CV.
- **Origem:** parte-06 T=1410.

#### TL-05 · KETV clicável · **Pedido dela**
- **Hoje:** `index.html:542` não tem link.
- **Passa a ser:** o card inteiro leva a https://www.ketv.com/article/omaha-doctor-talks-anxiety-kids-heading-back-to-school-how-parents-can-help/44788451 (nova aba, `rel="noopener"`). **Cuidado:** a faixa é arrastável (`sections.js:315–332`): arrastar não pode abrir o link. Ver TR-01 para os outros pontos.
- **Origem:** parte-06 T=1505 e T=1552: "So that it takes you there if people are like, is she for real?"

#### TL-06 · Card 2027 · **Pedido dela**
- **Hoje:** `index.html:544`: "Opens a physician-founded microschool in Omaha."
- **Passa a ser (ditado, com trecho inaudível):** "Opens a physician-founded enrichment program and microschool in Omaha."
- **Origem:** parte-06 T=1623: "(inaudível) enrichment program and microschool in Omaha."

#### TL-07 · Foto do card 2027 e a amiga · **Pedido dela**
- **Hoje:** `index.html:544` usa `business-fair`: mulher de camisa jeans e menino.
- **A fala:** "this lady is my friend, I did not tell her that she's on my website, I need to tell her" (parte-06 T=1653). A tela da hora mostra esse card (`frames/keep/1h55m45s.jpg`), então **é provável, não certo,** que seja essa foto. Também aparece em `:497`.
- **Passa a ser:** perguntar qual foto é e publicar só depois de ela avisar a amiga, ou trocar a imagem. Fica a critério dela.

#### TL-08 · Demais cards · sem mudança
- Ela leu UNO, a missão, MD, residência, Positive Discipline e 2024 sem pedir mudança (parte-06 T=1410). Não mexer, salvo DI-02 em `:543`.

#### TL-09 · Carta do fundador · **A confirmar**
- `index.html:517–519`: ela não comentou. Mantém; só `:518` entra na pergunta sobre "organizations".

#### TL-10 · Foto do retrato · ver IM-13.

### 2.13 Credenciais e KETV

#### TR-01 · "As seen on KETV" e a imprensa · **Pedido dela**
- **Hoje:** `index.html:558` e `:592–593` sem link. `:589` tem `data-confirm="ketv-links"`.
- **Passa a ser:**
  - `:558` e `:592` (Aug 10, 2023) levam ao link da KETV. Conferido na tela: é a matéria sobre ansiedade na volta às aulas (`frames/chave/01-54-35_ketv-link.jpg`).
  - `:593` (Oct 12, 2023) fica sem link até ela mandar. Ver pergunta 13.
- **Origem:** parte-06 T=1505 e T=1708: "As seen on KETV, okay".

#### TR-02 · Letreiro · **A confirmar**
- `index.html:552`, `:553`, `:556`: atualizar "Board-certified psychiatrist" (HE-03) e, se for o caso, a NOVA (DI-02). O texto de `:556` é a versão para leitor de tela e precisa acompanhar.

### 2.14 Read, learn, grow

#### LE-01 · O blog é no Substack · **Pedido dela**
- **Hoje:** `index.html:562–596`, sem blog nem link externo.
- **Passa a ser:** a seção continua no site, mas a ação principal leva ao Substack.
  - Em `.learning-head` (`:563–568`, hoje com espaço livre), botão **rascunho:** "Read Dr. Che's articles on Substack ↗".
  - Item de menu "Articles ↗" (NV-01).
  - Nada de sistema de blog no site: "instead of having a blog, the blog is on Substack".
- **URL:** a tela `frames/keep/1h59m50s.jpg` mostra `substack.com/@larisachemd` ("Larisa's Substack"). **Confirmar com ela** (e, já que Ithalo tem acesso, ver no painel a URL da publicação), porque o perfil e a publicação podem ter endereços diferentes.
- **Origem:** parte-07 T=0119: "when you click on it, it takes you to (…) Substack"; T=0140; T=0742: "this will link to my Substack".

#### LE-02 · Antes de apontar para lá · **A confirmar**
- **Conteúdo:** ela diz que ainda não escreveu quase nada (parte-06 T=2103). A tela mostra um post de 28/08/2025. Um link principal para um perfil quase vazio decepciona.
- **Bio:** "recently stepped back from her job as a physician" conflita com "Medical Director" no site (DI-02). Ajustar um dos dois.
- **Decidir com ela:** publicar um primeiro artigo antes do dia 21.

#### LE-03 · Cards atuais · **A confirmar**
- `index.html:571` (carta) e `:577` (self-paced) ficam: ela leu sem objeção. `:582` (Daily Declaration, "Not available yet") ela não comentou. Foto de `:578`: ver IM-11.

#### LE-04 · Redirecionamento do blog antigo · **A confirmar**
- **Hoje:** `vercel.json:19–20`: `/blog` → `/#learning`.
- **Passa a ser:** mantém. Pode ir direto ao Substack depois de confirmada a URL.

### 2.15 FAQ

Ela diz: "I like this frequently asked questions, I'm not going to change much" (parte-07 T=0906). Mexer só no necessário.

#### FQ-01 · "Do you prescribe medication?" · **Pedido dela**
- **Hoje:** `index.html:619` não responde sim.
- **Passa a ser (rascunho):** "Yes. Dr. Che is a medical doctor and prescribes medication for children and teens through psychiatric medication management, which is separate from coaching. Coaching and courses don't include medication. If your child may need medication, or already takes it, we'll talk through the next step on your free call."
- **Observação:** sai "keep working with their current (…) medication provider", que já não combina. Não acrescentar orientação clínica sem ela.
- **Origem:** parte-07 T=0816: "Yes, I do, yes, I do prescribe"; parte-04 T=0542.

#### FQ-02 · "Is coaching the same…" · **A confirmar** (ajuste mínimo)
- **Hoje:** `index.html:618`.
- **Passa a ser (rascunho):** "…Psychiatric care is medical care from a physician, including medication management when it's appropriate…".

#### FQ-03 · "Where do you see families?" · **Pedido dela** (decorrente)
- **Hoje:** `index.html:620`: "Coaching sessions can also happen by phone or Zoom."
- **Passa a ser (rascunho):** "In the Omaha area. Medication management visits can be in person or by telehealth. Coaching sessions are by video; in-person sessions need to be pre-arranged. Dr. Che is licensed in Nebraska and Iowa."
- **Origem:** parte-05 T=1158; parte-04 T=1024.

#### FQ-04 · "What is the developmental assessment?" · **Pedido dela**
- Sai. Ver AS-04.

#### FQ-05 · Escola ou creche · **A confirmar**
- `index.html:621–622`: dependem de SC-03.

#### FQ-06 · Demais perguntas · sem mudança
- `:623`, `:625`, `:626` ficam. `:626` (988/911) é item de segurança e não pode sair.

#### FQ-07 · "Recém-nascidos" · sem ação
- **Conferido:** não existe essa pergunta no site, e nada no site diz que ela atende recém-nascidos. Coerente com "2–5" e com "Children and teens". Sem ação.

### 2.16 Contato e formulário

#### BE-01 · Tirar telefone e workplaces · **Pedido dela**
- Coberto por GL-01 e GL-02. Opções do formulário ficam com `Family coaching`, medication management, parenting course, schools, EP, self-paced e general.

#### BE-02 · Campo "Phone (optional)" do visitante · **A confirmar**
- **Hoje:** `index.html:665`, `:680`, `src/ui.js:265`, `:271`.
- **Observação:** é o telefone **da família**, não o dela. O pedido dela não o atinge. Se ela vai responder só por e-mail, pode sair (e `:680` também). Recomendação: manter opcional, porque ela pode querer ligar para fazer os 15 minutos. Se ficar, `:642` pode continuar "by email or phone".

#### BE-03 · "No medical details" · sem mudança
- `index.html:667`, `:677` ficam. **Mais importantes agora,** com medicação no site.

#### BE-04 · Ferramenta de agendamento · **A confirmar** (depois)
- O formulário abre o e-mail do visitante. Ela não reclamou. Para consultas clínicas, o README já recomenda ferramenta adequada a dados de saúde. Fora do mínimo.

### 2.17 Rodapé e redes

#### FO-01 · Colunas do rodapé · **Pedido dela** (decorrente)
- **Hoje:** `index.html:703–706`.
- **Passa a ser (rascunho):**
  - **Care:** Medication management · Family coaching · Parenting course · Self-paced courses.
  - **For schools** (no lugar de "Organizations"): Schools & centers.
  - **Explore:** Who we help · Seasons · About Dr. Che · Articles ↗ · Entrepreneurs at Play ↗.
  - **Contact:** e-mail · Omaha · privacidade · FAQ.

#### FO-02 · Links das redes · **Pedido dela**
- **Hoje:** o rodapé não tem nenhum.
- **Passa a ser:** faixa com Substack, Instagram, LinkedIn e Facebook, só com os que estiverem ativos. Sem contas não criadas nem URL inventada.
  - **Substack:** ver LE-01.
  - **LinkedIn:** `https://www.linkedin.com/in/larisa-che-md-742848269/` (no `CLAUDE.md`). Publicar depois da reforma.
  - **Instagram:** existe, com 1 post; a URL não está registrada. Ithalo tem acesso.
  - **Facebook:** ainda não existe. `facebook.com/drlarisache` aparece só em mockup de `entregas/`; não usar até a página ser criada.
- **Origem:** parte-06 T=2103: "you can put all your handles"; parte-07 T=0119: "That was the bottom. Yes, that's the social media part"; T=1017: "And find me on social media."

#### FO-03 · Newsletter · **Pedido dela** (decorrente)
- `index.html:693` e `src/ui.js:285`: "parenting and leadership tips" vira "parenting tips". Coberto por GL-02.

### 2.18 Navegação

#### NV-01 · Mais botões no topo · **Pedido dela**
- **Hoje:** `index.html:87–92`: Care, Coaching, Courses, Schools, About, FAQ.
- **Passa a ser:**
  ```
  Who we help (#who) · Seasons (#seasons) · Care (#care) · Coaching (#coaching) ·
  Courses (#courses) · Schools (#schools) · About (#about) · Articles ↗ (Substack) · FAQ (#faq)
  ```
- **Técnica:** são cerca de 650 px de links, mais logo e botão, o que dá cerca de 1.100 px. O burger, hoje em ≤ 1023 px (`main.css:601–603`), passa a ≤ 1119 px. Mudar junto `src/ui.js:117`, que fecha o menu em 1024. O modo preso das estações e do C.A.R.E. continua em 1024: só o menu muda.
- **Origem:** parte-07 T=1125: "like this part, if I was just clicking the buttons at the top, I'll miss all of this"; T=1217: "I will probably make more buttons"; T=1504: "I'll create more links".

#### NV-02 · Menu mobile · **Pedido dela**
- **Hoje:** `index.html:105–114`, `:116`.
- **Passa a ser (rascunho):** Who we help · Seasons · Medication management · Family coaching · Parenting course · Schools & centers · Entrepreneurs at Play · Meet Dr. Che · Read, learn, grow · Articles ↗ · Questions (FAQ) · Contact & free 15-min call. O `.menu` já rola (`overflow-y: auto`). Sem telefone em `:116`.

#### NV-03 · "Care e Coaching parecem levar ao mesmo lugar" · **A confirmar** (técnico)
- **Conferido:** `:87–88` apontam para âncoras diferentes, e as telas mostram destinos corretos (`frames/keep/1h09m00s.jpg` e `1h14m55s.jpg`). A fala está parcialmente inaudível (parte-07 T=1229).
- **Passa a ser:** reproduzir no Chrome com o site novo. Se confirmar, investigar `anchors()` em `src/ui.js:124–137` com `lenis.scrollTo` e os espaçadores de pin. Provável que a queixa se resolva com NV-01.

#### NV-04 · Menu visível para quem não pode rolar muito · **Pedido dela** (decorrente da dor nos dedos)
- **Hoje:** `src/ui.js:63` esconde o menu ao rolar para baixo.
- **Passa a ser:** o menu não some em desktop. No celular, um botão flutuante "Jump to" (abre o `.menu`) e um "Back to top" depois de 600 px.
- **Origem:** parte-05 T=0825: "I cannot scroll without it hurting"; parte-04 T=0855: "How do I go back to the top?"; parte-07 T=1125.

#### NV-05 · Destaque da seção atual · **A confirmar**
- Pequena folha já existente em `main.css` (`.nav-links a::before`) fica acesa na seção ativa, via ScrollTrigger. Ajuda a se orientar (achado F13 da auditoria). Não obrigatório.

#### NV-06 · Atalhos dentro das estações · sem mudança técnica
- `index.html:295` ("Skip to the services ↓") e os pontos `:288–294` continuam. Conferir depois da mudança.

### 2.19 Logo

#### LG-01 · Novos conceitos · **Pedido dela**
- **Hoje:** `public/logo/*`, `src/partials/logo-anim.svg`.
- **Passa a ser:** ver 3.3. O logo atual segue até ela aprovar outro.
- **Origem:** parte-06 T=1026: "I want you to keep rethinking the logo. I like it, but (…) it can be more"; parte-07 T=1057, T=1113; T=1120 (Ithalo): "I will create more logos".

#### LG-02 · M e D atrasados · **Pedido dela**
- **Hoje:** `src/loader.js:39`, `:42`, `:67`: todas as letras sobem juntas.
- **Passa a ser:** ver 3.3.
- **Origem:** parte-06 T=1051: "I can see the M and the D jumping in late and sitting down (…) they're slow and then they sleepily like, oh, oops, okay, okay, okay, sorry, sorry, (…) clumsily falling."

### 2.20 Operação, prazo e aprovação

#### OP-01 · Publicar antes do Squarespace expirar · **Pedido dela**
- **Situação:** ela mandou o site antigo expirar em novembro (parte-04 T=0054). Paga cerca de US$ 8/mês pelo domínio e usa o e-mail nele (parte-07 T=0215).
- **A fazer, nesta ordem:**
  1. Saber a data exata e se o domínio e o e-mail estão no mesmo plano do site.
  2. Confirmar onde estão registrador, DNS e e-mail. **Não presumir** que o e-mail sobrevive à expiração.
  3. Adicionar o domínio ao projeto Vercel `familycoachmd` (`.vercel/project.json`), trocando só os registros web. **Não tocar em MX, SPF e DKIM** (README:20).
  4. Testar `Grow@familycoachmd.com`, enviando e recebendo.
  5. Testar os redirects de `vercel.json`.

#### OP-02 · Meta: tudo no ar até 21/11 · **Pedido dela**
- **Origem:** parte-07 T=1125: "I have an event on the 21st and I hope to publish all of this by the 21st"; T=1555: "I'm hoping that we can launch next week"; parte-08 T=1055: "the week after is fine (…) We can tweak it as we go."
- **Dúvida:** o que é o evento e o que precisa estar pronto (pergunta 16).

#### OP-03 · Aprovação pelo Canva · **Pedido dela**
- **Como funciona:** Ithalo põe prints do site no Canva, ela edita os textos lá e ele atualiza o site. O link ao vivo continua disponível, porque ela gosta de ver.
- **Regra de texto:** "unless it's like flat-out wrong", está bom para começar (parte-04 T=1024).
- **Organizar o Canva por seção, com os IDs deste documento,** e marcar os rascunhos. Ela faz questão de que as palavras sejam dela e quer que os textos citem a origem nos materiais dela (parte-05 T=0052).
- **Origem:** parte-05 T=1349; parte-08 T=1658–1753.

#### OP-04 · Ela já usa a prévia · **A confirmar**
- Ela usa o link em apresentações (parte-10). Fazer mudanças em deploy de preview e só promover em lotes, para não quebrar o link no meio de uma fala.

#### OP-05 · Materiais do Canva · **A confirmar**
- Ela quer dar acesso completo ao Canva (parte-04 T=1321; parte-05 T=0005). Usar como fonte dos textos do coaching ("six-week plan") e dos cursos. Quando o Canva e este documento divergirem, vale o que ela ditou em 05/11.

---

## 3. Especificações de interação

### 3.1 Planta 3D de verdade (Decisão do Ithalo)

**O que é.** Uma planta procedural em Three.js, que nasce da terra, sobe, solta folhas uma a uma e responde ao vento. Ela já ama a planta do hero, então não é trocar: é dar à seção de coaching uma planta que realmente cresce.

**Onde entra e o que substitui**

- **Entra em:** `.sprout`, ao lado de "Is this you?" (`index.html:352–362`), onde ela estava olhando ao pedir (parte-04 T=1655; parte-05 T=1057).
- **Substitui:** o SVG do broto, mas **sem apagá-lo**: ele vira o fallback.
- **Não mexe em:** a planta do hero e das estações (`src/leaves3d.js`), de que ela gostou (parte-03 T=2126). Evoluir o hero fica para depois.

**Abordagem técnica (compatível com o stack: Vite, vanilla, three 0.170, GSAP)**

| Peça | Como |
|---|---|
| **Arquivos** | `src/plant3d.js` (cena), `src/plant-parts.js` (peças em comum). Mover `leafShape`, `curlGeometry`, `patch`, `makeLeaf` e o torneado do vaso de `leaves3d.js` (linhas 39–114 e 152–177) para `plant-parts.js`; os dois importam de lá. |
| **Caule** | `TubeGeometry` sobre `CatmullRomCurve3` em S leve, 120 segmentos, 10 radiais. Crescimento por `geometry.setDrawRange(0, g × total)`, mais uma pequena esfera na ponta para não mostrar o tubo oco. Afilamento por atributos `aT` (0 a 1) e `aCenter` no `onBeforeCompile`, como o `patch()` já faz. |
| **Folhas** | 7 nós ao longo do caule, em ângulo áureo (137,5° em torno de Y) para ler como planta real em volta do caule. `makeLeaf` com `curveSegments` 18. Cada folha nasce enrolada (`rotation.x` 1,1 rad, escala 0,001) e abre com `back.out`. Cor por idade: novas `#D3D8A4`, adultas `#8C9A5B` e `#6E7157`. |
| **Contorno** | Tinta fina (`hull` 0,018, contra 0,045 no hero): mantém a marca, mas parece mais natural. Testar sem contorno. |
| **Vaso e terra** | Mesmo vaso do hero. Sem novos assets, nada gerado por IA, sem modelo baixado. |
| **Luz** | Hemisférica + sol + preenchimento, como o hero. Sem `shadowMap`: sombra de contato com a textura radial que já existe. |
| **Por que não um modelo GLB** | Mais pesado, difícil de animar o crescimento e exige licença. O procedural é leve e nasce da mesma folha do logo. |

**Como cresce**

```
g_alvo = 0,30 × progresso_scroll + 0,70 × (caixas_marcadas / 5)
```

- **Rolagem:** `ScrollTrigger` em `.checklist-grid`, `start: 'top 85%'`, `end: 'center 55%'`, `scrub`. **Sem pin:** nenhuma rolagem a mais, por causa dos dedos dela. Ao chegar, a planta já tem caule e duas folhas.
- **Cliques:** cada caixa marcada soma 0,14 e solta a próxima folha. Desmarcar faz recuar, como hoje (`sections.js:230–237`). Com as 5, a última folha abre no topo e o brilho do sol sobe (`.sprout::before`, em CSS).
- **Suavidade:** mola (`k` 10, `d` 5), com leve passada do ponto.
- **Limiares:** folhas em `g` = 0,08 / 0,20 / 0,32 / 0,46 / 0,60 / 0,74 / 0,88.
- **Mensagem:** "Then private family coaching was made for you." com ≥ 2 caixas continua igual (`sections.js:235`).
- **Clique na planta:** só balança, com raycast como `onSlotClick` em `leaves3d.js`. Não faz crescer, porque Ithalo já explicou a ela que o crescimento vem das caixas (parte-04 T=0008).
- **Ambiente:** respiração de 8 s, vento lento e cursor como vento, iguais ao hero.
- **Integração:** novo `export const plantState = { checked: 0, scroll: 0 }` em `sections.js`, como `seasonState`. `checklist()` continua animando o SVG **e** atualiza `plantState`.

**Slot e layout**

- `.sprout` com `position: relative` e `min-height: clamp(340px, 42vw, 520px)`.
- `canvas` absoluto com `inset: -10% -10% 0`, para as folhas passarem da caixa.
- Classe `html.has-plant3d .sprout svg { visibility: hidden; }`, ligada só depois do **primeiro quadro** desenhado.

**Mobile**

- Hoje os celulares não baixam three.js (`main.js:90`). A planta abre uma exceção com portão.
- Carrega com `IntersectionObserver` (`rootMargin: '800px'`), só se `deviceMemory` ≥ 4 (ou ausente), `hardwareConcurrency` ≥ 4 e sem `saveData`.
- `pixelRatio` no máximo 1,25; 30 fps; 5 nós em vez de 7.
- **Não precisa estar pronto no dia 21:** se o tempo apertar, o celular fica com o SVG, que já funciona.

**Desempenho**

- Nada de three.js antes de a seção se aproximar: zero impacto no carregamento inicial.
- Conferir no `dist/assets` que three.js virou **um chunk só**, e não duplicado com `leaves3d` (hoje 518 KB sem compressão).
- `renderer.setAnimationLoop` só com a seção visível, aba ativa e sem pausa ativa com `g` estabilizado. Parar com `IntersectionObserver`.
- Meta: até 40 mil triângulos, 60 fps no desktop, sem travar a rolagem do Lenis.
- **Vigia:** média abaixo de 24 fps por 3 s → destrói a cena e volta ao SVG.
- `destroy()` completo, como em `leaves3d.js:445–459`. Limpar também no `webglcontextlost`.
- Dois contextos WebGL no desktop (hero e planta) não pesam, porque só um desenha por vez. Conferir que `activeSlot()` em `leaves3d.js` devolve `null` longe das áreas dele.

**Fallback e acessibilidade**

| Situação | Comportamento |
|---|---|
| `prefers-reduced-motion` | Sem three.js. SVG, com mudanças instantâneas (já feito em `sections.js:232`). |
| Sem WebGL ou contexto perdido | SVG. |
| Aparelho fraco ou `saveData` | SVG. |
| "Pause moving content" (`motionState.paused`) | Vento e respiração param. O crescimento por clique continua, porque foi o visitante quem pediu. |
| Leitor de tela | `.sprout` segue `aria-hidden`; `.check-result` anuncia. |

**Pronto quando:** ao marcar 5 caixas no Chrome desktop, a planta cresce do broto ao topo sem salto, sem cortar folhas, a 60 fps; desmarcar recua; com WebGL desligado o SVG funciona igual.

### 3.2 Gangorra com livros (Decisão do Ithalo)

**Onde está.** `index.html:405–425` (`.balance`), `src/sections.js:242–273`, `main.css:345–353`. Tela: `frames/keep/1h39m40s.jpg`.

**O que muda.** Os "cubos" são `.stones` (lado Firm, `index.html:412`). **Decisão de design a confirmar com Ithalo:** trocar também os seixos de `.pebbles` (lado Kind, `:411`), senão a imagem fica com pedras de um lado e livros do outro. Recomendação: livros dos dois lados, com os do Kind em tons mais quentes.

**Desenho (mesmo traço do site: contorno `var(--bark)` 3 px, cantos arredondados, preenchimento chapado).** Coordenadas no `viewBox 0 0 480 260`, com a base em y≈162, o topo da "madeira":

| Lado | Livro | x | y | largura | altura | rotação | cor da capa |
|---|---|---|---|---|---|---|---|
| Kind | base | 62 | 146 | 68 | 16 | 0 | `#D9B9A6` |
| Kind | meio | 68 | 130 | 58 | 16 | −2° | `#E7CFC0` |
| Kind | topo | 72 | 114 | 50 | 16 | 3° | `#BDAF90` |
| Firm | base | 346 | 145 | 70 | 17 | 0 | `#9AA6AE` |
| Firm | meio | 352 | 128 | 60 | 17 | 0 | `#7F8C95` |
| Firm | topo | 358 | 111 | 48 | 17 | −2° | `#6E7157` |

Cada livro é um grupo:

```html
<g class="book" data-o="96 162">
  <rect class="book-cover" x="62" y="146" width="68" height="16" rx="3"/>
  <rect class="book-pages" x="120" y="149" width="10" height="10"/>
  <path class="book-lines" d="M70 149 L70 159 M75 149 L75 159"/>
</g>
```

- `.book-pages` em `var(--linen)`, `.book-lines` com traço 1,8.
- As cores de seixo e pedra (`#D9B9A6`, `#9AA6AE`) continuam nas capas de base, então o degradê do trilho (`main.css:356–357`) não muda.
- Em largura < 380 px, esconder `.book-lines`: com o desenho a cerca de 60%, viram ruído.
- **Marca-página:** uma folhinha `var(--olive)` no livro do topo de cada lado, com escala 0, igual a `.beam-sprouts`.

**Física e interação**

- **Continua igual:** `<input type="range">`, folha no controle, faixa de equilíbrio |v − 50| ≤ 8, inclinação até ±13°, `elastic.out(1, 0.45)` e o brilho (`sections.js:252–268`).
- **Novo:** os livros reagem à inclinação `θ` com atraso (`gsap.quickTo`, `elastic.out(1, 0.5)`, 0,8 s):
  - livro do topo: `x = θ × 0,55`, `rotation = base + θ × 0,20`;
  - livro do meio: `x = θ × 0,25`, `rotation = base + θ × 0,08`;
  - livro de base: fixo.
- **Nos extremos** (|θ| > 10°), o topo do lado baixo escorrega até a borda e inclina mais 6°. **Nunca cai:** deslocamento limitado a ±8 unidades.
- **No equilíbrio:** os dois livros do topo dão um pulinho (`y: −4 → 0`) e os marca-páginas abrem junto com os brotos centrais.
- **Origem:** `gsap.set(book, { svgOrigin: book.dataset.o })`, como já se faz com a viga.
- **Reduced motion:** duração 0 e deslocamento 0: só gira a viga (`sections.js:252` já faz isso).

**Rótulos**

- `Kind` (x 96, y 200) e `Firm` (x 381, y 196) **ficam onde estão**, abaixo da viga, inclinando junto. Escrever na lombada foi descartado: com 16–17 unidades de altura não fica legível no celular.
- Legendas e o estado para leitor de tela (`sections.js:254–258`) não mudam.
- "Drag the leaf to find the balance" (`index.html:424`) continua, porque o controle continua sendo uma folha.
- **CSS:** sai `.pebbles` e `.stones` (`main.css:346–347`), entra `.book-*`.

**Pronto quando:** arrastar da esquerda à direita faz os livros deslizarem sem atravessar a viga nem um ao outro; em 360 px continua limpo; teclado funciona (setas no `range`).

### 3.3 Logo: conceitos novos e M e D atrasados

**Conceitos (Pedido dela).** Mostrar de 3 a 4 no Canva, em preto e em cor, em tamanho de menu e de favicon. Feitos à mão, em vetor. Sem geração por IA, que ela rejeita. Mantidos: terra, folha, as duas folhas pai e filho, e o tom simples.

| Conceito | Ideia |
|---|---|
| **A. M e D sentados** | O atual, redesenhado: M e D ligeiramente tortos, sentados sobre o caule, com o D encostado no M. O estático já conta a piada da animação. |
| **B. A folha que brota da letra** | O caule nasce do "y" e sustenta as duas folhas. Mais fácil de ler em tamanho pequeno. |
| **C. Monograma FC** | Duas folhas formando as iniciais, para perfil de redes e favicon, com o nome completo ao lado. |
| **D. Arco de sol** | O caule vira um arco sobre o nome, ligando ao sol do loader e do hero. |

**Requisito para qualquer conceito:** M e D têm de ser paths separados, para a animação funcionar. Se ela escolher outro, atualizar `public/logo/*`, `favicon*`, `apple-touch-icon.png`, `og-image.jpg`, `src/partials/logo-anim.svg`.

**Animação: M e D chegam atrasados (vale para o logo atual, pode sair antes dos conceitos)**

Onde: `src/loader.js`. Em `src/partials/logo-anim.svg`, pelas caixas dos paths, os dois últimos `.glyph` (x≈2123–2436 e x≈2383–2636) são M e D. **Conferir visualmente** e dar a eles as classes `.glyph-m` e `.glyph-d`.

| Tempo (s) | O que acontece | GSAP |
|---|---|---|
| 1,90–2,45 | "FamilyCoach" sobe e fica. Silêncio onde deveriam estar M e D. | `glyphs` sem M e D, `y: 0`, `stagger: 0.045` |
| 2,45 | O "h" olha de lado: inclina 3° e volta. Um quê de "cadê eles?". | `rotation: 3`, `yoyo` |
| 2,55–3,15 | **M** entra pela direita, devagar e sonolento, cambaleando sobre o caule. | `x: 420 → 0`, `y: [−8, 0, −6, 0]`, `rotation: [−6, 4, −3, 1]`, `sine.inOut` |
| 2,70–3,30 | **D** vem atrás, tropeça, passa do ponto e cai sentado. | `x: 460 → −14 → 0`, `rotation: [8, 18, −4, 0]`, `y: −12 → 22 → 0` |
| 3,30 | Esbarra no M, que balança. O "h" chega para o lado e volta. | M `rotation: [−4, 2, 0]`; h `x: −6 → 0` |
| 3,35–3,55 | **Sentam:** esmagam e voltam. | `scaleY: 0.86 → 1`, `transformOrigin: '50% 100%'`, `back.out(2.5)` |
| 3,40 | Linha do loader: **"oops… sorry!"** (Caveat, rascunho), por 0,5 s. | 4º `.loader-word` e `say(3)` |
| 3,60 | O pulso das folhas, hoje em 2,7, passa para depois de sentarem. | `wrap`, `scale: 1.04` |

**Ajustes técnicos**

- `HARD_CAP` (`loader.js:3`) sobe de 3600 para 4600.
- A saída de segurança de 6 s (`index.html:29–34`) continua valendo. Total previsto: cerca de 3,8 s + saída de 1,15 s. Medir.
- Segunda visita: `tl.timeScale(3)` (`loader.js:72`) já encurta tudo. Clique ou tecla pulam (`:48–51`).
- `prefers-reduced-motion`: sem a cena, logo estático (`loader.js:26–34`).
- **Opcional, depois:** o M e o D fazem um aceno de cabeça no logo do menu ao passar o mouse. Hoje é `<img>` estático (`index.html:85`) e exigiria inline.

---

## 4. Inventário de imagens

**Regras dela**

- **Nada de IA:** "I don't like AI images, they're so too fake" (parte-02 T=1412), "creepy" (T=1534).
- **Banco de imagens** ou ilustração: "I'd rather go buy an image (…) or just have (…) playful things like this" (T=1503).
- **Diversidade:** "my kids are black. I don't want all of it to look like, okay, I'm just marketing to black kids" e "different kinds of faces" (parte-06 T=0235, T=0311).
- **Estilo:** "down to earth like this, but very crisp and just on point" (T=0318), orgânico, com bagunça real. A foto verde do Substack é "soft and playful" (parte-07 T=0542).
- **Crianças só com autorização.** Nunca imagem de paciente. Foto de banco em site médico não pode sugerir paciente real: sem legenda como "nosso paciente".

**Referências**

- **Favorita (culinária):** `frames/chave/01-42-05_foto-estoque-culinaria.jpg`, Getty via Unsplash+ (**paga**). Endereço na barra: `unsplash.com/photos/close-up-view-cute-kid-in-white-chef-uniform-preparing-food-on-the-kitchen-BOF1ih6FkM4`. **Confira o final ao abrir.** Ela prefere as cenas com farinha, ovos, mesa orgânica (parte-06 T=0158, T=0235). Ithalo disse que consegue (T=0231).
- **"Foto verde" do Substack:** a tela `frames/keep/1h59m50s.jpg` mostra a imagem do perfil (círculo vermelho em fundo verde); parte da conversa não tem tela. **Confira no Substack qual é.**
- **Estilo aprovado por ela:** `frames/chave/01-25-30_canva-parenting-classes.jpg` (família real, luz natural) e a ilustração de `01-28-25_canva-school-avoidance.jpg` (crianças de várias origens).

**Inventário** (`data-photo` em `index.html`; dimensões em `vite.config.js:5–11`)

| ID | Linha | Foto atual | O que mostra | Decisão | Substituta (foto real de banco) |
|---|---|---|---|---|---|
| IM-01 | 178 | `cooking` | Duas crianças e massa; **são os filhos dela** (parte-08 T=0049) | **Troca** | Pai ou mãe e filho na cozinha ou à mesa, conversando, em luz natural. Família de outra origem |
| IM-02 | 186 | `speaking` | Menino de colete, P&B | **Troca** | Adolescente e adulto conversando, ou adolescente em chamada de vídeo em casa, sem parecer consultório frio |
| IM-03 | 194 | `mentoring` | Jovem e criança | **Troca** | Grupo diverso de pais em roda, material na mão |
| IM-04 | 202 | `typewriter` | Criança e máquina de escrever | **Troca** | Professora e alunos em sala bem iluminada |
| IM-05 | 218, 510, 543, 572 | `founder` | **Retrato dela** | **Fica** | Novo em alta, quando ela mandar (IM-13) |
| IM-06 | 461 | `mentoring` | Collaborate | **Troca** | Reunião de equipe de escola, professores conversando |
| IM-07 | 462 | `typewriter` | Assess | **Troca** (AS-05: fica o A, com Align) | Equipe alinhando painel ou plano em conjunto. **Nada de criança sendo observada** |
| IM-08 | 463 | `garden` | Re-imagine | **Troca** | Sala de aula sendo rearranjada, mesa com materiais, mão de adulto |
| IM-09 | 464 | `speaking` | Educate | **Troca (pedido dela)** | "some grown-up there": adulto liderando formação de professores |
| IM-10 | 497–499 | `business-fair`, `flight`, `hens` | Leque do EP | **Depende:** são do programa EP, ver TL-07 e o site do EP | Sincronizar com as fotos escolhidas na preparação do EP |
| IM-11 | 578 | `cooking` | Card "Self-paced courses" | **Troca** | A favorita, ou pai ou mãe com tablet e criança |
| IM-12 | 544 | `business-fair` | Card 2027 | **Depende:** provável foto da amiga | Foto da culinária ou outra do EP, se a amiga não aprovar |
| IM-13 | hero (novo) | `founder` | Rosto no canto | **Novo** | `founder` serve no círculo de 148 px. Pedir retrato em alta, com luz natural, para o hero e o About |
| IM-14 | | `capitol`, `cuisine`, `golf`, `guitar`, `horse`, `podcast`, `surprise` | Em `public/img/`, não usadas neste site | **Fora** | Apagar de `public/img` e de `PHOTOS` só depois do lançamento, se não houver uso |

**Não são fotos, ficam**

- Ilustrações SVG inline dos tiles, do cartão de Care e dos cards da timeline (`:179–203`, `:318`, `:533–542`).
- `public/svg/season-0…4.svg`, `leaf-mask.svg`, `leaf-thumb.svg`, `potted-plant.svg`.
- `public/logo/*`, salvo LG-01. `og-image.jpg`, salvo ES-03.

**Técnica para fotos novas**

- Exportar `-sm` (480 px) e `-lg` (até 1200 px) em WebP para `public/img/`.
- Registrar em `PHOTOS` (`vite.config.js:5–11`): **nome ausente derruba o build** ("Unknown photo").
- Atualizar `alt`. A máscara em folha (`.leaf-frame`) corta as bordas: enquadrar o rosto no centro.
- **Fotos com tom natural:** ela elogiou o "crisp". Não aplicar o duotom verde sem testar antes.
- **Guardar a licença** de cada foto (fonte, ID, comprador, data). A Unsplash+ tem custo: ver pergunta 11.

---

## 5. Ordem de implementação

Hoje é sexta, 06/11. O evento é sábado, 21/11. Ela prefere lançar imperfeito.

### Fase 0: antes de escrever código (06–07/11)
1. **Cópia de segurança** do site (não há repositório git na pasta).
2. Mandar as perguntas da seção 7 e a pergunta 1 (Assess) com prioridade.
3. **Descobrir a data do Squarespace** (OP-01).
4. C.A.R.E. decidido: Opção A, com Align (AS-05); o texto do passo vai para a aprovação dela.

### Mínimo para publicar antes de 21/11

| # | Bloco | Itens | Esforço |
|---|---|---|---|
| 1 | Texto com risco: telefone, Gesell e Assess, workplaces, periods, nutrição, New Community | GL-01, GL-02, AS-*, CO-03, CO-04, CU-02, SC-01, FQ-04 | Pequeno |
| 2 | Care e credenciais | CA-01 a CA-05, CU-01, FQ-01, FQ-03, ES-01, ES-02, DI-01, DI-02, HE-02, HE-03 | Pequeno |
| 3 | Coaching e timeline | CO-01, TL-01 a TL-06, SE-01, TR-01 | Pequeno |
| 4 | EP no card | BA-01, EP-01 a EP-03 | Pequeno |
| 5 | Navegação | AU-01, SE-04, NV-01, NV-02, NV-04, FO-01, FO-02, SC-05, SC-06 | Médio |
| 6 | Substack | LE-01, LE-02 | Pequeno |
| 7 | Imagens | IM-01 a IM-12: no mínimo, as que têm rosto de criança sem autorização clara e as pedidas por ela (IM-09, IM-11) | Médio |
| 8 | Rosto no hero | HE-01, variante escolhida no Canva | Pequeno |
| 9 | Aprovação no Canva e ajustes | OP-03 | Médio |
| 10 | Mobile essencial (lista abaixo) | | Médio |
| 11 | Domínio, DNS e e-mail | OP-01 | Pequeno, mas crítico |

**Mobile essencial.** Ela aceita lançar sem polimento total (parte-07 T=1555: "That will be done in the future"), mas sem isto não publicar:

- Menu abre e fecha, e todos os links funcionam; "Jump to" visível.
- Sem rolagem horizontal da página. Faixas horizontais (`.journey-track`) arrastam com o dedo.
- Título de Care em três linhas não estoura a 360 px.
- Formulário e e-mail funcionam. Nenhum `tel:` além de 988 e 911.
- Fotos com proporção correta (achado F01 da auditoria; conferir em 360 e 390 px).
- Rosto no hero não cobre texto nem botão.
- Um toque basta para navegar nos tiles.

### Se der tempo, antes do dia 21; se não, logo depois

| # | Item | Observação |
|---|---|---|
| 12 | Gangorra com livros (3.2) | Pequeno. Decisão do Ithalo: boa candidata a entrar no mínimo |
| 13 | M e D atrasados (3.3) | Pequeno a médio. Encanta logo no início; ela vai notar |
| 14 | Planta 3D no desktop (3.1) | Médio a grande. O SVG segue como garantia, então não bloqueia a publicação |
| 15 | Planta 3D no celular | Depois da versão desktop estabilizada |
| 16 | Conceitos de logo (LG-01) | Entrega em paralelo, para ela escolher; a troca do arquivo vem depois |

### Depois do lançamento
- Itens opcionais: NV-05, CA-07, BE-04.
- Decisão sobre creches (SC-03), se ela não responder antes. **Enquanto não responder, tudo fica como está, exceto o que foi pedido.**
- Polimento mobile mais amplo. Limpeza de CSS morto (`.faith*`, `main.css:400–412`, `:609`).

---

## 6. Riscos e dependências técnicas

| Risco | Onde | O que fazer |
|---|---|---|
| **Sem controle de versão** | `familycoachmd` não é repositório git | Copiar a pasta antes; usar deploy de preview e rollback do Vercel |
| **Âncora removida** | `#assessment`: `index.html:375`, `:462`, `:624`; `vercel.json:10` | Tirar tudo junto. `anchors()` não quebra em âncora ausente, mas o link fica morto |
| **Âncoras novas e offsets** | `#who`, `#dr-che`, `#welcome`; `ui.js:128` usa `offset: -80` | Testar cada link com as estações e o C.A.R.E. presos, e em saltos longos |
| **Animação do C.A.R.E.** | `sections.js:279–303`: índices fixos em 4 passos e letras por posição | Com a Opção A, nada. Com B ou C, mudar número de passos, `+=2000` e o mapa de letras **juntos**. Repetir o teste F02 da auditoria (voltar de um link do rodapé e conferir que só um passo aparece) |
| **Remoção altera medidas** | `details#assessment` e `.workplace` saem | `ScrollTrigger.refresh()` já roda em `main.js:38`; conferir pins depois das fontes e das fotos |
| **SplitText no título de 3 linhas** | `sections.js:28–46`, `.split` em `:305` | Testar `span` em bloco com `mask: 'lines'`. Sem JS, as três linhas precisam continuar legíveis |
| **Manifesto só aceita texto puro** | `sections.js:81` reescreve o `textContent` | Não pôr links nem `<em>` em `.manifesto-body` |
| **Valores do formulário** | `data-reason` em `:314`, `:391`, `:444`, `:446`, `:473`, `:577`; `value` em `:653–660`; `pickReason()` | Trocar nos dois lados. Tirar `:479` e `:704` junto com `:659` |
| **Menu: duas larguras** | CSS `max-width: 1023px` em `main.css:601`; JS `min-width: 1024px` em `ui.js:117` | Mudar juntos para 1120. Não mexer no matchMedia dos pins |
| **Fotos no build** | `vite.config.js:5–11` lança erro em nome desconhecido | Registrar dimensões antes do `data-photo` |
| **Link na faixa arrastável** | `sections.js:319–332`: `moved` é calculado, mas não bloqueia clique | Cancelar clique se `down.moved` |
| **KETV e letreiros duplicados** | `marquee()` duplica o conteúdo (`sections.js:341`); `:556` é cópia para leitor de tela | Editar `:552–553` e `:556` juntos |
| **WebGL duplo** | `leaves3d` e `plant3d` | Só um desenha; garantir chunk único; `destroy()` no `webglcontextlost` |
| **`z-index` do rosto** | `.leaves-stage` é `fixed`, `z-index: 3`, `pointer-events: none` | `.hero-face` com `z-index: 4` |
| **Duração do loader** | `HARD_CAP` e a saída de 6 s em `index.html:29–34` | Medir: animação + saída abaixo de 6 s, inclusive em aparelho lento |
| **`data-confirm`** | `:313`, `:373`, `:375`, `:470`, `:476`, `:589` | Tirar os resolvidos; resta `clinical-operations`, até ela confirmar. Ver checklist |
| **Testes visuais** | `tools/shots.sh` é pouco confiável em seções presas (README:37); `?shot=` só em DEV | Conferir estações e C.A.R.E. em navegador real. Usar `tools/mobile.html` para 390 px |
| **E-mail ao trocar DNS** | README:20 | Preservar MX, SPF e DKIM; testar. **Maior risco de negócio** |
| **Expiração do Squarespace** | Data desconhecida | Ver OP-01 antes de tudo |
| **`dist/` desatualizado** | `dist/` tem o telefone e o Gesell até novo build | Rodar a checagem da seção 9 também em `dist/` depois do build |
| **Cache do OG** | Facebook e LinkedIn | Depois de publicar, reprocessar no depurador de compartilhamento |
| **Dependência do EP** | Texto, âncora de waitlist e domínio | Alinhar com a preparação em `entregas/site/` (outra sessão) |
| **Afirmações clínicas** | Medicação, telehealth, licenças | Não publicar sem as respostas às perguntas 2 e 3. Não listar remédios nem condições |

---

## 7. Perguntas para a Larisa (em inglês, prontas para enviar)

> Hi Dr. Che! Thank you again for Thursday, I'm already working on all of it. To move fast, I have a few quick questions. A voice note is perfect, and you can answer in any order. The first three matter most because this is a medical site.
>
> **Medical content**
>
> 1. **The "Assess" step in C.A.R.E.:** you asked me to take out Gesell. I'd like to go a step further and take out the whole Assess step, the developmental assessment question and any mention of it, so the site only promises what you're offering today. I know C.A.R.E. is your acronym, and I love it, so I'd keep it with a new "A". For example, "Align: we align on shared goals and everyday expectations across directors, teachers and families." Are you OK with that? Do you prefer "Align", "Attune", or another word of your own?
> 2. **Medication management:** when the site goes live, are you ready to take new patients for this service? You mentioned you don't do it separately yet. What age range should I show? Would visits be in person, telehealth or both, and where would the in-person visits happen? Is it for families in both Nebraska and Iowa? Do you want to mention insurance or self-pay, or keep that for the free call?
> 3. **Your current roles:** right now the site says you're Medical Director at NOVA Treatment Community and Assistant Clinical Professor at Creighton. Are both still current? If not, how would you like me to word them? Also, your Substack bio says you recently stepped back from your job as a physician. I want the two to match.
> 4. **The FAQ answer on medication:** does this sound right? "Yes. Dr. Che is a medical doctor and prescribes medication for children and teens through psychiatric medication management, which is separate from coaching. Coaching and courses don't include medication."
>
> **Services**
>
> 5. **Childcare centers:** you said "I need to leave childcare centers alone." Should I keep them on the site or make that section only about schools? I won't remove anything until you tell me.
> 6. **Also on schools:** do you want School Avoidance ("Why Do Kids Skip School?") mentioned there?
> 7. **"At work":** I'm removing workplaces and leaders. Your mission text still says "at home, at school and at work", and your letter says "organizations like yours". Keep those words, or take them out too?
> 8. **Coaching:** "One 1-hour session a week for 6 weeks. Family sessions mixed with one-on-one time. Video sessions, or in-person.* Can invite an extended family member for a bonus session.* *Needs to be pre-arranged." Is that right? Does "pre-arranged" apply to both?
> 9. **Contact form:** I removed your number. Is it OK if families can still leave their own phone number (optional), so you can call them for the free 15 minutes? Or email only?
>
> **Entrepreneurs at Play on this site**
>
> 10. **Waitlist:** "Opening January 4, enrollment at capacity, join the waitlist for Fall 2027." Is this right? Should I call the two sides "health and wellness wing" and "academic wing" on the site, or is that just how we think about it? Should "beta" appear here too, or only on the Entrepreneurs at Play site?
>
> **Photos**
>
> 11. **Stock photos:** your favorite baking photo is a paid Unsplash+ image. Are you OK with me licensing it and other stock photos for the site? (Tell me if you'd like to approve the cost first.) Do I have your OK to keep showing your children in the photos you sent me, or would you rather use only stock photos on this site?
> 12. **Your friend:** which photo is your friend in? Once you've told her, let me know. If you'd rather, I'll swap it.
>     **Your portrait:** do you have a recent high-resolution photo with natural light? I'm testing your face in the corner at the top of the page, like you suggested, and I'll show you options.
>
> **Links**
>
> 13. **KETV:** do you have the link to the October 2023 interview on talking with kids about war? I have the back-to-school one.
> 14. **Substack:** is substack.com/@larisachemd the right address to link? It's the profile I saw. Would you like to publish a first article before the event, so people have something to read?
>     **Other accounts:** which Instagram and LinkedIn links should go in the footer? I'll add Facebook once the page is ready.
>
> **Launch**
>
> 15. **Squarespace:** on what date does your old site expire? Does your domain and your Grow@familycoachmd.com email live in that same plan? I want to move everything before that date so your email keeps working.
> 16. **Your event on the 21st:** what is it, and what must be live or ready for it?

---

## 8. Fora de escopo / para depois

Ela citou, mas não entra neste trabalho.

- **Livro ilustrado e flashcards** no estilo dos cards: perguntou várias vezes, e Ithalo disse que sim (parte-05 T=1625, T=2214, T=2218; parte-06 T=0730). Não entra nos US$ 2.000. Orçar à parte.
- **Sistema de blog no site:** decidido que não; o blog é o Substack (parte-07 T=0140).
- **Número comercial:** só quando ela ativar: "When we start getting business" (parte-07 T=1037). Aí volta ao site, com campo `telephone` no JSON-LD.
- **Serviços que ela não oferece:** coaching corporativo e séries de eventos (parte-05 T=0005).
- **Currículo curto** com "entrepreneur" (parte-05 T=0746) e **Trademark** (parte-05 T=0451, parte-08 T=2239): fora do site.
- **Curso "Parenting During the Holidays"** e **programa School Avoidance** como páginas próprias: ver SC-07.
- **Faixa "Daily Declaration for Kids":** segue "Not available yet"; ela não comentou.
- **Canal do YouTube, redes e gestão de US$ 150:** tratados fora desta preparação.
- **Tudo sobre o site do EP** (Enrichment, Summer, T6, 3-3-3 LIFT): preparação à parte, em `entregas/site/`. Aqui entra só o card.
- **Evolução 3D da planta do hero**, ferramenta de agendamento e formulário com envio próprio: depois.

---

## 9. Checklist final de verificação

### 9.1 Termos que não podem sobrar

Rodar em `index.html`, `src/`, `public/` e `vercel.json`, **e de novo em `dist/` depois do build**. (A pasta `node_modules` não entra; os documentos `.md` também não, porque não vão ao ar.)

```bash
cd familycoachmd
grep -rniE "gesell|gdo|developmental (assess|observ)|#assessment|assess(ment)?\b" index.html src public vercel.json
grep -rniE "workplace|leaders?\b|leadership" index.html src public
grep -rniE "periods" index.html src public
grep -rniE "nutrition|mindfulness and exercise|unlimited email" index.html src public
grep -rniE "new ?community" index.html src public
grep -rnE "452-?0133|4520133|tel:\+1" index.html src public
grep -rnE "0–5|video visits|phone or zoom|Two 1-hour" index.html src public
grep -rniE "now enrolling|5 children|spots|school program|organizations we serve" index.html src public
grep -rniE "from bafut|high school diploma|secondary school at" index.html src public
grep -rn "data-confirm" index.html
```

| Termo | Resultado esperado |
|---|---|
| `gesell`, `gdo`, `assess` | **Zero.** Com a Opção A, conferir que o novo "A" não usa "assess" |
| `workplace`, `leader` | **Zero**, inclusive em `src/ui.js:285` ("leadership tips") |
| `periods`, `nutrition`, `new community` | **Zero** |
| telefone dela | **Zero**, também em `ui.js` e no JSON-LD |
| `tel:` | **Só** `tel:988` e `tel:911`. `type="tel"` do campo do visitante pode ficar, conforme BE-02 |
| `0–5` | **Zero**, e "Ages 2–5" presente |
| `at work`, `organization` | Só os trechos decididos na pergunta 7 |
| `evaluation` | Só `:274`, `:310`, `:463`, ou o que restar deles (AS-07) |
| `data-confirm` | Só `clinical-operations`, até a resposta dela |

### 9.2 Conteúdo clínico e credenciais

- [ ] Título de Care em 3 linhas, com as palavras exatas.
- [ ] A FAQ responde "Yes" a medicação, e coaching e medication management estão separados.
- [ ] "Telehealth" no lugar de "video visits" na parte clínica; "video sessions" no coaching.
- [ ] Credencial em Courses com as palavras ditadas.
- [ ] Cargos atuais confirmados por ela (DI-02).
- [ ] Sem lista de remédios, sem promessa de resultado, sem diagnóstico.
- [ ] 988 e 911 visíveis no rodapé e na FAQ. "No medical details" visível no formulário.
- [ ] Nada do CV além do que já está lá: sem endereço, sem número de licença.

### 9.3 Texto e dados

- [ ] Coaching: 1 sessão por semana, 6 semanas, asterisco, "extended family member", plano único.
- [ ] Timeline: Cameroon, 2003, Benson, KETV, 2027.
- [ ] Organizações: só Nelson Mandela, no passado.
- [ ] EP: "at capacity", waitlist, nenhum número de vagas.
- [ ] Rascunhos aprovados por ela no Canva.

### 9.4 Interação

- [ ] Todos os botões do menu chegam ao lugar certo, em desktop e mobile. "Who we help" e "Seasons" funcionam.
- [ ] Links externos (KETV, Substack, EP, redes) abrem em nova aba.
- [ ] C.A.R.E.: letras visíveis abaixo do menu; só um passo por vez; voltar de link do rodapé não sobrepõe texto.
- [ ] Planta 3D: scroll + 5 caixas; recua ao desmarcar; SVG com WebGL desligado e com reduced motion; "Pause" congela o vento.
- [ ] Gangorra: livros não atravessam; equilíbrio dispara folhas; teclado ok; 360 px limpo.
- [ ] Loader: M e D atrasam e sentam; clique pula; segunda visita curta; reduced motion estático; termina antes dos 6 s.
- [ ] Continua **sem mudança** o que ela aprovou: respiração do loader, folhas caindo, planta do hero, clique na folha ("steady and rooted"), estações, tiles, balanço, checklist e demais FAQs.

### 9.5 Imagens

- [ ] Nenhuma imagem gerada por IA.
- [ ] Diversidade visível no conjunto; não só crianças negras.
- [ ] Autorização registrada para foto de criança. Amiga avisada ou foto trocada.
- [ ] Licenças guardadas. `alt` atualizado. Proporção certa em 360, 390 e 1440 px.

### 9.6 Publicação

- [ ] `npm run build` sem erro; grep da seção 9.1 também em `dist/`.
- [ ] Testado em Chrome e Safari desktop e em iPhone e Android reais; o Mac dela usa Chrome.
- [ ] Domínio no Vercel com HTTPS; `www` e raiz certos; `canonical` e OG corretos.
- [ ] **E-mail `Grow@familycoachmd.com` envia e recebe depois da troca de DNS.**
- [ ] Redirects antigos funcionam; `/childcare-center-consultant/yale-assessment-td27b` não leva a âncora morta.
- [ ] Antes da expiração do Squarespace. Antes de 21/11.
- [ ] Link ao vivo enviado para ela; Canva atualizado.

---

## Apêndice: conferência da transcrição (partes 3 a 7) contra este documento

Relida em 06/11/2026, na ordem da fala. "Sem item" significa que não há pedido sobre o FamilyCoachMD.

| Fala | Assunto | Item |
|---|---|---|
| parte-03 T=1949–2224 | Adorou respiração, folhas, plantas, cliques | Mantidos: 9.4; seção 3.1 não mexe no hero |
| parte-04 T=0054 | Site antigo expira em novembro | OP-01 |
| parte-04 T=0237–0313 | Elogios; pergunta sobre rosto | HE-01 |
| parte-04 T=0412 | Lançar logo, sem esperar perfeição | OP-02 |
| parte-04 T=0438–0601 | Prescreve; medication management separado | CA-02, FQ-01 |
| parte-04 T=0611–0741 | Omaha Integrative Care; guarda-chuva | CA-06, HE-02 |
| parte-04 T=0758–0809 | Duas alas | ES-01, EP-01 |
| parte-04 T=0828–0955 | C, C, C; Physician-led em linhas | NV-01, CA-01 |
| parte-04 T=1024 | "Flat-out wrong"; telehealth | OP-03, CA-04 |
| parte-04 T=1321–1350 | Canva como origem | OP-05 |
| parte-04 T=1350 | Crianças e adolescentes; coaching de famílias | CA-01, CA-03 |
| parte-04 T=1655–1715 | Planta real, 3D | CO-07, 3.1 |
| parte-04 T=1715–1830 | Duas sessões; nutrição; Gesell | CO-01, CO-04, CO-05 |
| parte-05 T=0005 | Sem corporativo nem séries de eventos | GL-02, seção 8 |
| parte-05 T=0052 | Citar a origem | OP-03 |
| parte-05 T=0451–0721 | Trademark, programas | Seção 8 |
| parte-05 T=0746–0825 | Currículo; dedos doloridos | Seção 8; NV-04, SC-06 |
| parte-05 T=0917 | Why Do Kids Skip School, escolas | SC-03, SC-07 |
| parte-05 T=1003 | Carta de demissão | DI-02 |
| parte-05 T=1057–1336 | Planta, tempo, vídeo, família, plano | CO-07, CO-01 a CO-04 |
| parte-05 T=1349 | Canva a dois | OP-03 |
| parte-05 T=1502 | Gesell; frase do coaching | CO-05, CO-06 |
| parte-05 T=1625, T=2214 | Livro e flashcards | Seção 8 |
| parte-05 T=1948 | Credencial | CU-01 |
| parte-05 T=2103 | Periods e temas amplos | CU-02 |
| parte-05 T=2134 | Workplace | GL-02 |
| parte-06 T=0028 | Orgulho do acrônimo | AS-05 |
| parte-06 T=0045 | Glitch no C.A.R.E. | SC-05 |
| parte-06 T=0046–0344 | Assess e creches | Seção 2.8, SC-03 |
| parte-06 T=0158–0327 | Foto, diversidade, sem IA | Seção 4 |
| parte-06 T=0344 | Educate com adulto | SC-04, IM-09 |
| parte-06 T=0435–0532 | Organizações, workplace | SC-01, GL-02 |
| parte-06 T=0558–0717 | EP lotado | EP-02 |
| parte-06 T=0752–0823 | Nova descrição do EP | EP-01 |
| parte-06 T=1026–1051 | Logo, M e D | LG-01, LG-02, 3.3 |
| parte-06 T=1124–1410 | Timeline | TL-01 a TL-04, TL-08 |
| parte-06 T=1505–1552 | KETV | TL-05, TR-01 |
| parte-06 T=1623 | Card 2027 | TL-06 |
| parte-06 T=1653–1708 | Amiga | TL-07 |
| parte-06 T=1708–2103 | Substack; handles | LE-01, FO-02 |
| parte-07 T=0119–0140 | Substack; redes no rodapé | LE-01, FO-02 |
| parte-07 T=0215 | Domínio e e-mail | OP-01 |
| parte-07 T=0542 | Foto verde | Seção 4 |
| parte-07 T=0742–0906 | FAQ: Substack, medicação, recém-nascidos, assessment | LE-01, FQ-01, FQ-07, AS-04 |
| parte-07 T=0906–1037 | Telefone | GL-01 |
| parte-07 T=1017 | "Find me on social media" | FO-02 |
| parte-07 T=1057–1120 | Logo | LG-01 |
| parte-07 T=1125 | Evento dia 21 | OP-02 |
| parte-07 T=1125–1504 | Navegação | AU-01, SE-04, NV-01, NV-03 |
| parte-07 T=1347 | 2–5 | SE-01 |
| parte-07 T=1438 | Fotos de banco | AU-02 |
| parte-07 T=1526–1616 | Celular; "legit" | Mobile essencial, seção 5 |
| parte-07 T=2000–2128 | Rosto, posts, golfe | Fora daqui (EP e redes); BA-01 |
| parte-08 T=0049 | Foto com os filhos | IM-01 |
| parte-10 | Usa a prévia nas apresentações | OP-04 |

**Resultado da conferência:** nenhum pedido das partes 3 a 7 ficou de fora. Trechos inaudíveis que afetam texto estão marcados como dúvida: CO-01, TL-06, NV-03.
