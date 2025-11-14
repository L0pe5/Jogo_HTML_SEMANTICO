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
        // Nível 1: Blog Simples (Ordem e Dicas Alteradas)
        {
            title: "Blog Simples",
            description: "Construa a estrutura básica de um blog usando HTML semântico.",
            tags: ["header", "nav", "main", "footer"],
            layout: [
                { zone: "Menu", expected: "nav", hint: "Elemento de navegação principal" },
                { zone: "Rodapé", expected: "footer", hint: "Informações de direitos autorais e contato" },
                { zone: "Conteúdo", expected: "main", hint: "O conteúdo central e único da página" },
                { zone: "Cabeçalho", expected: "header", hint: "Introdução e título do site" }
            ]
        },
        // Nível 2: Portfólio Pessoal (Ordem e Dicas Alteradas)
        {
            title: "Portfólio Pessoal",
            description: "Organize um site de portfólio com HTML semântico.",
            tags: ["header", "main", "section", "footer"],
            layout: [
                { zone: "Principal", expected: "main", hint: "O corpo principal do portfólio" },
                { zone: "Topo", expected: "header", hint: "Área de apresentação e logo" },
                { zone: "Rodapé", expected: "footer", hint: "Links de contato e redes sociais" },
                { zone: "Projetos", expected: "section", hint: "Agrupamento temático de trabalhos" }
            ]
        },
        // Nível 3: Página de Contato (Ordem e Dicas Alteradas)
        {
            title: "Página de Contato",
            description: "Monte uma página de contato simples com HTML semântico.",
            tags: ["header", "main", "form", "footer"],
            layout: [
                { zone: "Formulário", expected: "form", hint: "Área de submissão de dados" },
                { zone: "Corpo", expected: "main", hint: "Conteúdo principal da página" },
                { zone: "Topo", expected: "header", hint: "Título e introdução da página" },
                { zone: "Rodapé", expected: "footer", hint: "Informações adicionais e legais" }
            ]
        },
        // Nível 4: Página Inicial (Ordem e Dicas Alteradas)
        {
            title: "Página Inicial",
            description: "Monte a estrutura básica de uma home page.",
            tags: ["header", "nav", "main", "footer"],
            layout: [
                { zone: "Menu Principal", expected: "nav", hint: "Links para outras páginas" },
                { zone: "Destaques", expected: "main", hint: "Conteúdo central e exclusivo da página" },
                { zone: "Topo", expected: "header", hint: "Logo e nome do site" },
                { zone: "Base", expected: "footer", hint: "Rodapé com contatos" }
            ]
        },
        // Nível 5: Sobre Nós (Ordem e Dicas Alteradas)
        {
            title: "Sobre Nós",
            description: "Organize uma página simples sobre a empresa.",
            tags: ["header", "main", "section", "footer"],
            layout: [
                { zone: "Conteúdo", expected: "main", hint: "Informações centrais sobre a empresa" },
                { zone: "História", expected: "section", hint: "Agrupamento temático de texto" },
                { zone: "Título", expected: "header", hint: "Nome da empresa e slogan" },
                { zone: "Rodapé", expected: "footer", hint: "Links úteis e informações finais" }
            ]
        },
        // Nível 6: Página de Serviços (Ordem e Dicas Alteradas)
        {
            title: "Página de Serviços",
            description: "Monte a estrutura de uma página com serviços oferecidos.",
            tags: ["header", "nav", "section", "footer"],
            layout: [
                { zone: "Lista de Serviços", expected: "section", hint: "Agrupamento de serviços relacionados" },
                { zone: "Topo", expected: "header", hint: "Nome e slogan" },
                { zone: "Base", expected: "footer", hint: "Contatos e direitos" },
                { zone: "Navegação", expected: "nav", hint: "Links para outros serviços" }
            ]
        },
        // Nível 7: Mini Landing Page (Ordem e Dicas Alteradas)
        {
            title: "Mini Landing Page",
            description: "Crie uma landing page básica com HTML semântico.",
            tags: ["header", "main", "footer"],
            layout: [
                { zone: "Corpo", expected: "main", hint: "Benefícios e informações principais" },
                { zone: "Título", expected: "header", hint: "Apresentação do produto" },
                { zone: "Rodapé", expected: "footer", hint: "Links e redes sociais" }
            ]
        },
        // Nível 8: Página de Produto (Ordem e Dicas Alteradas)
        {
            title: "Página de Produto",
            description: "Monte uma página de exibição de produto.",
            tags: ["header", "section", "main", "footer"],
            layout: [
                { zone: "Produto", expected: "section", hint: "Agrupamento de informações do produto" },
                { zone: "Rodapé", expected: "footer", hint: "Links úteis" },
                { zone: "Principal", expected: "main", hint: "Conteúdo principal" },
                { zone: "Topo", expected: "header", hint: "Nome da loja" }
            ]
        },
        // Nível 9: Página Institucional (Ordem e Dicas Alteradas)
        {
            title: "Página Institucional",
            description: "Monte a estrutura básica de uma página institucional.",
            tags: ["header", "main", "section", "footer"],
            layout: [
                { zone: "Conteúdo", expected: "main", hint: "Missão e visão (conteúdo principal)" },
                { zone: "Rodapé", expected: "footer", hint: "Contatos da empresa" },
                { zone: "Seção Extra", expected: "section", hint: "Valores ou prêmios (agrupamento)" },
                { zone: "Cabeçalho", expected: "header", hint: "Nome e logo" }
            ]
        },
        // Nível 10: Blog de Notícias (Ordem e Dicas Alteradas)
        {
            title: "Blog de Notícias",
            description: "Monte uma estrutura de blog para notícias simples.",
            tags: ["header", "main", "article", "footer"],
            layout: [
                { zone: "Notícia", expected: "article", hint: "Conteúdo independente e autocontido" },
                { zone: "Topo", expected: "header", hint: "Logo do blog" },
                { zone: "Rodapé", expected: "footer", hint: "Links e autoria" },
                { zone: "Principal", expected: "main", hint: "Corpo da notícia (conteúdo principal)" }
            ]
        }
    ],
    medium: [
        // Nível 1: Blog com Sidebar (Ordem e Dicas Alteradas)
        {
            title: "Blog com Sidebar",
            description: "Agora com posts e área lateral.",
            tags: ["header", "nav", "main", "footer", "article", "aside"],
            layout: [
                { zone: "Sidebar", expected: "aside", hint: "Conteúdo relacionado, mas não essencial" },
                { zone: "Post 1", expected: "article", hint: "Primeiro conteúdo independente" },
                { zone: "Menu", expected: "nav", hint: "Links de navegação" },
                { zone: "Post 2", expected: "article", hint: "Segundo conteúdo independente" },
                { zone: "Rodapé", expected: "footer", hint: "Informações finais" },
                { zone: "Cabeçalho", expected: "header", hint: "Área superior com título" }
            ]
        },
        // Nível 2: Página de Artigos (Ordem e Dicas Alteradas)
        {
            title: "Página de Artigos",
            description: "Organize uma seção com vários artigos e uma barra lateral.",
            tags: ["header", "main", "article", "aside", "footer"],
            layout: [
                { zone: "Artigo Principal", expected: "article", hint: "Texto principal e autocontido" },
                { zone: "Conteúdo", expected: "main", hint: "Agrupamento geral do corpo da página" },
                { zone: "Barra Lateral", expected: "aside", hint: "Links ou anúncios (conteúdo secundário)" },
                { zone: "Artigo Secundário", expected: "article", hint: "Texto complementar e autocontido" },
                { zone: "Rodapé", expected: "footer", hint: "Contatos" },
                { zone: "Topo", expected: "header", hint: "Título do site" }
            ]
        },
        // Nível 3: Portal de Notícias (Ordem e Dicas Alteradas)
        {
            title: "Portal de Notícias",
            description: "Inclua múltiplos artigos e áreas secundárias.",
            tags: ["header", "nav", "section", "article", "aside", "footer"],
            layout: [
                { zone: "Notícia 1", expected: "article", hint: "Notícia destacada (conteúdo independente)" },
                { zone: "Seção de Notícias", expected: "section", hint: "Agrupamento de artigos relacionados" },
                { zone: "Navegação", expected: "nav", hint: "Menu de seções" },
                { zone: "Lateral", expected: "aside", hint: "Publicidade (conteúdo secundário)" },
                { zone: "Notícia 2", expected: "article", hint: "Notícia complementar (conteúdo independente)" },
                { zone: "Rodapé", expected: "footer", hint: "Informações legais" },
                { zone: "Cabeçalho", expected: "header", hint: "Logo do portal" }
            ]
        },
        // Nível 4: Blog com Categorias (Ordem e Dicas Alteradas)
        {
            title: "Blog com Categorias",
            description: "Divida os artigos por categoria com uso de sections.",
            tags: ["header", "section", "article", "aside", "footer"],
            layout: [
                { zone: "Artigo A1", expected: "article", hint: "Primeiro texto individual" },
                { zone: "Lateral", expected: "aside", hint: "Posts recentes (conteúdo secundário)" },
                { zone: "Categoria A", expected: "section", hint: "Grupo de artigos temáticos" },
                { zone: "Artigo A2", expected: "article", hint: "Segundo texto individual" },
                { zone: "Rodapé", expected: "footer", hint: "Links úteis" },
                { zone: "Cabeçalho", expected: "header", hint: "Nome do blog" }
            ]
        },
        // Nível 5: Notícias Regionais (Ordem e Dicas Alteradas)
        {
            title: "Notícias Regionais",
            description: "Apresente notícias locais e conteúdo lateral.",
            tags: ["header", "nav", "main", "article", "aside", "footer"],
            layout: [
                { zone: "Notícia Principal", expected: "article", hint: "Destaque da página (conteúdo independente)" },
                { zone: "Menu", expected: "nav", hint: "Regiões (links de navegação)" },
                { zone: "Principal", expected: "main", hint: "Agrupamento geral do corpo da página" },
                { zone: "Lateral", expected: "aside", hint: "Avisos e banners (conteúdo secundário)" },
                { zone: "Rodapé", expected: "footer", hint: "Créditos" },
                { zone: "Topo", expected: "header", hint: "Nome do portal" }
            ]
        },
        // Nível 6: Blog Temático (Ordem e Dicas Alteradas)
        {
            title: "Blog Temático",
            description: "Blog com temas agrupados em seções e artigos.",
            tags: ["header", "section", "article", "aside", "footer"],
            layout: [
                { zone: "Seção de Receitas", expected: "section", hint: "Agrupamento temático" },
                { zone: "Receita 1", expected: "article", hint: "Conteúdo independente" },
                { zone: "Lateral", expected: "aside", hint: "Dicas rápidas (conteúdo secundário)" },
                { zone: "Receita 2", expected: "article", hint: "Conteúdo independente" },
                { zone: "Rodapé", expected: "footer", hint: "Sobre nós" },
                { zone: "Topo", expected: "header", hint: "Nome do site" }
            ]
        },
        // Nível 7: Blog com Entrevistas (Ordem e Dicas Alteradas)
        {
            title: "Blog com Entrevistas",
            description: "Adicione artigos com entrevistas e comentários laterais.",
            tags: ["header", "main", "article", "aside", "footer"],
            layout: [
                { zone: "Entrevista", expected: "article", hint: "Conteúdo principal (independente)" },
                { zone: "Corpo", expected: "main", hint: "Área de conteúdo principal" },
                { zone: "Comentários", expected: "aside", hint: "Opiniões dos leitores (conteúdo secundário)" },
                { zone: "Rodapé", expected: "footer", hint: "Informações finais" },
                { zone: "Cabeçalho", expected: "header", hint: "Título do blog" }
            ]
        },
        // Nível 8: Site Educacional (Ordem e Dicas Alteradas)
        {
            title: "Site Educacional",
            description: "Página com conteúdos agrupados por seção.",
            tags: ["header", "nav", "section", "footer"],
            layout: [
                { zone: "Menu", expected: "nav", hint: "Disciplinas (links de navegação)" },
                { zone: "Seção de Matemática", expected: "section", hint: "Conteúdo agrupado tematicamente" },
                { zone: "Rodapé", expected: "footer", hint: "Contato da instituição" },
                { zone: "Topo", expected: "header", hint: "Nome da escola" }
            ]
        },
        // Nível 9: Portal de Eventos (Ordem e Dicas Alteradas)
        {
            title: "Portal de Eventos",
            description: "Exiba eventos por seções e artigos.",
            tags: ["header", "section", "article", "footer"],
            layout: [
                { zone: "Seção Musical", expected: "section", hint: "Área temática (agrupamento)" },
                { zone: "Show A", expected: "article", hint: "Detalhes do evento (conteúdo independente)" },
                { zone: "Rodapé", expected: "footer", hint: "Ingressos e contato" },
                { zone: "Cabeçalho", expected: "header", hint: "Nome do evento" }
            ]
        },
        // Nível 10: Notícias com Lateral (Ordem e Dicas Alteradas)
        {
            title: "Notícias com Lateral",
            description: "Página com dois artigos e conteúdo lateral.",
            tags: ["header", "main", "article", "aside", "footer"],
            layout: [
                { zone: "Artigo 1", expected: "article", hint: "Texto principal (conteúdo independente)" },
                { zone: "Lateral", expected: "aside", hint: "Publicidade ou links (conteúdo secundário)" },
                { zone: "Artigo 2", expected: "article", hint: "Texto complementar (conteúdo independente)" },
                { zone: "Principal", expected: "main", hint: "Área geral de conteúdo" },
                { zone: "Rodapé", expected: "footer", hint: "Sobre e contato" },
                { zone: "Topo", expected: "header", hint: "Nome do portal" }
            ]
        }
    ],
    hard: [
        // Nível 1: Site de Notícias (Ordem e Dicas Alteradas)
        {
            title: "Site de Notícias",
            description: "Incluindo datas, imagens e autores.",
            tags: ["header", "nav", "main", "footer", "article", "section", "figure", "time", "address"],
            layout: [
                { zone: "Destaque", expected: "section", hint: "Agrupamento temático de notícias" },
                { zone: "Menu", expected: "nav", hint: "Links de navegação" },
                { zone: "Imagem", expected: "figure", hint: "Conteúdo multimídia (imagem)" },
                { zone: "Data", expected: "time", hint: "Informação temporal da notícia" },
                { zone: "Autor", expected: "address", hint: "Informação de contato/autoria" },
                { zone: "Notícia 1", expected: "article", hint: "Conteúdo independente" },
                { zone: "Rodapé", expected: "footer", hint: "Informações finais" },
                { zone: "Cabeçalho", expected: "header", hint: "Área superior com título" }
            ]
        },
        // Nível 2: Artigo Científico (Ordem e Dicas Alteradas)
        {
            title: "Artigo Científico",
            description: "Apresente um artigo com imagens, autor e data.",
            tags: ["header", "main", "article", "figure", "time", "address", "footer"],
            layout: [
                { zone: "Artigo", expected: "article", hint: "Conteúdo principal do estudo" },
                { zone: "Imagem", expected: "figure", hint: "Gráfico ou diagrama" },
                { zone: "Data de Publicação", expected: "time", hint: "Quando foi publicado" },
                { zone: "Autor", expected: "address", hint: "Dados de contato" },
                { zone: "Corpo", expected: "main", hint: "Conteúdo central" },
                { zone: "Rodapé", expected: "footer", hint: "Licenças e referências" },
                { zone: "Topo", expected: "header", hint: "Título e subtítulo" }
            ]
        },
        // Nível 3: Página de Evento (Ordem e Dicas Alteradas)
        {
            title: "Página de Evento",
            description: "Divida informações por seção e inclua horário e local.",
            tags: ["header", "section", "time", "address", "footer"],
            layout: [
                { zone: "Horário", expected: "time", hint: "Data e hora do evento" },
                { zone: "Informações", expected: "section", hint: "Resumo do evento (agrupamento)" },
                { zone: "Local", expected: "address", hint: "Endereço do local" },
                { zone: "Rodapé", expected: "footer", hint: "Contato e redes sociais" },
                { zone: "Título", expected: "header", hint: "Nome do evento" }
            ]
        },
        // Nível 4: Notícia com Foto (Ordem e Dicas Alteradas)
        {
            title: "Notícia com Foto",
            description: "Estruture uma notícia com imagem, autor e data.",
            tags: ["header", "main", "article", "figure", "time", "address", "footer"],
            layout: [
                { zone: "Notícia", expected: "article", hint: "Texto da reportagem (conteúdo independente)" },
                { zone: "Foto", expected: "figure", hint: "Imagem da matéria" },
                { zone: "Data", expected: "time", hint: "Quando aconteceu" },
                { zone: "Autor", expected: "address", hint: "Quem escreveu" },
                { zone: "Conteúdo", expected: "main", hint: "Corpo da página" },
                { zone: "Rodapé", expected: "footer", hint: "Créditos e links" },
                { zone: "Topo", expected: "header", hint: "Nome do jornal" }
            ]
        },
        // Nível 5: Currículo Online (Ordem e Dicas Alteradas)
        {
            title: "Currículo Online",
            description: "Monte um currículo com dados de contato e seções.",
            tags: ["header", "main", "section", "article", "address", "footer"],
            layout: [
                { zone: "Formação", expected: "article", hint: "Detalhes dos cursos (conteúdo independente)" },
                { zone: "Experiência", expected: "section", hint: "Resumo profissional (agrupamento)" },
                { zone: "Contato", expected: "address", hint: "E-mail e telefone" },
                { zone: "Principal", expected: "main", hint: "Corpo do currículo" },
                { zone: "Rodapé", expected: "footer", hint: "Outros links" },
                { zone: "Topo", expected: "header", hint: "Nome do candidato" }
            ]
        },
        // Nível 6: Catálogo de Produtos (Ordem e Dicas Alteradas)
        {
            title: "Catálogo de Produtos",
            description: "Inclua imagens e seções para categorias.",
            tags: ["header", "nav", "section", "figure", "main", "footer"],
            layout: [
                { zone: "Imagem Produto", expected: "figure", hint: "Foto do item" },
                { zone: "Menu", expected: "nav", hint: "Categorias (links de navegação)" },
                { zone: "Produtos", expected: "section", hint: "Lista dos itens (agrupamento)" },
                { zone: "Principal", expected: "main", hint: "Conteúdo geral" },
                { zone: "Rodapé", expected: "footer", hint: "Links úteis" },
                { zone: "Topo", expected: "header", hint: "Logo da loja" }
            ]
        },
        // Nível 7: Jornal Digital (Ordem e Dicas Alteradas)
        {
            title: "Jornal Digital",
            description: "Crie uma edição digital com múltiplos artigos e data.",
            tags: ["header", "nav", "article", "section", "time", "footer"],
            layout: [
                { zone: "Reportagem", expected: "article", hint: "Notícia principal (conteúdo independente)" },
                { zone: "Sessão Cultural", expected: "section", hint: "Grupo temático (agrupamento)" },
                { zone: "Publicação", expected: "time", hint: "Data" },
                { zone: "Navegação", expected: "nav", hint: "Seções do jornal" },
                { zone: "Rodapé", expected: "footer", hint: "Sobre e política" },
                { zone: "Topo", expected: "header", hint: "Nome do jornal" }
            ]
        },
        // Nível 8: Blog de Viagem (Ordem e Dicas Alteradas)
        {
            title: "Blog de Viagem",
            description: "Adicione fotos, datas e localização dos relatos.",
            tags: ["header", "main", "article", "figure", "time", "address", "footer"],
            layout: [
                { zone: "Relato", expected: "article", hint: "Texto da viagem (conteúdo independente)" },
                { zone: "Foto", expected: "figure", hint: "Imagem do local" },
                { zone: "Data", expected: "time", hint: "Quando foi a viagem" },
                { zone: "Local", expected: "address", hint: "Endereço ou nome do lugar" },
                { zone: "Corpo", expected: "main", hint: "Área principal" },
                { zone: "Rodapé", expected: "footer", hint: "Redes sociais" },
                { zone: "Cabeçalho", expected: "header", hint: "Nome do blog" }
            ]
        },
        // Nível 9: Página de Empresa (Ordem e Dicas Alteradas)
        {
            title: "Página de Empresa",
            description: "Monte um site com conteúdo institucional e contato.",
            tags: ["header", "main", "section", "address", "footer"],
            layout: [
                { zone: "Quem Somos", expected: "section", hint: "Resumo da empresa (agrupamento)" },
                { zone: "Contato", expected: "address", hint: "Telefone e e-mail" },
                { zone: "Principal", expected: "main", hint: "Apresentação (conteúdo principal)" },
                { zone: "Rodapé", expected: "footer", hint: "Redes sociais" },
                { zone: "Topo", expected: "header", hint: "Nome e logo" }
            ]
        },
        // Nível 10: Artigo com Mídia (Ordem e Dicas Alteradas)
        {
            title: "Artigo com Mídia",
            description: "Texto com imagem, data e autor detalhado.",
            tags: ["header", "main", "article", "figure", "time", "address", "footer"],
            layout: [
                { zone: "Artigo", expected: "article", hint: "Texto principal (conteúdo independente)" },
                { zone: "Imagem", expected: "figure", hint: "Foto ilustrativa" },
                { zone: "Data", expected: "time", hint: "Publicação" },
                { zone: "Autor", expected: "address", hint: "Informações do autor" },
                { zone: "Conteúdo", expected: "main", hint: "Área principal" },
                { zone: "Rodapé", expected: "footer", hint: "Referências e redes" },
                { zone: "Topo", expected: "header", hint: "Nome da publicação" }
            ]
        }
    ],
    expert: [
        // Nível 1: Portal Complexo (Ordem e Dicas Alteradas)
        {
            title: "Portal Complexo",
            description: "Desafio máximo com tags avançadas.",
            tags: ["header", "nav", "main", "footer", "article", "section", "aside", "figure", "time", "address", "details", "summary", "mark"],
            layout: [
                { zone: "Seção", expected: "section", hint: "Agrupamento temático" },
                { zone: "Detalhes", expected: "details", hint: "Widget expansível (conteúdo oculto)" },
                { zone: "Destaque", expected: "mark", hint: "Texto marcado ou realçado" },
                { zone: "Menu Principal", expected: "nav", hint: "Links de navegação" },
                { zone: "Conteúdo", expected: "main", hint: "Conteúdo principal" },
                { zone: "Artigo", expected: "article", hint: "Conteúdo independente" },
                { zone: "Rodapé", expected: "footer", hint: "Informações finais" },
                { zone: "Cabeçalho", expected: "header", hint: "Área superior com título" }
            ]
        },
        // Nível 2: FAQ Interativo (Ordem e Dicas Alteradas)
        {
            title: "FAQ Interativo",
            description: "Use detalhes expansíveis com título.",
            tags: ["header", "main", "section", "details", "summary", "footer"],
            layout: [
                { zone: "Expansível", expected: "details", hint: "Conteúdo oculto que pode ser expandido" },
                { zone: "Resumo", expected: "summary", hint: "Título da pergunta (cabeçalho do details)" },
                { zone: "Perguntas", expected: "section", hint: "Bloco de questões (agrupamento)" },
                { zone: "Principal", expected: "main", hint: "Área do conteúdo" },
                { zone: "Rodapé", expected: "footer", hint: "Links úteis" },
                { zone: "Cabeçalho", expected: "header", hint: "Título da seção" }
            ]
        },
        // Nível 3: Blog Técnico (Ordem e Dicas Alteradas)
        {
            title: "Blog Técnico",
            description: "Artigo com termos em destaque e áreas colapsáveis.",
            tags: ["header", "main", "article", "mark", "details", "summary", "footer"],
            layout: [
                { zone: "Termo Relevante", expected: "mark", hint: "Destaque no texto (realce)" },
                { zone: "Definição", expected: "details", hint: "Informações ocultas (expansível)" },
                { zone: "Título Definição", expected: "summary", hint: "Cabeçalho do colapso" },
                { zone: "Artigo", expected: "article", hint: "Conteúdo técnico (independente)" },
                { zone: "Principal", expected: "main", hint: "Área principal" },
                { zone: "Rodapé", expected: "footer", hint: "Referências" },
                { zone: "Topo", expected: "header", hint: "Nome do blog" }
            ]
        },
        // Nível 4: Artigo Expandido (Ordem e Dicas Alteradas)
        {
            title: "Artigo Expandido",
            description: "Conteúdo com imagens, autor, data e colapsos.",
            tags: ["header", "article", "figure", "address", "time", "details", "summary", "footer"],
            layout: [
                { zone: "Autor", expected: "address", hint: "Dados do autor" },
                { zone: "Data", expected: "time", hint: "Publicação" },
                { zone: "Conteúdo", expected: "article", hint: "Texto do artigo (independente)" },
                { zone: "Extras", expected: "details", hint: "Informações extras (colapsável)" },
                { zone: "Resumo", expected: "summary", hint: "Título do extra" },
                { zone: "Imagem", expected: "figure", hint: "Foto da matéria" },
                { zone: "Rodapé", expected: "footer", hint: "Links de leitura" },
                { zone: "Cabeçalho", expected: "header", hint: "Título do artigo" }
            ]
        },
        // Nível 5: Portal Interativo (Ordem e Dicas Alteradas)
        {
            title: "Portal Interativo",
            description: "Agrupe várias seções com recursos interativos.",
            tags: ["header", "section", "aside", "details", "summary", "footer"],
            layout: [
                { zone: "Dica Extra", expected: "aside", hint: "Informações laterais (secundário)" },
                { zone: "Leia Mais", expected: "details", hint: "Colapsável" },
                { zone: "Resumo", expected: "summary", hint: "Cabeçalho oculto" },
                { zone: "Seção A", expected: "section", hint: "Conteúdo agrupado" },
                { zone: "Rodapé", expected: "footer", hint: "Créditos" },
                { zone: "Topo", expected: "header", hint: "Nome do site" }
            ]
        },
        // Nível 6: Dicionário Web (Ordem e Dicas Alteradas)
        {
            title: "Dicionário Web",
            description: "Página com termos marcados e definições escondidas.",
            tags: ["main", "section", "article", "mark", "details", "summary", "footer"],
            layout: [
                { zone: "Termo 1", expected: "article", hint: "Definição individual (conteúdo independente)" },
                { zone: "Destaque", expected: "mark", hint: "Palavra importante (realce)" },
                { zone: "Detalhes", expected: "details", hint: "Mais informações (expansível)" },
                { zone: "Resumo", expected: "summary", hint: "Termo principal (cabeçalho do details)" },
                { zone: "Seção de Termos", expected: "section", hint: "Bloco de palavras (agrupamento)" },
                { zone: "Rodapé", expected: "footer", hint: "Fontes" },
                { zone: "Principal", expected: "main", hint: "Corpo do conteúdo" }
            ]
        },
        // Nível 7: Perfil Profissional (Ordem e Dicas Alteradas)
        {
            title: "Perfil Profissional",
            description: "Perfil com destaques, contatos e seções ocultas.",
            tags: ["header", "main", "address", "mark", "details", "summary", "footer"],
            layout: [
                { zone: "Contato", expected: "address", hint: "Informações diretas (e-mail, telefone)" },
                { zone: "Competência", expected: "mark", hint: "Habilidade em destaque (realce)" },
                { zone: "Certificados", expected: "details", hint: "Lista colapsável" },
                { zone: "Resumo do Certificado", expected: "summary", hint: "Nome do certificado (cabeçalho do details)" },
                { zone: "Resumo", expected: "main", hint: "Apresentação geral (conteúdo principal)" },
                { zone: "Rodapé", expected: "footer", hint: "Portfólio externo" },
                { zone: "Topo", expected: "header", hint: "Nome do profissional" }
            ]
        },
        // Nível 8: Tutorial Interativo (Ordem e Dicas Alteradas)
        {
            title: "Tutorial Interativo",
            description: "Use blocos de explicação colapsáveis e marcações.",
            tags: ["main", "section", "mark", "details", "summary", "footer"],
            layout: [
                { zone: "Destaque", expected: "mark", hint: "Ponto importante (realce)" },
                { zone: "Detalhes", expected: "details", hint: "Explicação extra (colapsável)" },
                { zone: "Resumo", expected: "summary", hint: "Título da explicação" },
                { zone: "Seção de Passos", expected: "section", hint: "Agrupamento de instruções" },
                { zone: "Rodapé", expected: "footer", hint: "Links de apoio" },
                { zone: "Principal", expected: "main", hint: "Corpo do tutorial" }
            ]
        },
        // Nível 9: Currículo Moderno (Ordem e Dicas Alteradas)
        {
            title: "Currículo Moderno",
            description: "Currículo com seções dobráveis e destaques.",
            tags: ["header", "main", "section", "mark", "details", "summary", "footer"],
            layout: [
                { zone: "Formação", expected: "section", hint: "Estudos (agrupamento)" },
                { zone: "Habilidade-chave", expected: "mark", hint: "Destaque (realce)" },
                { zone: "Histórico Profissional", expected: "details", hint: "Empregos anteriores (colapsável)" },
                { zone: "Empresa", expected: "summary", hint: "Nome da empresa (cabeçalho do details)" },
                { zone: "Apresentação", expected: "main", hint: "Resumo pessoal (conteúdo principal)" },
                { zone: "Rodapé", expected: "footer", hint: "Contato e links" },
                { zone: "Topo", expected: "header", hint: "Nome do candidato" }
            ]
        },
        // Nível 10: Enciclopédia Online (Ordem e Dicas Alteradas)
        {
            title: "Enciclopédia Online",
            description: "Crie uma entrada de enciclopédia com marcações e explicações ocultas.",
            tags: ["header", "main", "article", "mark", "details", "summary", "footer"],
            layout: [
                { zone: "Palavra-chave", expected: "mark", hint: "Termo importante (realce)" },
                { zone: "Mais informações", expected: "details", hint: "Expansível" },
                { zone: "Resumo", expected: "summary", hint: "Tópico extra (cabeçalho do details)" },
                { zone: "Entrada", expected: "article", hint: "Texto explicativo (conteúdo independente)" },
                { zone: "Principal", expected: "main", hint: "Área geral" },
                { zone: "Rodapé", expected: "footer", hint: "Referências bibliográficas" },
                { zone: "Cabeçalho", expected: "header", hint: "Nome do artigo" }
            ]
        }
    ],
    extreme: [
        // Nível 1: Site Complexo com Microdados (Ordem e Dicas Alteradas)
        {
            title: "Site Complexo com Microdados",
            description: "Combine tags semânticas com schema.org",
            tags: ["header", "main", "article", "section", "footer", "time", "address", "figure", "details", "summary", "mark", "nav", "aside"],
            layout: [
                { zone: "Menu Principal", expected: "nav", hint: "Links de navegação" },
                { zone: "Artigo", expected: "article", hint: "Conteúdo independente" },
                { zone: "Seção", expected: "section", hint: "Agrupamento temático" },
                { zone: "Data", expected: "time", hint: "Informação temporal" },
                { zone: "Autor", expected: "address", hint: "Informação de contato" },
                { zone: "Imagem", expected: "figure", hint: "Conteúdo multimídia" },
                { zone: "Detalhes", expected: "details", hint: "Widget expansível" },
                { zone: "Resumo", expected: "summary", hint: "Título do expansível" },
                { zone: "Destaque", expected: "mark", hint: "Texto marcado" },
                { zone: "Conteúdo", expected: "main", hint: "Conteúdo principal" },
                { zone: "Rodapé", expected: "footer", hint: "Informações finais" },
                { zone: "Cabeçalho", expected: "header", hint: "Área superior com título" }
            ]
        },
        // Nível 2: Aplicação Web Completa (Ordem e Dicas Alteradas)
        {
            title: "Aplicação Web Completa",
            description: "Estruture uma aplicação web complexa com todas as tags semânticas",
            tags: ["header", "nav", "main", "article", "section", "aside", "footer", "time", "address", "figure", "details", "summary", "mark"],
            layout: [
                { zone: "Menu Global", expected: "nav", hint: "Navegação principal" },
                { zone: "Barra Lateral", expected: "aside", hint: "Conteúdo relacionado" },
                { zone: "Data", expected: "time", hint: "Informação temporal" },
                { zone: "Contato", expected: "address", hint: "Informação de contato" },
                { zone: "Galeria", expected: "figure", hint: "Conteúdo multimídia" },
                { zone: "Detalhes", expected: "details", hint: "Widget expansível" },
                { zone: "Resumo", expected: "summary", hint: "Título do expansível" },
                { zone: "Artigo", expected: "article", hint: "Conteúdo independente" },
                { zone: "Seção", expected: "section", hint: "Agrupamento temático" },
                { zone: "Destaque", expected: "mark", hint: "Texto marcado" },
                { zone: "Conteúdo", expected: "main", hint: "Conteúdo principal" },
                { zone: "Rodapé", expected: "footer", hint: "Informações finais" },
                { zone: "Cabeçalho", expected: "header", hint: "Área superior com título" }
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