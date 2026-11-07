# Auditoria de design, experiência e migração de conteúdo — FamilyCoachMD

Data: 03/11/2026. Site analisado: [versão local](http://localhost:5174/). Referência: [site antigo](https://www.familycoachmd.com/).

## 1. Parecer geral

O novo site tem uma direção visual mais coerente: verdes, creme e tons terrosos combinam com a proposta de acolhimento; a combinação de serifada editorial com texto sem serifa funciona; os botões principais têm boa presença; e a metáfora das estações conecta os serviços à vida familiar. A estrutura de títulos, os rótulos dos campos, o FAQ nativo e os avisos que distinguem coaching de atendimento clínico são boas bases.

O principal problema não é a identidade visual. É a distância entre a apresentação e a experiência efetiva: fotos com proporções erradas, animações que podem sobrepor conteúdo, ações que prometem agendamento ou inscrição mas apenas preparam e-mails, materiais sem destino e informação relevante retirada na migração.

**O conteúdo do site antigo não está presente em totalidade.** O núcleo dos serviços foi preservado, mas preços, uma certificação, detalhes da consultoria escolar e da avaliação de desenvolvimento foram omitidos ou muito resumidos. O telefone mudou. Algumas remoções são sensatas, pois o antigo também contém páginas vazias, conteúdo provisório e links inadequados. A seção 4 distingue essas situações.

Recomendação: corrigir primeiro os problemas funcionais e as proporções das fotos; depois reduzir a extensão da página e antecipar a apresentação da médica. Não é necessário refazer toda a identidade.

## 2. Método, evidências e limites

- Inspeção visual no navegador em 1440 × 1000, 1024 × 768, 768 × 1024, 390 × 844 e 360 × 800; também foi usada a largura normal do painel, de 462 px.
- Leitura do HTML, CSS, scripts, configuração de imagens, redirecionamentos, README e documento de preparação do projeto.
- Comparação das páginas públicas antigas e inventário do [sitemap antigo](https://www.familycoachmd.com/sitemap.xml): 21 URLs, incluindo páginas de conteúdo e seis índices de categorias/tags. As páginas de conteúdo foram lidas; os índices de categorias/tags foram inventariados, sem uma auditoria individual de cada filtro.
- Testes de navegação, rolagem, menu por teclado, checklist, slider, FAQ, modal da carta, validação vazia do formulário, seleção da lista de espera, pausa de animações e exercício de respiração.
- O build passou com npm run build. A aba dedicada apenas ao site local não apresentou avisos ou erros de console na consulta realizada.
- Não foram enviados formulários válidos, e-mails ou inscrições. O funcionamento por mailto foi confirmado nos arquivos e no README. Não houve alteração no código-fonte do site; este relatório é a entrega da análise. O build regenerou a pasta dist.

**Classificação das evidências:** “reproduzido” é comportamento observado no navegador; “confirmado no código” é uma condição verificável nos arquivos; “recomendação de design” é julgamento de composição ou de experiência. As três categorias não têm o mesmo grau de certeza sobre impacto em usuários reais.

**Limites:** testes por largura não substituem aparelhos reais, gestos de toque, Safari/iOS ou uma avaliação com leitores de tela. Reduced motion foi revisado no código, sem alterar a preferência do sistema. Não foram medidos Lighthouse, Core Web Vitals, desempenho em 4G, recebimento de e-mails ou comportamento dos redirects em uma implantação publicada. Não há base para atribuir uma nota de acessibilidade ou uma taxa de conversão.

Prioridades: **P1** = corrigir antes da publicação; **P2** = melhoria importante; **P3** = refinamento. Não foi identificado um problema P0 nesta análise.

## 3. Achados e possíveis soluções

### F01 — P1 · Retrato e fotos da linha do tempo mantêm alturas excessivas

**Evidência: reproduzido e confirmado no código.** Em 360 px, o retrato foi renderizado com aproximadamente 313 × 933 px. Em 390 px, ficou em 343 × 933 px; as duas fotos da linha do tempo ficaram em 250 × 933 e 250 × 721 px. As larguras diminuem, mas as alturas permanecem iguais aos atributos gerados pelo Vite. Isso produz recortes exagerados e aumenta muito a seção da fundadora.

**Onde:** [main.css:437](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/styles/main.css:437), [main.css:461](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/styles/main.css:461) e [vite.config.js](C:/Users/Ithalo/Desktop/escola/familycoachmd/vite.config.js). As regras definem largura e aspect-ratio, mas não corrigem a altura definida no HTML.

**Solução:** preservar os atributos de dimensão para reserva de espaço, mas definir altura responsiva nas duas regras. Uma opção mais previsível é aplicar a proporção à moldura e usar a imagem com largura e altura de 100% e object-fit: cover. Ajustar object-position para preservar o rosto.

**Aceite:** a moldura do retrato deve respeitar 3:4 e a da linha do tempo, 4:5, em todas as larguras. Em 390 px, o retrato de 343 px deveria ocupar aproximadamente 457 px de altura, em vez de 933 px.

### F02 — P1 · Textos do C.A.R.E. ficam sobrepostos após navegação rápida

**Evidência: reproduzido.** No desktop, depois de percorrer a página e voltar à consultoria pelo link Schools & centers do rodapé, os títulos e parágrafos das etapas apareceram uns sobre os outros. Após a rolagem terminar, Collaborate, Assess e Re-imagine ainda estavam com opacity: 1 e visibility: visible. Como as etapas ocupam a mesma posição absoluta, o texto se torna ilegível.

**Onde:** [sections.js:271](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/sections.js:271), especialmente a função show; [main.css:377](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/styles/main.css:377).

**Solução:** controlar a visibilidade de todas as etapas a cada mudança. Cancelar tweens pendentes antes de iniciar outra transição e garantir que apenas a etapa atual termine visível. Tratar saltos por âncora e saída da região fixa, além da rolagem lenta normal. Uma lista estática com navegação por etapas também eliminaria essa fragilidade.

**Aceite:** testar ida e volta entre início, contato e consultoria, inclusive com rolagem rápida. Ao estabilizar, apenas uma etapa pode ter visibilidade ativa; nenhuma combinação de títulos deve se sobrepor.

### F03 — P1 · O agendamento não agenda nem envia uma solicitação pelo site

**Evidência: confirmado no código e no README.** O formulário abre um mailto preenchido. Não existe seleção de horário, confirmação de reserva ou envio por servidor. Isso exige um aplicativo de e-mail configurado e uma segunda ação do visitante. A promessa de agendar uma chamada fica maior que a capacidade atual do fluxo.

**Onde:** [ui.js:164](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/ui.js:164), [index.html:618](C:/Users/Ithalo/Desktop/escola/familycoachmd/index.html:618) e [README.md](C:/Users/Ithalo/Desktop/escola/familycoachmd/README.md).

**Solução:** integrar o mecanismo de agendamento aprovado pela responsável ou um endpoint de solicitação com confirmação de recebimento e orientação sobre o próximo passo. Se o e-mail for mantido temporariamente, explicar antes do clique que ele abrirá o aplicativo e trocar o texto do botão para refletir isso. O antigo possui um link de Calendly, mas sua disponibilidade atual e a duração do evento precisam ser conferidas antes de reaproveitá-lo.

**Aceite:** uma pessoa sem aplicativo de e-mail configurado consegue concluir a ação e entender se solicitou contato ou reservou um horário. Não mostrar confirmação de reserva quando houve apenas preparação de mensagem.

### F04 — P1 · A newsletter também não efetiva a inscrição

**Evidência: confirmado no código.** Sign up apenas abre outro mailto. Não há cadastro em lista, retorno do provedor ou confirmação de inscrição. O mesmo problema compromete a utilidade da lista de espera anunciada no site.

**Onde:** [ui.js:190](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/ui.js:190) e [index.html:661](C:/Users/Ithalo/Desktop/escola/familycoachmd/index.html:661).

**Solução:** conectar o formulário ao serviço de newsletter escolhido, com estado de envio, sucesso, falha e tratamento de duplicidade. Enquanto isso, apresentar a ação como solicitação por e-mail e não como inscrição concluída.

**Aceite:** a confirmação exibida corresponde ao registro real no sistema de destino. Validar recebimento em ambiente de teste, sem usar visitantes reais como teste.

### F05 — P1 · A lista de espera seleciona o serviço errado

**Evidência: reproduzido.** O link Join the waitlist da seção de cursos marca Parenting course for a group no formulário, em vez de Self-paced courses. O cartão da Learning Corner usa o motivo correto. Outros botões de serviços chegam ao mesmo formulário sem selecionar o contexto de origem.

**Onde:** [index.html:397](C:/Users/Ithalo/Desktop/escola/familycoachmd/index.html:397), [index.html:576](C:/Users/Ithalo/Desktop/escola/familycoachmd/index.html:576) e [ui.js:106](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/ui.js:106).

**Solução:** corrigir o data-reason do primeiro link para o valor já existente de Self-paced courses waitlist. Aplicar motivos consistentes aos CTAs de psiquiatria, coaching, escolas e comunidade de fé. Idealmente usar identificadores de serviço estáveis, separados dos rótulos visuais.

**Aceite:** cada botão mantém seu contexto até o formulário; os dois links de lista de espera selecionam a mesma opção correta.

### F06 — P1 · Cartões da KETV prometem leitura ou vídeo, mas não abrem nada

**Evidência: confirmado no HTML e na navegação.** Os dois materiais jornalísticos são elementos div com aparência de cartão editorial. Não têm link, vídeo ou modal. A chamada Read, watch, grow cria uma expectativa de conteúdo acessível que esses cartões não entregam.

**Onde:** [index.html:557](C:/Users/Ithalo/Desktop/escola/familycoachmd/index.html:557) e [main.css:485](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/styles/main.css:485).

**Solução:** obter os links das matérias, transformar os cartões em links identificados como Watch ou Read e verificar os destinos. Se os materiais não estiverem disponíveis, apresentá-los em uma faixa de imprensa, com visual diferente dos conteúdos clicáveis. O livro em preparação também deve ser visualmente identificado como indisponível.

**Aceite:** todo cartão que pareça acionável tem uma ação útil; materiais indisponíveis mostram seu estado sem sugerir clique.

### F07 — P1 · O foco escapa do menu móvel aberto

**Evidência: reproduzido por teclado.** Depois de percorrer os links do menu e os contatos, o Tab chegou ao botão de chamada do hero, atrás da camada do menu. O fundo continua no percurso de foco. O código só interrompe o Lenis; não implementa contenção de foco ou bloqueio completo do fundo.

**Onde:** [ui.js:64](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/ui.js:64), [index.html:88](C:/Users/Ithalo/Desktop/escola/familycoachmd/index.html:88) e [main.css:170](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/styles/main.css:170).

**Solução:** implementar o menu como camada modal acessível, com foco inicial, contenção do Tab, fundo inert e retorno ao acionador ao fechar. Preservar a possibilidade de rolar o próprio menu em telas baixas e bloquear a rolagem do conteúdo de fundo também quando não houver Lenis.

**Aceite:** com o menu aberto, Tab e Shift+Tab permanecem nos controles visíveis; Escape fecha e devolve o foco; o conteúdo de fundo não recebe interação.

### F08 — P1 · Pause moving content pausa apenas parte do movimento

**Evidência: reproduzido e confirmado no código.** Ao pausar, as faixas de credenciais receberam animation-play-state: paused, mas o ponto do cursor, os sóis, o brilho da seção de fé e a indicação de rolagem continuaram com estado running. O loop Three.js também não consulta motionState.paused.

**Onde:** [ui.js:19](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/ui.js:19), [main.css:469](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/styles/main.css:469) e [leaves3d.js:296](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/leaves3d.js:296).

**Solução:** centralizar a preferência de pausa e aplicá-la a todas as animações autônomas, em CSS e JavaScript. Preservar interações iniciadas deliberadamente pelo usuário, como o exercício de respiração, com controle próprio se necessário.

**Aceite:** o controle interrompe todo movimento automático visível e o estado é anunciado de forma consistente. Retomar não deve provocar salto brusco do relógio da cena 3D.

### F09 — P2 · Reduced motion ainda permite troca automática de anúncios

**Evidência: confirmado no código; não testado com a preferência do sistema.** A barra trata reduce removendo a transição, mas o setInterval continua alternando os anúncios. Portanto, a preferência reduz o efeito sem tornar o conteúdo estável. O modal da carta também anima independentemente dessa preferência.

**Onde:** [ui.js:29](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/ui.js:29), [ui.js:37](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/ui.js:37) e [sections.js:376](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/sections.js:376).

**Solução:** não iniciar a rotação automática em reduce; manter os controles manuais. Aplicar o mesmo estado à abertura do modal e à rolagem suave programática. Considerar mudanças da preferência enquanto a página já está aberta.

**Aceite:** em reduced motion, o anúncio inicial permanece estático até uma ação explícita e o modal abre sem deslocamento animado.

### F10 — P2 · Links exigem dois toques para navegar

**Evidência: confirmado no código; requer validação em aparelho de toque.** Em dispositivos sem hover, o primeiro toque nos cartões de público e na janela Entrepreneurs at Play é cancelado para revelar uma foto; apenas o segundo navega. Não há instrução suficientemente clara de que o primeiro toque é uma prévia.

**Onde:** [sections.js:100](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/sections.js:100) e [main.css:233](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/styles/main.css:233).

**Solução:** mostrar o serviço e a chamada permanentemente no celular, permitindo navegação no primeiro toque. Se a prévia for necessária, oferecer um botão separado de expansão. O destino deve ser legível sem hover.

**Aceite:** um toque em um link visível navega; a animação decorativa não consome a primeira tentativa de acesso.

### F11 — P2 · Conteúdo importante fica escondido em faixas horizontais

**Evidência: reproduzido visualmente e confirmado no CSS.** No celular, públicos, história e Learning Corner têm rolagem horizontal sem barra visível. Os controles da Learning Corner são ocultados abaixo de 768 px; a história tem indicação de arrastar, mas não botões. Isso reduz a descoberta dos últimos itens, inclusive escola e comunidade de fé.

**Onde:** [main.css:447](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/styles/main.css:447), [main.css:482](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/styles/main.css:482), [main.css:604](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/styles/main.css:604) e [main.css:617](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/styles/main.css:617).

**Solução:** priorizar uma lista ou grade compacta para os serviços; manter controles de anterior/próximo e uma indicação de posição nas faixas editoriais. Garantir operação por teclado e uma região identificada. Para a história, uma cronologia resumida com opção de expandir é mais fácil de percorrer.

**Aceite:** todos os serviços são descobertos sem depender de uma tentativa espontânea de arrastar; os últimos cartões são alcançáveis por toque e teclado.

### F12 — P2 · O foco tem pouco contraste em fundos escuros; controles da barra são pequenos

**Evidência: confirmado nas cores e dimensões.** O foco global usa o verde #344734, também próximo dos fundos escuros. O contraste calculado contra #1E2A1F é aproximadamente 1,49:1; contra #584443, 1,11:1. Alguns campos têm exceções em âmbar, mas não todos os links e botões. Os controles da barra têm apenas 28 × 28 px.

**Onde:** [main.css:60](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/styles/main.css:60) e [main.css:144](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/styles/main.css:144).

**Solução:** criar uma cor de foco por superfície, usando creme ou âmbar nos fundos escuros e verde nos claros. Aumentar as áreas clicáveis dos controles, com alvo confortável de aproximadamente 44 px, mesmo se o desenho interno continuar pequeno.

**Aceite:** o foco é facilmente distinguível em todas as superfícies e pausar a barra é confortável em uma tela pequena. Os números acima são cálculos das cores, não uma certificação de conformidade.

### F13 — P2 · A navegação perde orientação durante percursos longos

**Evidência: confirmado no código e na composição.** O cabeçalho desaparece ao descer; FAQ, contato e fé não têm atalhos no menu principal. As âncoras fazem rolagem sem mover o foco e usam replaceState, substituindo o estado atual em vez de criar um histórico entre seções. Na experiência fixa das estações, os indicadores de progresso são decorativos, sem navegação direta.

**Onde:** [ui.js:49](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/ui.js:49), [ui.js:91](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/ui.js:91), [index.html:71](C:/Users/Ithalo/Desktop/escola/familycoachmd/index.html:71) e [sections.js:127](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/sections.js:127).

**Solução:** manter acesso previsível a contato e serviços; exibir o cabeçalho quando ele contiver foco; levar o foco ao título de destino após uma navegação deliberada. Tornar os controles das estações acionáveis e oferecer uma forma clara de continuar. Decidir explicitamente se o botão Voltar deve recuperar a seção anterior.

**Aceite:** usuários de teclado sabem onde chegaram, conseguem sair das seções fixas e acessar contato sem percorrer o documento inteiro. O link direto #begin funcionou no teste; não foi considerado quebrado.

### F14 — P2 · O manifesto fica pouco legível enquanto aguarda a rolagem

**Evidência: confirmado no código.** As palavras do manifesto começam com opacidade 0,22 e ganham contraste conforme a rolagem. Uma mensagem institucional importante passa a depender da posição de leitura e do efeito visual.

**Onde:** [main.css:226](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/styles/main.css:226) e [sections.js:79](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/sections.js:79).

**Solução:** deixar o texto legível desde o início e animar apenas um destaque secundário, sublinhado ou mudança suave de cor. Não usar contraste insuficiente como estado inicial de parágrafos essenciais.

**Aceite:** é possível parar de rolar e ler o parágrafo inteiro em qualquer ponto da sua entrada na tela.

### F15 — P2 · A página tem extensão excessiva e apresenta a médica tarde demais

**Evidência: medição e recomendação de design.** Em uma leitura desktop, o documento tinha aproximadamente 25,5 mil px de altura; em 360 px, cerca de 27,7 mil px. A apresentação principal da fundadora só aparecia por volta de 19 mil px no desktop. Parte dessa extensão é agravada pelo F01; outra parte vem de grandes espaçamentos, listas repetidas e seções fixas que consomem rolagem. As estações sozinhas acrescentam cerca de 2,8 mil px de percurso fixo na configuração de 1440 px.

**Onde:** [index.html](C:/Users/Ithalo/Desktop/escola/familycoachmd/index.html), [main.css:66](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/styles/main.css:66), [sections.js:171](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/sections.js:171) e [sections.js:292](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/sections.js:292).

**Solução:** corrigir as fotos antes de ajustar o espaçamento geral. Inserir perto do início um retrato compacto, nome completo, especialidade e local de atuação. Resumir a cronologia e os agrupamentos repetidos; oferecer detalhes em expansões ou páginas específicas. A experiência das estações pode ser opcional ou mais curta.

**Aceite:** o visitante identifica quem atende, quais serviços existem e como começar nas primeiras telas. Validar a nova extensão com uma tarefa real de descoberta, sem impor uma meta arbitrária de pixels.

### F16 — P3 · O tom de algumas chamadas enfraquece a apresentação profissional

**Evidência: recomendação editorial.** A anotação yes, a real doctor chama atenção para uma possível dúvida de legitimidade. Títulos poéticos como Good questions e Where we put it all into practice precisam de rótulos secundários para explicar a função da seção. A assinatura afetiva funciona melhor quando acompanhada de informação profissional explícita.

**Onde:** [index.html:82](C:/Users/Ithalo/Desktop/escola/familycoachmd/index.html:82), [index.html:449](C:/Users/Ithalo/Desktop/escola/familycoachmd/index.html:449) e [index.html:600](C:/Users/Ithalo/Desktop/escola/familycoachmd/index.html:600).

**Solução:** substituir a anotação por identificação factual, como Led by Dr. Larisa Che, MD. Manter calor humano no texto, mas dar nomes claros aos blocos: perguntas frequentes, escola/programa e modalidades de atendimento.

**Aceite:** o conteúdo continua acolhedor e um visitante novo entende a função de cada seção sem precisar interpretar uma metáfora.

### F17 — P1 · A oferta clínica precisa de informação operacional confirmada

**Evidência: lacuna de conteúdo; não é avaliação da prática médica.** A nova seção de psiquiatria apresenta um percurso de cuidado, mas não esclarece disponibilidade para novos pacientes, faixas etárias exatas, presencial versus teleatendimento, condições de pagamento/seguro ou como funciona a avaliação e o acompanhamento. A resposta sobre medicação esclarece coaching, mas deixa a oferta clínica pouco definida.

**Onde:** [index.html:268](C:/Users/Ithalo/Desktop/escola/familycoachmd/index.html:268), [index.html:605](C:/Users/Ithalo/Desktop/escola/familycoachmd/index.html:605) e as pendências da seção 11 de [preparacao-familycoachmd.md](C:/Users/Ithalo/Desktop/escola/familycoachmd/preparacao-familycoachmd.md).

**Solução:** obter da responsável os dados operacionais e publicar um resumo verificável. Distinguir o que é serviço atualmente oferecido pela FamilyCoachMD do que é experiência profissional anterior. Não completar essas lacunas por inferência a partir do currículo.

**Aceite:** uma família consegue entender se o serviço é adequado à sua busca e qual é o próximo passo, sem interpretar uma credencial como garantia de disponibilidade.

### F18 — P1 · A migração de conteúdo tem omissões relevantes

**Evidência: comparação direta com as páginas antigas.** Foram retirados os preços publicados do curso, uma certificação profissional e vários detalhes de consultoria e desenvolvimento infantil. Outras alterações, como telefone e escopo para empresas, precisam ser decididas de forma explícita. A matriz da seção 4 detalha cada diferença.

**Onde:** principalmente [index.html:337](C:/Users/Ithalo/Desktop/escola/familycoachmd/index.html:337), [index.html:388](C:/Users/Ithalo/Desktop/escola/familycoachmd/index.html:388), [index.html:404](C:/Users/Ithalo/Desktop/escola/familycoachmd/index.html:404) e [index.html:530](C:/Users/Ithalo/Desktop/escola/familycoachmd/index.html:530).

**Solução:** usar a matriz como checklist editorial. Para cada item, decidir entre restaurar, atualizar ou retirar deliberadamente, com validação da responsável quando envolver preços, certificações ou afirmações técnicas. O documento de preparação já lista diversas dessas dúvidas; ele registra intenção, não comprovação de que foram resolvidas.

**Aceite:** nenhuma diferença relevante permanece sem decisão registrada. Preservar significado e utilidade não exige reproduzir cada frase antiga.

### F19 — P1 · Faltam destinos de migração para URLs antigas conhecidas

**Evidência: comparação do sitemap antigo com a configuração.** Há redirects para as páginas principais e um genérico para blog, mas faltam /home, /workshop e as quatro subpáginas de consultoria escolar. Não basta redirecionar somente a página-pai. O redirect genérico do artigo leva à Learning Corner sem preservar seu conteúdo ou contexto.

**Onde:** [vercel.json](C:/Users/Ithalo/Desktop/escola/familycoachmd/vercel.json) e [sitemap antigo](https://www.familycoachmd.com/sitemap.xml).

**Solução:** adicionar destinos para as quatro páginas específicas, preferencialmente detalhes equivalentes que possam ser abertos diretamente. Redirecionar /home para a página inicial. Para /workshop e o artigo provisório, decidir um destino editorial adequado ou retirada explícita. Registrar também o comportamento desejado para filtros do blog.

**Aceite:** testar cada URL antiga em uma implantação de teste e conferir status HTTP, destino final e conteúdo correspondente. O Vite local não executa as regras da Vercel; esta análise confirmou a lacuna de configuração, não o comportamento de produção.

### F20 — P2 · Prévia de compartilhamento e indexação estão incompletas

**Evidência: confirmado nos arquivos.** A imagem Open Graph é um SVG de logo em URL relativa. Não há canonical ou og:url; também não há sitemap.xml ou robots.txt próprios nos arquivos públicos inspecionados. O logo isolado não oferece uma composição pensada para a prévia social.

**Onde:** [index.html:9](C:/Users/Ithalo/Desktop/escola/familycoachmd/index.html:9) e [pasta public](C:/Users/Ithalo/Desktop/escola/familycoachmd/public).

**Solução:** criar uma imagem raster de compartilhamento de 1200 × 630 com marca, especialidade e texto curto; usar URL absoluta do domínio final. Definir canonical e og:url. Criar sitemap e política de rastreamento coerentes com as páginas efetivamente publicadas. Validar os dados estruturados com os dados aprovados de contato e atuação.

**Aceite:** a prévia exibe imagem e texto legíveis; as URLs públicas pretendidas são indexáveis e os metadados apontam para o domínio correto. Não foi testada uma prévia social remota nesta auditoria.

### F21 — P2 · O conteúdo depende demais do sucesso da inicialização e das fontes

**Evidência: confirmado no código; risco de robustez, sem falha simulada.** Um script inline adiciona a classe js antes de o módulo principal carregar. Com essa classe, elementos reveal ficam ocultos e o loader cobre a tela. Se o módulo falhar antes de inicializar, não há saída independente. As seções aguardam document.fonts.ready; já o loader pode prosseguir por um timeout. Isso também cria uma ordem de inicialização delicada com fontes lentas.

**Onde:** [index.html:20](C:/Users/Ithalo/Desktop/escola/familycoachmd/index.html:20), [main.css:568](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/styles/main.css:568), [main.js:34](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/main.js:34) e [loader.js:23](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/loader.js:23).

**Solução:** manter o conteúdo legível como estado de base; só ativar estados ocultos quando a animação estiver pronta. Garantir saída de emergência do loader e ordenar a inicialização do hero. O efeito de abertura pode ser mais curto e dispensável. Considerar hospedar as fontes localmente ou reduzir famílias/pesos após medição.

**Aceite:** com falha do módulo, fontes bloqueadas ou rede lenta, os serviços e contatos continuam acessíveis. O teto de 3,6 s do loader não deve ser tomado como tempo total garantido, pois a transição de saída também tem duração.

### F22 — P2 · A cena 3D não reconfigura seu modo ao cruzar o breakpoint

**Evidência: confirmado no código; cenário completo de orientação ainda precisa de teste em aparelho.** O valor compact, o host do canvas e a lista de slots são escolhidos apenas no carregamento. O restante do layout muda dinamicamente por media queries. Ao cruzar 1024 px, a estrutura visual pode mudar sem que a cena passe para o host e os slots apropriados.

**Onde:** [main.js:62](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/main.js:62) e [leaves3d.js:227](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/leaves3d.js:227).

**Solução:** recriar ou reconfigurar a cena ao mudar a media query, com limpeza do renderer e dos listeners anteriores. Outra opção é manter uma estrutura única de cena e alterar apenas os slots. Preservar o fallback SVG durante qualquer transição.

**Aceite:** testar 390 → 1440 → 390 sem reload, além de rotação em tablet; o desenho continua no lugar correto e não há duplicação de canvas. O fallback SVG foi verificado com o parâmetro de desenvolvimento no3d.

### F23 — P3 · Simplificar os efeitos e aproximar as imagens do serviço

**Evidência: recomendação de design.** O 3D tem aparência bastante facetada e forte presença na abertura; somado a partículas, cursor decorativo, grão, faixas e brilhos, pode competir com a informação. Algumas fotos de crianças e atividades comunicam mais o programa educacional do que coaching ou consultoria clínica. No celular, uma faixa grande do hero é dedicada ao símbolo abaixo do texto.

**Onde:** [leaves3d.js](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/leaves3d.js), [main.css:125](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/styles/main.css:125), [main.css:187](C:/Users/Ithalo/Desktop/escola/familycoachmd/src/styles/main.css:187) e [index.html:158](C:/Users/Ithalo/Desktop/escola/familycoachmd/index.html:158).

**Solução:** escolher um efeito protagonista e reduzir os demais. Testar o SVG estático, já funcional, como opção padrão em telas compactas. Priorizar retratos e imagens que expliquem coaching, aulas e formação de equipes, usando materiais aprovados. Mostrar a relação com Entrepreneurs at Play sem deixar a escola definir toda a percepção da marca principal.

**Aceite:** a primeira leitura destaca o serviço e a pessoa responsável. Comparar opções com usuários antes de investir em mais complexidade gráfica. Não há evidência nesta auditoria de que o 3D, por si só, cause lentidão perceptível.

### F24 — P2 · Falta explicar com clareza o tratamento do contato e o próximo passo

**Evidência: confirmado na interface.** Há campos de nome, e-mail e telefone, além de newsletter, mas não há link visível para uma política de privacidade ou explicação específica de como o contato é recebido. A orientação para não compartilhar informações médicas é útil, porém não explica a dependência do aplicativo de e-mail nem o prazo esperado de retorno.

**Onde:** [index.html:631](C:/Users/Ithalo/Desktop/escola/familycoachmd/index.html:631) e [index.html:659](C:/Users/Ithalo/Desktop/escola/familycoachmd/index.html:659).

**Solução:** publicar informação de privacidade adequada ao fluxo realmente adotado, explicar quem recebe a solicitação e o próximo passo, e indicar um prazo de retorno somente se a equipe puder cumpri-lo. Distinguir inscrição editorial de solicitação de atendimento. Esta recomendação é de transparência de experiência; não constitui parecer jurídico.

**Aceite:** antes de enviar, o visitante entende o destino do contato e o que acontecerá depois; pedidos de atendimento não são confundidos com inscrição na newsletter.

## 4. Comparação com o site antigo

### 4.1 Conteúdo preservado ou equivalente

| Informação antiga | Situação no novo | Observação |
|---|---|---|
| Propósito de apoiar famílias e prevenir dificuldades | Preservado no manifesto e na carta | O texto foi reescrito, mantendo a ideia central. [Origem: About](https://www.familycoachmd.com/about). |
| Coaching familiar individualizado | Preservado | Mantém duas sessões de uma hora por semana, seis semanas, telefone/Zoom e participação de familiares externos ao lar. [Origem](https://www.familycoachmd.com/private-family-coaching). |
| Perguntas sobre conexão, rotinas, resiliência e dificuldades familiares | Preservadas em checklist | Há feedback interativo após marcar opções. [Origem](https://www.familycoachmd.com/). |
| Curso de Positive Discipline e seus cinco princípios | Preservado em essência | Mantém formato de duas horas por encontro, três a seis semanas, presencial/online e atividades práticas. [Origem](https://www.familycoachmd.com/parenting-course). |
| Personalização para grupos e componente de fé | Preservados | As perguntas sobre grupos independentes e oferta por escolas continuam no FAQ. [Origem](https://www.familycoachmd.com/parenting-course). |
| Quatro temas dos cursos autoinstrucionais | Preservados | Tecnologia, férias/festas, menstruação para crianças pequenas e valores familiares. [Origem](https://www.familycoachmd.com/). |
| Estrutura C.A.R.E. para escolas | Preservada como resumo | O nome das quatro etapas permanece; os detalhes não foram integralmente migrados. [Origem](https://www.familycoachmd.com/childcare-center-consultant). |
| Comunidades cristãs, planos Jericho/Bethesda, Fruit of the Spirit e livro infantil | Preservados | A previsão antiga de lançamento foi substituída por coming soon. [Origem](https://www.familycoachmd.com/home). |
| New Community Omaha e Nelson Mandela Elementary | Preservados com links | O antigo descreve atendimento atual; o novo usa passado. Confirmar qual formulação corresponde à situação atual. [Origem](https://www.familycoachmd.com/). |
| E-mail de contato e convite para consulta inicial gratuita | Preservados | A forma de solicitar a consulta mudou. [Origem](https://www.familycoachmd.com/work-with-me). |
| Separação entre coaching/cursos e uso de medicação | Preservada e ampliada | O FAQ mantém a orientação de continuidade com os profissionais atuais. [Origem](https://www.familycoachmd.com/parenting-course). |

### 4.2 Ausências, alterações e decisões necessárias

| Item | O que foi encontrado | Como resolver |
|---|---|---|
| **Preços do curso** | O antigo informa US$ 270 por pessoa no formato padrão e US$ 300 no personalizado, para seis semanas. O novo só informa que as taxas serão discutidas na chamada. [Origem](https://www.familycoachmd.com/parenting-course). | Confirmar valores atuais e publicar preço, faixa ou critério claro. Não recolocar preços possivelmente vencidos sem revisão. |
| **Plano de nutrição, mindfulness e exercício** | É um benefício explicitamente descrito no coaching antigo e não aparece de modo equivalente no novo. [Origem](https://www.familycoachmd.com/private-family-coaching). | Confirmar se ainda integra o serviço; restaurar descrição precisa ou registrar a retirada. |
| **Nome e explicação do GDO-R** | O antigo detalha Gesell Developmental Observation-Revised; o novo menciona apenas uma avaliação Gesell e a faixa de idade. [Origem](https://www.familycoachmd.com/childcare-center-consultant/yale-assessment-td27b). | Acrescentar um bloco ou expansão explicando finalidade, instrumento realmente usado e processo. |
| **Domínios avaliados e participação de família/escola** | Foram omitidos os detalhes sobre observação e participação dos adultos, cognição, linguagem, desenvolvimento físico/neurológico, habilidades socioemocionais/adaptativas, letras/números e percepção visual/espacial. [Origem](https://www.familycoachmd.com/childcare-center-consultant/yale-assessment-td27b). | Recuperar um resumo útil e tecnicamente validado. |
| **Alegações Yale e NAEYC** | As alegações de origem/validação presentes no antigo foram removidas. [Origem](https://www.familycoachmd.com/childcare-center-consultant/yale-assessment-td27b). | Tratar como alteração a validar. Não republicar uma afirmação técnica apenas porque existia no site antigo. |
| **Amplitude da colaboração escolar** | O antigo explicita escuta de diferentes participantes da instituição, da direção às equipes de apoio. O novo usa uma frase genérica. [Origem](https://www.familycoachmd.com/childcare-center-consultant/collaborate). | Mostrar quem participa e como a colaboração ocorre. |
| **Intervenções em ambientes e práticas** | Sumiram os exemplos de organização dos materiais para incentivar cooperação, exploração dos espaços e encaminhamento para apoio/avaliação adicional. [Origem](https://www.familycoachmd.com/childcare-center-consultant/staffeducation-jgx5f-z7e5e). | Restaurar exemplos concretos dentro de Re-imagine. |
| **Formação de equipes e diretores** | A nova etapa Educate resume bastante a oferta. Faltam exemplos de interação adulto-criança, aprendizagem socioemocional, práticas pró-sociais, teorias do desenvolvimento e formação continuada. [Origem](https://www.familycoachmd.com/childcare-center-consultant/staffeducation-jgx5f). | Usar uma lista curta de entregas e uma página/expansão com o escopo completo. |
| **Certified Empowering People in the Workplace Facilitator** | A certificação aparece no About antigo e não está no novo. [Origem](https://www.familycoachmd.com/about). | Confirmar o título e sua validade; acrescentar às credenciais se apropriado. |
| **Duas certificações médicas explicitadas** | O antigo declara separadamente certificação em psiquiatria adulta e infantil/adolescente. O novo usa board-certified psychiatrist e descreve fellowship infantil. [Origem](https://www.familycoachmd.com/about). | Confirmar as credenciais exatas com a responsável. Fellowship e certificação não são informações intercambiáveis; o plano local já registra a dúvida. |
| **Atuação com empresas, coaching organizacional e liderança** | O About antigo inclui esses públicos/temas; o novo concentra seus caminhos em famílias, escolas e fé. A carta ainda fala genericamente em organizações. [Origem](https://www.familycoachmd.com/about). | Confirmar se esse segmento continua atendido; se sim, criar um caminho e explicar a oferta. |
| **Telefone** | Antigo: (501) 819-4769. Novo: (402) 452-0133. [Origem antiga](https://www.familycoachmd.com/contact). | Confirmar qual é o número público atual e alinhar menu, formulário, rodapé e JSON-LD. É uma divergência, não prova de que o novo esteja errado. |
| **Agendamento direto** | O antigo oferece link para Calendly; o novo usa formulário que prepara e-mail. [Origem](https://www.familycoachmd.com/work-with-me). | Resolver F03. O slug antigo contém 1hour apesar de a chamada mencionar 15 minutos; verificar duração real antes de reutilizar. |
| **Mensagem geral de contato** | O rodapé antigo permite assunto e mensagem; o novo direciona para solicitação de chamada. [Origem](https://www.familycoachmd.com/contact). | Oferecer contato geral claro para empresas, parceiros e outras dúvidas, com instrução para não incluir informações clínicas sensíveis. |
| **Finalidade da newsletter** | O antigo explica que enviará eventos, cursos, dicas de parentalidade/liderança e livros. O novo usa uma chamada mais vaga. [Origem](https://www.familycoachmd.com/). | Dizer o que a pessoa receberá e resolver o cadastro real do F04. |
| **Prazo do livro** | O antigo prometia lançamento em 2024; o novo remove a data, mas mantém coming soon. [Origem](https://www.familycoachmd.com/home). | Confirmar status atual e atualizar ou retirar a promessa. Restaurar a data antiga não seria uma boa migração. |
| **Summer Fun For kids** | O cartão/artigo não foi migrado. A página antiga contém essencialmente avisos de conteúdo futuro, sem artigo desenvolvido. [Origem](https://www.familycoachmd.com/blog/ginger-soda-4lgk2). | Pode ser retirado deliberadamente; decidir seu destino e não classificar a ausência como perda de um artigo completo. |

### 4.3 Itens que não precisam ser copiados automaticamente

- Os ícones sociais antigos apontam para perfis do Squarespace, não para perfis próprios da marca. A remoção evita direcionamento incorreto. Adicionar apenas os perfis reais confirmados. [Referência](https://www.familycoachmd.com/).
- Login usa um link sem destino específico e há acesso a carrinho. Não foi estabelecida uma necessidade atual de área de membros ou comércio. Não recriar esses controles apenas para igualar o antigo. [Referência](https://www.familycoachmd.com/).
- A página [workshop](https://www.familycoachmd.com/workshop) não mostrou conteúdo principal na inspeção. Falta uma decisão de URL, mas não foi identificada informação substantiva a migrar.
- As páginas de cursos autoinstrucionais e livro ainda são promessas. O novo pode organizá-las melhor sem perpetuar um estado indefinido de lançamento.

### 4.4 Conteúdos novos que exigem validação própria

Entrepreneurs at Play, data de abertura, capacidade, faixas etárias, linha do tempo biográfica, cargos, licenças e informações profissionais ampliadas não se tornam fatos confirmados por aparecerem na implementação. Parte vem dos materiais locais. Revisar com a responsável, especialmente a oferta clínica e as credenciais marcadas como pendentes no [documento de preparação](C:/Users/Ithalo/Desktop/escola/familycoachmd/preparacao-familycoachmd.md).

## 5. Ordem sugerida de correção

1. Corrigir proporções das fotos e transições C.A.R.E. — F01 e F02.
2. Definir o fluxo real de contato/agendamento, newsletter e lista de espera — F03 a F05.
3. Resolver cartões sem destino, foco do menu e pausa global — F06 a F08.
4. Validar oferta, preços, telefone, certificações e escopo; concluir decisões da matriz — F17 e F18.
5. Completar o mapa de URLs antigas antes de trocar o domínio — F19.
6. Reordenar conteúdo, reduzir dependência de arrastar/rolar e ajustar foco, movimento e robustez — F09 a F16, F21 e F22.
7. Finalizar compartilhamento, transparência de contato e refinamentos gráficos — F20, F23 e F24.

Uma sequência de conteúdo mais direta seria: abertura com nome/especialidade/local e chamada principal → resumo dos serviços → apresentação curta da médica e credenciais → detalhes dos serviços → perguntas frequentes → contato. História longa, exercício de respiração e programa educacional podem permanecer como conteúdo complementar, com acesso claro.

## 6. Verificações e critérios para a próxima revisão

### O que funcionou nesta inspeção

- Build de produção concluído sem erro.
- CTA principal visível nas larguras pequenas testadas; não foi observado transbordamento horizontal do documento nessas leituras. As faixas de cartões têm overflow próprio intencional.
- Checklist atualiza o desenho e a mensagem após duas escolhas.
- Slider responde ao teclado e mantém texto descritivo.
- FAQ abre as respostas; carta abre como dialog e fecha pelo controle próprio.
- Exercício de respiração iniciou com contagem e chegou à mensagem final.
- Link direto para #begin chegou à seção no teste de recarregamento.
- Fallback SVG permaneceu visível no teste com no3d.
- Imagens com carregamento adiado não foram classificadas como quebradas apenas por ainda não terem sido solicitadas fora da tela.

### Evidência de tamanho do build

| Artefato | Tamanho bruto | Gzip informado pelo Vite |
|---|---:|---:|
| HTML | 77,81 kB | 25,05 kB |
| CSS | 44,36 kB | 10,77 kB |
| JavaScript principal | 186,47 kB | 71,08 kB |
| Chunk lazy de folhas/Three.js | 514,14 kB | 132,48 kB |

Esses números descrevem os arquivos gerados, não o tempo de carregamento. A separação do Three.js em chunk lazy é positiva; sua transferência ainda é solicitada automaticamente após a abertura em dispositivos compatíveis. Medir em rede e hardware representativos antes de atribuir um problema de desempenho ao efeito.

### Roteiro de aceite após as correções

- Repetir 360, 390, 768, 1024 e 1440 px, incluindo navegação completa por teclado.
- Verificar fotos, C.A.R.E. e âncoras tanto na rolagem contínua quanto em saltos entre contato e serviços.
- Testar aparelho real com toque, rotação, reduced motion e mudança de largura sem reload.
- Validar sucesso e falha de agendamento/newsletter em ambiente de teste, inclusive sem aplicativo de e-mail.
- Validar todas as URLs legadas na implantação, a página 404 e as prévias de compartilhamento.
- Conferir a matriz de conteúdo com a responsável e registrar os itens retirados deliberadamente.

Os arquivos do projeto permitem corrigir os problemas de apresentação sem descartar a direção visual atual. A prioridade é tornar o conteúdo legível, a navegação previsível e cada chamada compatível com o que realmente acontece depois do clique.
