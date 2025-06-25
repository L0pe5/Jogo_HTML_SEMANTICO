document.addEventListener('DOMContentLoaded', () => {
  const unlockedLevels = JSON.parse(localStorage.getItem("unlockedLevels")) || ["easy"];
  
  const levelSelector = document.getElementById('level-selector');
  const gameArea = document.getElementById('game-area');
  const pageLayout = document.getElementById('page-layout');
  const tagBank = document.getElementById('tag-bank');
  const messageEl = document.getElementById('message');
  const scoreEl = document.getElementById('score');
  const currentLevelEl = document.getElementById('current-level');
  const challengeTitle = document.getElementById('challenge-title');
  const challengeDescription = document.getElementById('challenge-description');
  const buttonContainer = document.getElementById('button-container');

  let score = 0;
  let currentLevel = null;
  let completedZones = 0;
  let mistakes = 0;
  let currentChallengeIndex = 0;
  let currentLevelChallenges = [];

    const levels = {
        easy: [
          {
            title: "Blog Simples",
            description: "Construa a estrutura básica de um blog usando HTML semântico.",
            tags: ["header", "nav", "main", "footer"],
            layout: [
              { zone: "Cabeçalho", expected: "header", hint: "Área superior com título" },
              { zone: "Menu", expected: "nav", hint: "Links de navegação" },
              { zone: "Conteúdo", expected: "main", hint: "Conteúdo principal" },
              { zone: "Rodapé", expected: "footer", hint: "Informações finais" }
            ]
          },
          {
            title: "Portfólio Pessoal",
            description: "Organize um site de portfólio com HTML semântico.",
            tags: ["header", "main", "section", "footer"],
            layout: [
              { zone: "Topo", expected: "header", hint: "Título do site" },
              { zone: "Projetos", expected: "section", hint: "Lista de trabalhos" },
              { zone: "Principal", expected: "main", hint: "Área principal" },
              { zone: "Rodapé", expected: "footer", hint: "Links de contato" }
            ]
          },
          {
            title: "Página de Contato",
            description: "Monte uma página de contato simples com HTML semântico.",
            tags: ["header", "main", "form", "footer"],
            layout: [
              { zone: "Topo", expected: "header", hint: "Título da página" },
              { zone: "Formulário", expected: "form", hint: "Área de envio de mensagem" },
              { zone: "Corpo", expected: "main", hint: "Conteúdo principal" },
              { zone: "Rodapé", expected: "footer", hint: "Informações adicionais" }
            ]
          },
          {
            title: "Página Inicial",
            description: "Monte a estrutura básica de uma home page.",
            tags: ["header", "nav", "main", "footer"],
            layout: [
              { zone: "Topo", expected: "header", hint: "Logo e nome do site" },
              { zone: "Menu Principal", expected: "nav", hint: "Links de navegação" },
              { zone: "Destaques", expected: "main", hint: "Conteúdo central" },
              { zone: "Base", expected: "footer", hint: "Rodapé com contatos" }
            ]
          },
          {
            title: "Sobre Nós",
            description: "Organize uma página simples sobre a empresa.",
            tags: ["header", "main", "section", "footer"],
            layout: [
              { zone: "Título", expected: "header", hint: "Nome da empresa" },
              { zone: "História", expected: "section", hint: "Texto sobre a história" },
              { zone: "Conteúdo", expected: "main", hint: "Informações centrais" },
              { zone: "Rodapé", expected: "footer", hint: "Links úteis" }
            ]
          },
          {
            title: "Página de Serviços",
            description: "Monte a estrutura de uma página com serviços oferecidos.",
            tags: ["header", "nav", "section", "footer"],
            layout: [
              { zone: "Topo", expected: "header", hint: "Nome e slogan" },
              { zone: "Navegação", expected: "nav", hint: "Links para outros serviços" },
              { zone: "Lista de Serviços", expected: "section", hint: "Informações dos serviços" },
              { zone: "Base", expected: "footer", hint: "Contatos e direitos" }
            ]
          },
          {
            title: "Mini Landing Page",
            description: "Crie uma landing page básica com HTML semântico.",
            tags: ["header", "main", "footer"],
            layout: [
              { zone: "Título", expected: "header", hint: "Apresentação do produto" },
              { zone: "Corpo", expected: "main", hint: "Benefícios e informações" },
              { zone: "Rodapé", expected: "footer", hint: "Links e redes sociais" }
            ]
          },
          {
            title: "Página de Produto",
            description: "Monte uma página de exibição de produto.",
            tags: ["header", "section", "main", "footer"],
            layout: [
              { zone: "Topo", expected: "header", hint: "Nome da loja" },
              { zone: "Produto", expected: "section", hint: "Informações do produto" },
              { zone: "Principal", expected: "main", hint: "Conteúdo principal" },
              { zone: "Rodapé", expected: "footer", hint: "Links úteis" }
            ]
          },
          {
            title: "Página Institucional",
            description: "Monte a estrutura básica de uma página institucional.",
            tags: ["header", "main", "section", "footer"],
            layout: [
              { zone: "Cabeçalho", expected: "header", hint: "Nome e logo" },
              { zone: "Conteúdo", expected: "main", hint: "Missão e visão" },
              { zone: "Seção Extra", expected: "section", hint: "Valores ou prêmios" },
              { zone: "Rodapé", expected: "footer", hint: "Contatos da empresa" }
            ]
          },
          {
            title: "Blog de Notícias",
            description: "Monte uma estrutura de blog para notícias simples.",
            tags: ["header", "main", "article", "footer"],
            layout: [
              { zone: "Topo", expected: "header", hint: "Logo do blog" },
              { zone: "Notícia", expected: "article", hint: "Artigo de destaque" },
              { zone: "Principal", expected: "main", hint: "Corpo da notícia" },
              { zone: "Rodapé", expected: "footer", hint: "Links e autoria" }
            ]
          }
        ],
        medium: [
          {
            title: "Blog com Sidebar",
            description: "Agora com posts e área lateral.",
            tags: ["header", "nav", "main", "footer", "article", "aside"],
            layout: [
              { zone: "Cabeçalho", expected: "header", hint: "Área superior com título" },
              { zone: "Menu", expected: "nav", hint: "Links de navegação" },
              { zone: "Post 1", expected: "article", hint: "Conteúdo independente" },
              { zone: "Post 2", expected: "article", hint: "Conteúdo independente" },
              { zone: "Sidebar", expected: "aside", hint: "Conteúdo relacionado" },
              { zone: "Rodapé", expected: "footer", hint: "Informações finais" }
            ]
          },
          {
            title: "Página de Artigos",
            description: "Organize uma seção com vários artigos e uma barra lateral.",
            tags: ["header", "main", "article", "aside", "footer"],
            layout: [
              { zone: "Topo", expected: "header", hint: "Título do site" },
              { zone: "Artigo Principal", expected: "article", hint: "Texto principal" },
              { zone: "Artigo Secundário", expected: "article", hint: "Texto complementar" },
              { zone: "Barra Lateral", expected: "aside", hint: "Links ou anúncios" },
              { zone: "Conteúdo", expected: "main", hint: "Agrupamento geral" },
              { zone: "Rodapé", expected: "footer", hint: "Contatos" }
            ]
          },
          {
            title: "Portal de Notícias",
            description: "Inclua múltiplos artigos e áreas secundárias.",
            tags: ["header", "nav", "section", "article", "aside", "footer"],
            layout: [
              { zone: "Cabeçalho", expected: "header", hint: "Logo do portal" },
              { zone: "Navegação", expected: "nav", hint: "Menu de seções" },
              { zone: "Seção de Notícias", expected: "section", hint: "Agrupamento de artigos" },
              { zone: "Notícia 1", expected: "article", hint: "Notícia destacada" },
              { zone: "Notícia 2", expected: "article", hint: "Notícia complementar" },
              { zone: "Lateral", expected: "aside", hint: "Publicidade" },
              { zone: "Rodapé", expected: "footer", hint: "Informações legais" }
            ]
          },
          {
            title: "Blog com Categorias",
            description: "Divida os artigos por categoria com uso de sections.",
            tags: ["header", "section", "article", "aside", "footer"],
            layout: [
              { zone: "Cabeçalho", expected: "header", hint: "Nome do blog" },
              { zone: "Categoria A", expected: "section", hint: "Grupo de artigos" },
              { zone: "Artigo A1", expected: "article", hint: "Texto individual" },
              { zone: "Artigo A2", expected: "article", hint: "Texto individual" },
              { zone: "Lateral", expected: "aside", hint: "Posts recentes" },
              { zone: "Rodapé", expected: "footer", hint: "Links úteis" }
            ]
          },
          {
            title: "Notícias Regionais",
            description: "Apresente notícias locais e conteúdo lateral.",
            tags: ["header", "nav", "main", "article", "aside", "footer"],
            layout: [
              { zone: "Topo", expected: "header", hint: "Nome do portal" },
              { zone: "Menu", expected: "nav", hint: "Regiões" },
              { zone: "Notícia Principal", expected: "article", hint: "Destaque da página" },
              { zone: "Principal", expected: "main", hint: "Agrupamento geral" },
              { zone: "Lateral", expected: "aside", hint: "Avisos e banners" },
              { zone: "Rodapé", expected: "footer", hint: "Créditos" }
            ]
          },
          {
            title: "Blog Temático",
            description: "Blog com temas agrupados em seções e artigos.",
            tags: ["header", "section", "article", "aside", "footer"],
            layout: [
              { zone: "Topo", expected: "header", hint: "Nome do site" },
              { zone: "Seção de Receitas", expected: "section", hint: "Agrupamento temático" },
              { zone: "Receita 1", expected: "article", hint: "Conteúdo independente" },
              { zone: "Receita 2", expected: "article", hint: "Conteúdo independente" },
              { zone: "Lateral", expected: "aside", hint: "Dicas rápidas" },
              { zone: "Rodapé", expected: "footer", hint: "Sobre nós" }
            ]
          },
          {
            title: "Blog com Entrevistas",
            description: "Adicione artigos com entrevistas e comentários laterais.",
            tags: ["header", "main", "article", "aside", "footer"],
            layout: [
              { zone: "Cabeçalho", expected: "header", hint: "Título do blog" },
              { zone: "Entrevista", expected: "article", hint: "Conteúdo principal" },
              { zone: "Comentários", expected: "aside", hint: "Opiniões dos leitores" },
              { zone: "Corpo", expected: "main", hint: "Área de conteúdo" },
              { zone: "Rodapé", expected: "footer", hint: "Informações finais" }
            ]
          },
          {
            title: "Site Educacional",
            description: "Página com conteúdos agrupados por seção.",
            tags: ["header", "nav", "section", "footer"],
            layout: [
              { zone: "Topo", expected: "header", hint: "Nome da escola" },
              { zone: "Menu", expected: "nav", hint: "Disciplinas" },
              { zone: "Seção de Matemática", expected: "section", hint: "Conteúdo agrupado" },
              { zone: "Rodapé", expected: "footer", hint: "Contato da instituição" }
            ]
          },
          {
            title: "Portal de Eventos",
            description: "Exiba eventos por seções e artigos.",
            tags: ["header", "section", "article", "footer"],
            layout: [
              { zone: "Cabeçalho", expected: "header", hint: "Nome do evento" },
              { zone: "Seção Musical", expected: "section", hint: "Área temática" },
              { zone: "Show A", expected: "article", hint: "Detalhes do evento" },
              { zone: "Rodapé", expected: "footer", hint: "Ingressos e contato" }
            ]
          },
          {
            title: "Notícias com Lateral",
            description: "Página com dois artigos e conteúdo lateral.",
            tags: ["header", "main", "article", "aside", "footer"],
            layout: [
              { zone: "Topo", expected: "header", hint: "Nome do portal" },
              { zone: "Artigo 1", expected: "article", hint: "Texto principal" },
              { zone: "Artigo 2", expected: "article", hint: "Texto complementar" },
              { zone: "Lateral", expected: "aside", hint: "Publicidade ou links" },
              { zone: "Principal", expected: "main", hint: "Área geral de conteúdo" },
              { zone: "Rodapé", expected: "footer", hint: "Sobre e contato" }
            ]
          }
        ],
        hard: [
          {
            title: "Site de Notícias",
            description: "Incluindo datas, imagens e autores.",
            tags: ["header", "nav", "main", "footer", "article", "section", "figure", "time", "address"],
            layout: [
              { zone: "Cabeçalho", expected: "header", hint: "Área superior com título" },
              { zone: "Menu", expected: "nav", hint: "Links de navegação" },
              { zone: "Destaque", expected: "section", hint: "Agrupamento temático" },
              { zone: "Notícia 1", expected: "article", hint: "Conteúdo independente" },
              { zone: "Imagem", expected: "figure", hint: "Conteúdo multimídia" },
              { zone: "Data", expected: "time", hint: "Informação temporal" },
              { zone: "Autor", expected: "address", hint: "Informação de contato" },
              { zone: "Rodapé", expected: "footer", hint: "Informações finais" }
            ]
          },
          {
            title: "Artigo Científico",
            description: "Apresente um artigo com imagens, autor e data.",
            tags: ["header", "main", "article", "figure", "time", "address", "footer"],
            layout: [
              { zone: "Topo", expected: "header", hint: "Título e subtítulo" },
              { zone: "Corpo", expected: "main", hint: "Conteúdo central" },
              { zone: "Artigo", expected: "article", hint: "Conteúdo do estudo" },
              { zone: "Imagem", expected: "figure", hint: "Gráfico ou diagrama" },
              { zone: "Data de Publicação", expected: "time", hint: "Quando foi publicado" },
              { zone: "Autor", expected: "address", hint: "Dados de contato" },
              { zone: "Rodapé", expected: "footer", hint: "Licenças e referências" }
            ]
          },
          {
            title: "Página de Evento",
            description: "Divida informações por seção e inclua horário e local.",
            tags: ["header", "section", "time", "address", "footer"],
            layout: [
              { zone: "Título", expected: "header", hint: "Nome do evento" },
              { zone: "Informações", expected: "section", hint: "Resumo do evento" },
              { zone: "Horário", expected: "time", hint: "Data e hora" },
              { zone: "Local", expected: "address", hint: "Endereço do local" },
              { zone: "Rodapé", expected: "footer", hint: "Contato e redes sociais" }
            ]
          },
          {
            title: "Notícia com Foto",
            description: "Estruture uma notícia com imagem, autor e data.",
            tags: ["header", "main", "article", "figure", "time", "address", "footer"],
            layout: [
              { zone: "Topo", expected: "header", hint: "Nome do jornal" },
              { zone: "Conteúdo", expected: "main", hint: "Corpo da página" },
              { zone: "Notícia", expected: "article", hint: "Texto da reportagem" },
              { zone: "Foto", expected: "figure", hint: "Imagem da matéria" },
              { zone: "Data", expected: "time", hint: "Quando aconteceu" },
              { zone: "Autor", expected: "address", hint: "Quem escreveu" },
              { zone: "Rodapé", expected: "footer", hint: "Créditos e links" }
            ]
          },
          {
            title: "Currículo Online",
            description: "Monte um currículo com dados de contato e seções.",
            tags: ["header", "main", "section", "article", "address", "footer"],
            layout: [
              { zone: "Topo", expected: "header", hint: "Nome do candidato" },
              { zone: "Principal", expected: "main", hint: "Corpo do currículo" },
              { zone: "Experiência", expected: "section", hint: "Resumo profissional" },
              { zone: "Formação", expected: "article", hint: "Detalhes dos cursos" },
              { zone: "Contato", expected: "address", hint: "E-mail e telefone" },
              { zone: "Rodapé", expected: "footer", hint: "Outros links" }
            ]
          },
          {
            title: "Catálogo de Produtos",
            description: "Inclua imagens e seções para categorias.",
            tags: ["header", "nav", "section", "figure", "main", "footer"],
            layout: [
              { zone: "Topo", expected: "header", hint: "Logo da loja" },
              { zone: "Menu", expected: "nav", hint: "Categorias" },
              { zone: "Produtos", expected: "section", hint: "Lista dos itens" },
              { zone: "Imagem Produto", expected: "figure", hint: "Foto do item" },
              { zone: "Principal", expected: "main", hint: "Conteúdo geral" },
              { zone: "Rodapé", expected: "footer", hint: "Links úteis" }
            ]
          },
          {
            title: "Jornal Digital",
            description: "Crie uma edição digital com múltiplos artigos e data.",
            tags: ["header", "nav", "article", "section", "time", "footer"],
            layout: [
              { zone: "Topo", expected: "header", hint: "Nome do jornal" },
              { zone: "Navegação", expected: "nav", hint: "Seções do jornal" },
              { zone: "Reportagem", expected: "article", hint: "Notícia principal" },
              { zone: "Sessão Cultural", expected: "section", hint: "Grupo temático" },
              { zone: "Publicação", expected: "time", hint: "Data" },
              { zone: "Rodapé", expected: "footer", hint: "Sobre e política" }
            ]
          },
          {
            title: "Blog de Viagem",
            description: "Adicione fotos, datas e localização dos relatos.",
            tags: ["header", "main", "article", "figure", "time", "address", "footer"],
            layout: [
              { zone: "Cabeçalho", expected: "header", hint: "Nome do blog" },
              { zone: "Corpo", expected: "main", hint: "Área principal" },
              { zone: "Relato", expected: "article", hint: "Texto da viagem" },
              { zone: "Foto", expected: "figure", hint: "Imagem do local" },
              { zone: "Data", expected: "time", hint: "Quando foi a viagem" },
              { zone: "Local", expected: "address", hint: "Endereço ou nome do lugar" },
              { zone: "Rodapé", expected: "footer", hint: "Redes sociais" }
            ]
          },
          {
            title: "Página de Empresa",
            description: "Monte um site com conteúdo institucional e contato.",
            tags: ["header", "main", "section", "address", "footer"],
            layout: [
              { zone: "Topo", expected: "header", hint: "Nome e logo" },
              { zone: "Principal", expected: "main", hint: "Apresentação" },
              { zone: "Quem Somos", expected: "section", hint: "Resumo da empresa" },
              { zone: "Contato", expected: "address", hint: "Telefone e e-mail" },
              { zone: "Rodapé", expected: "footer", hint: "Redes sociais" }
            ]
          },
          {
            title: "Artigo com Mídia",
            description: "Texto com imagem, data e autor detalhado.",
            tags: ["header", "main", "article", "figure", "time", "address", "footer"],
            layout: [
              { zone: "Topo", expected: "header", hint: "Nome da publicação" },
              { zone: "Conteúdo", expected: "main", hint: "Área principal" },
              { zone: "Artigo", expected: "article", hint: "Texto principal" },
              { zone: "Imagem", expected: "figure", hint: "Foto ilustrativa" },
              { zone: "Data", expected: "time", hint: "Publicação" },
              { zone: "Autor", expected: "address", hint: "Informações do autor" },
              { zone: "Rodapé", expected: "footer", hint: "Referências e redes" }
            ]
          }
        ],
        expert: [
          {
            title: "Portal Complexo",
            description: "Desafio máximo com tags avançadas.",
            tags: ["header", "nav", "main", "footer", "article", "section", "aside", "figure", "time", "address", "details", "summary", "mark"],
            layout: [
              { zone: "Cabeçalho", expected: "header", hint: "Área superior com título" },
              { zone: "Menu Principal", expected: "nav", hint: "Links de navegação" },
              { zone: "Conteúdo", expected: "main", hint: "Conteúdo principal" },
              { zone: "Artigo", expected: "article", hint: "Conteúdo independente" },
              { zone: "Seção", expected: "section", hint: "Agrupamento temático" },
              { zone: "Detalhes", expected: "details", hint: "Widget expansível" },
              { zone: "Destaque", expected: "mark", hint: "Texto marcado" },
              { zone: "Rodapé", expected: "footer", hint: "Informações finais" }
            ]
          },
          {
            title: "FAQ Interativo",
            description: "Use detalhes expansíveis com título.",
            tags: ["header", "main", "section", "details", "summary", "footer"],
            layout: [
              { zone: "Cabeçalho", expected: "header", hint: "Título da seção" },
              { zone: "Principal", expected: "main", hint: "Área do conteúdo" },
              { zone: "Perguntas", expected: "section", hint: "Bloco de questões" },
              { zone: "Expansível", expected: "details", hint: "Conteúdo oculto" },
              { zone: "Resumo", expected: "summary", hint: "Título da pergunta" },
              { zone: "Rodapé", expected: "footer", hint: "Links úteis" }
            ]
          },
          {
            title: "Blog Técnico",
            description: "Artigo com termos em destaque e áreas colapsáveis.",
            tags: ["header", "main", "article", "mark", "details", "summary", "footer"],
            layout: [
              { zone: "Topo", expected: "header", hint: "Nome do blog" },
              { zone: "Artigo", expected: "article", hint: "Conteúdo técnico" },
              { zone: "Termo Relevante", expected: "mark", hint: "Destaque no texto" },
              { zone: "Definição", expected: "details", hint: "Informações ocultas" },
              { zone: "Título Definição", expected: "summary", hint: "Cabeçalho do colapso" },
              { zone: "Principal", expected: "main", hint: "Área principal" },
              { zone: "Rodapé", expected: "footer", hint: "Referências" }
            ]
          },
          {
            title: "Artigo Expandido",
            description: "Conteúdo com imagens, autor, data e colapsos.",
            tags: ["header", "article", "figure", "address", "time", "details", "summary", "footer"],
            layout: [
              { zone: "Cabeçalho", expected: "header", hint: "Título do artigo" },
              { zone: "Imagem", expected: "figure", hint: "Foto da matéria" },
              { zone: "Autor", expected: "address", hint: "Dados do autor" },
              { zone: "Data", expected: "time", hint: "Publicação" },
              { zone: "Conteúdo", expected: "article", hint: "Texto do artigo" },
              { zone: "Extras", expected: "details", hint: "Informações extras" },
              { zone: "Resumo", expected: "summary", hint: "Título do extra" },
              { zone: "Rodapé", expected: "footer", hint: "Links de leitura" }
            ]
          },
          {
            title: "Portal Interativo",
            description: "Agrupe várias seções com recursos interativos.",
            tags: ["header", "section", "aside", "details", "summary", "footer"],
            layout: [
              { zone: "Topo", expected: "header", hint: "Nome do site" },
              { zone: "Seção A", expected: "section", hint: "Conteúdo agrupado" },
              { zone: "Dica Extra", expected: "aside", hint: "Informações laterais" },
              { zone: "Leia Mais", expected: "details", hint: "Colapsável" },
              { zone: "Resumo", expected: "summary", hint: "Cabeçalho oculto" },
              { zone: "Rodapé", expected: "footer", hint: "Créditos" }
            ]
          },
          {
            title: "Dicionário Web",
            description: "Página com termos marcados e definições escondidas.",
            tags: ["main", "section", "article", "mark", "details", "summary", "footer"],
            layout: [
              { zone: "Principal", expected: "main", hint: "Corpo do conteúdo" },
              { zone: "Seção de Termos", expected: "section", hint: "Bloco de palavras" },
              { zone: "Termo 1", expected: "article", hint: "Definição individual" },
              { zone: "Destaque", expected: "mark", hint: "Palavra importante" },
              { zone: "Detalhes", expected: "details", hint: "Mais informações" },
              { zone: "Resumo", expected: "summary", hint: "Termo principal" },
              { zone: "Rodapé", expected: "footer", hint: "Fontes" }
            ]
          },
          {
            title: "Perfil Profissional",
            description: "Perfil com destaques, contatos e seções ocultas.",
            tags: ["header", "main", "address", "mark", "details", "summary", "footer"],
            layout: [
              { zone: "Topo", expected: "header", hint: "Nome do profissional" },
              { zone: "Resumo", expected: "main", hint: "Apresentação geral" },
              { zone: "Contato", expected: "address", hint: "Informações diretas" },
              { zone: "Competência", expected: "mark", hint: "Habilidade em destaque" },
              { zone: "Certificados", expected: "details", hint: "Lista colapsável" },
              { zone: "Resumo do Certificado", expected: "summary", hint: "Nome do certificado" },
              { zone: "Rodapé", expected: "footer", hint: "Portfólio externo" }
            ]
          },
          {
            title: "Tutorial Interativo",
            description: "Use blocos de explicação colapsáveis e marcações.",
            tags: ["main", "section", "mark", "details", "summary", "footer"],
            layout: [
              { zone: "Corpo", expected: "main", hint: "Conteúdo principal" },
              { zone: "Seção de Código", expected: "section", hint: "Parte técnica" },
              { zone: "Função", expected: "mark", hint: "Elemento em destaque" },
              { zone: "Exemplo", expected: "details", hint: "Bloco dobrável" },
              { zone: "Resumo Exemplo", expected: "summary", hint: "Nome da função" },
              { zone: "Rodapé", expected: "footer", hint: "Referências" }
            ]
          },
          {
            title: "Currículo Moderno",
            description: "Currículo com seções dobráveis e destaques.",
            tags: ["header", "main", "section", "mark", "details", "summary", "footer"],
            layout: [
              { zone: "Topo", expected: "header", hint: "Nome do candidato" },
              { zone: "Apresentação", expected: "main", hint: "Resumo pessoal" },
              { zone: "Formação", expected: "section", hint: "Estudos" },
              { zone: "Habilidade-chave", expected: "mark", hint: "Destaque" },
              { zone: "Histórico Profissional", expected: "details", hint: "Empregos anteriores" },
              { zone: "Empresa", expected: "summary", hint: "Nome da empresa" },
              { zone: "Rodapé", expected: "footer", hint: "Contato e links" }
            ]
          },
          {
            title: "Enciclopédia Online",
            description: "Crie uma entrada de enciclopédia com marcações e explicações ocultas.",
            tags: ["header", "main", "article", "mark", "details", "summary", "footer"],
            layout: [
              { zone: "Cabeçalho", expected: "header", hint: "Nome do artigo" },
              { zone: "Entrada", expected: "article", hint: "Texto explicativo" },
              { zone: "Palavra-chave", expected: "mark", hint: "Termo importante" },
              { zone: "Mais informações", expected: "details", hint: "Expansível" },
              { zone: "Resumo", expected: "summary", hint: "Tópico extra" },
              { zone: "Principal", expected: "main", hint: "Área geral" },
              { zone: "Rodapé", expected: "footer", hint: "Referências bibliográficas" }
            ]
          }
        ],
        extreme: [
          {
            title: "Site Complexo com Microdados",
            description: "Combine tags semânticas com schema.org",
            tags: ["header", "main", "article", "section", "footer", "time", "address", "figure", "details", "summary", "mark", "nav", "aside"],
            layout: [
              { zone: "Cabeçalho", expected: "header", hint: "Área superior com título" },
              { zone: "Menu Principal", expected: "nav", hint: "Links de navegação" },
              { zone: "Conteúdo", expected: "main", hint: "Conteúdo principal" },
              { zone: "Artigo", expected: "article", hint: "Conteúdo independente" },
              { zone: "Seção", expected: "section", hint: "Agrupamento temático" },
              { zone: "Data", expected: "time", hint: "Informação temporal" },
              { zone: "Autor", expected: "address", hint: "Informação de contato" },
              { zone: "Imagem", expected: "figure", hint: "Conteúdo multimídia" },
              { zone: "Rodapé", expected: "footer", hint: "Informações finais" }
            ]
          },
          {
            title: "Aplicação Web Completa",
            description: "Estruture uma aplicação web complexa com todas as tags semânticas",
            tags: ["header", "nav", "main", "article", "section", "aside", "footer", "time", "address", "figure", "details", "summary", "mark"],
            layout: [
              { zone: "Cabeçalho", expected: "header", hint: "Área superior com título" },
              { zone: "Menu Global", expected: "nav", hint: "Navegação principal" },
              { zone: "Conteúdo", expected: "main", hint: "Conteúdo principal" },
              { zone: "Artigo", expected: "article", hint: "Conteúdo independente" },
              { zone: "Seção", expected: "section", hint: "Agrupamento temático" },
              { zone: "Barra Lateral", expected: "aside", hint: "Conteúdo relacionado" },
              { zone: "Data", expected: "time", hint: "Informação temporal" },
              { zone: "Contato", expected: "address", hint: "Informação de contato" },
              { zone: "Galeria", expected: "figure", hint: "Conteúdo multimídia" },
              { zone: "Detalhes", expected: "details", hint: "Widget expansível" },
              { zone: "Resumo", expected: "summary", hint: "Título do expansível" },
              { zone: "Rodapé", expected: "footer", hint: "Informações finais" }
            ]
          }
        ]
      };
    
    // Atualiza a exibição dos botões de nível
    function updateLevelButtons() {
      document.querySelectorAll('.buttons button').forEach(button => {
          const level = button.dataset.level;

          if (!unlockedLevels.includes(level)) {
              button.disabled = true;
              button.style.opacity = "0.5";
              button.title = "Complete o nível anterior para desbloquear";
          } else {
              button.disabled = false;
              button.style.opacity = "1";
              button.title = "Jogar este nível";
              
              // Adiciona checkmark se o nível foi completado
              if (unlockedLevels.includes(level) && level !== "easy") {
                  if (!button.querySelector('.checkmark')) {
                      const checkmark = document.createElement('span');
                      checkmark.className = 'checkmark';
                      checkmark.innerHTML = ' ✓';
                      checkmark.style.color = '#2ecc71';
                      button.appendChild(checkmark);
                  }
              }
          }

          button.addEventListener('click', () => {
              currentLevel = level;
              score = 0;
              scoreEl.textContent = score;
              startGame(currentLevel);
          });
      });
  }

  updateLevelButtons();

  function startGame(level) {
      levelSelector.classList.add('hidden');
      gameArea.style.display = 'block';
      buttonContainer.innerHTML = '';
  
      currentLevel = level;
      currentLevelChallenges = levels[level];
      currentChallengeIndex = 0;
  
      loadChallenge(currentChallengeIndex);
      mistakes = 0;
  }

  function loadChallenge(index) {
      if (index >= currentLevelChallenges.length) {
          messageEl.textContent = `Parabéns! Você completou todos os desafios do nível ${currentLevel}!`;
          
          // Cria botões para ações pós-nível
          buttonContainer.innerHTML = '';
          
          // Botão Repetir Nível
          const repeatBtn = document.createElement('button');
          repeatBtn.textContent = 'Repetir Nível';
          repeatBtn.className = 'repeat-level-btn';
          repeatBtn.addEventListener('click', () => {
              currentChallengeIndex = 0;
              score = 0;
              scoreEl.textContent = score;
              loadChallenge(currentChallengeIndex);
          });
          buttonContainer.appendChild(repeatBtn);
          
          // Botão Próximo Nível (se houver)
          const levelOrder = ["easy", "medium", "hard", "expert", "extreme"];
          const nextIndex = levelOrder.indexOf(currentLevel) + 1;
          
          if (nextIndex < levelOrder.length) {
              const nextLevelBtn = document.createElement('button');
              nextLevelBtn.textContent = 'Próximo Nível →';
              nextLevelBtn.className = 'next-level-btn';
              nextLevelBtn.addEventListener('click', () => {
                  const nextLevel = levelOrder[nextIndex];
                  if (!unlockedLevels.includes(nextLevel)) {
                      unlockedLevels.push(nextLevel);
                      localStorage.setItem("unlockedLevels", JSON.stringify(unlockedLevels));
                      updateLevelButtons();
                  }
                  currentLevel = nextLevel;
                  currentChallengeIndex = 0;
                  score = 0;
                  scoreEl.textContent = score;
                  startGame(currentLevel);
              });
              buttonContainer.appendChild(nextLevelBtn);
          }
          
          // Botão Voltar para Seleção de Nível
          const backBtn = document.createElement('button');
          backBtn.textContent = 'Voltar aos Níveis';
          backBtn.className = 'back-level-btn';
          backBtn.addEventListener('click', () => {
              levelSelector.classList.remove('hidden');
              gameArea.style.display = 'none';
          });
          buttonContainer.appendChild(backBtn);
          
          return;
      }

      const challenge = currentLevelChallenges[index];
      challengeTitle.textContent = `Desafio ${index + 1} de ${currentLevelChallenges.length}: ${challenge.title}`;
      challengeDescription.textContent = challenge.description;
      currentLevelEl.textContent = currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1);

      renderLayout(challenge.layout);
      renderTags(challenge.tags);

      completedZones = 0;
  }

  function renderLayout(layout) {
      pageLayout.innerHTML = '';
      pageLayout.style.gridTemplateRows = `repeat(${layout.length}, 1fr)`;

      layout.forEach(zone => {
          const dropZone = document.createElement('div');
          dropZone.className = 'drop-zone';
          dropZone.dataset.expected = zone.expected;
          dropZone.dataset.hint = zone.hint;
          dropZone.textContent = zone.zone;

          dropZone.addEventListener('dragover', (e) => {
              e.preventDefault();
              dropZone.classList.add('highlight');
          });

          dropZone.addEventListener('dragleave', () => {
              dropZone.classList.remove('highlight');
          });

          dropZone.addEventListener('drop', (e) => {
              e.preventDefault();
              dropZone.classList.remove('highlight');

              const draggedTag = e.dataTransfer.getData('text/plain');
              const expectedTag = dropZone.dataset.expected;

              if (draggedTag === expectedTag) {
                  dropZone.innerHTML = `&lt;${draggedTag}&gt; <small>${zone.zone}</small>`;
                  dropZone.classList.add('correct');
                  
                  // Pontuação baseada no nível de dificuldade
                  let points = 10;
                  if (currentLevel === "medium") points = 12;
                  else if (currentLevel === "hard") points = 15;
                  else if (currentLevel === "expert") points = 18;
                  else if (currentLevel === "extreme") points = 20;
                  
                  score += points;
                  messageEl.textContent = `Correto! +${points} pontos!`;
                  messageEl.className = "correct";
                  completedZones++;

                  if (completedZones === layout.length) {
                      messageEl.textContent = `Parabéns! Você completou este desafio com ${score} pontos!`;

                      currentChallengeIndex++;

                      if (currentChallengeIndex >= currentLevelChallenges.length) {
                          // Fim do nível
                          setTimeout(() => {
                              loadChallenge(currentChallengeIndex);
                          }, 1500);
                      } else {
                          setTimeout(() => {
                              loadChallenge(currentChallengeIndex);
                              mistakes = 0;
                          }, 1500);
                      }
                  }
              } else {
                  // Penalidade baseada no nível de dificuldade
                  let penalty = 3;
                  if (currentLevel === "medium") penalty = 4;
                  else if (currentLevel === "hard") penalty = 5;
                  else if (currentLevel === "expert") penalty = 6;
                  else if (currentLevel === "extreme") penalty = 8;
                  
                  score = Math.max(0, score - penalty);
                  mistakes++;
                  messageEl.textContent = `Ops! Aqui o ideal é <${expectedTag}>. -${penalty} pontos (${mistakes}/3 erros)`;
                  messageEl.className = "error";

                  if (mistakes >= 3) {
                      messageEl.textContent = "Você perdeu! Reiniciando o nível...";
                      setTimeout(() => {
                          currentChallengeIndex = 0;
                          mistakes = 0;
                          score = 0;
                          scoreEl.textContent = score;
                          loadChallenge(currentChallengeIndex);
                      }, 1500);
                  }
              }

              scoreEl.textContent = score;
          });

          pageLayout.appendChild(dropZone);
      });
  }

  function renderTags(tags) {
      tagBank.innerHTML = '';

      tags.forEach(tag => {
          const tagElement = document.createElement('div');
          tagElement.className = 'tag';
          tagElement.dataset.tag = tag;
          tagElement.textContent = `<${tag}>`;
          tagElement.draggable = true;

          tagElement.addEventListener('dragstart', (e) => {
              e.dataTransfer.setData('text/plain', tag);
          });

          tagBank.appendChild(tagElement);
      });
  }
});