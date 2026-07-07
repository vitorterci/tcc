/* ─── HOME — CARROSSEL E FILTROS DE JOGOS ──────────────────────────────────── */

// ── Dados dos jogos (unificados) com novos campos ──────────────────────────
const listaDeJogos = [{
        id: 1,
        nome: "Minecraft",
        categoria: "indie",
        plataforma: "pc",
        genero: "sandbox",
        img: "https://st.perplexity.ai/estatic/0b226c450798410ac541646c86ec31afd840e5beab817a5d84fa821e7db61981ec84c3b4a3f072a7a2e1899c9fb06c6ee32ee51b7aa5df0a674cb1dd5564173b8403cd1fe49f606a7bca981a435a0298c0e277b3e347d804e1fd8f174238ecbabc0c67f9a4782a8581638776010f023d",
        etaria: "L",
        descricao: "Um jogo de sandbox 3D onde você pode construir, explorar e sobreviver em mundos infinitos.",
        status: "Disponível",
        ano: "2011",
        preco: 99.90
    },
    {
        id: 2,
        nome: "The Escapists",
        categoria: "estratégia",
        plataforma: "pc",
        genero: "estratégia",
        img: "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/4667cfa4-c112-5fc6-b1d1-cbe7296263eb/6efae07d-89a5-523e-a5bc-14061fbec762.jpg",
        etaria: "12",
        descricao: "Um jogo de estratégia onde você planeja e executa fugas de prisões de segurança máxima.",
        status: "Disponível",
        ano: "2015",
        preco: 49.90
    },
    {
        id: 3,
        nome: "Graveyard Keeper",
        categoria: "indie",
        plataforma: "pc",
        genero: "simulação",
        img: "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/90c33e3c-d87d-53a5-9b68-0867a7cb183a/08ff30ba-7935-5672-9aa3-bad3e2c747b4.jpg",
        etaria: "10",
        descricao: "Um simulador de gerenciamento de cemitério com um toque de humor negro.",
        status: "Disponível",
        ano: "2018",
        preco: 39.90
    },
    {
        id: 4,
        nome: "Towerborne",
        categoria: "ação",
        plataforma: "xbox",
        genero: "ação",
        img: "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/5734a2c4-a123-51ba-858d-fc6d6e14aee0/01a84265-e09c-5682-92ce-681c89a1afe2.jpg",
        etaria: "14",
        descricao: "Um jogo de ação e aventura cooperativo em um mundo de fantasia.",
        status: "Em breve",
        ano: "2024",
        preco: 199.90
    },
    {
        id: 5,
        nome: "Hades",
        categoria: "roguelike",
        plataforma: "pc",
        genero: "roguelike",
        img: "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/eb1817ed-c2a4-52ff-a973-8135cde6f11c/538ec15a-e39d-5044-a27e-87a3634539c4.jpg",
        etaria: "16",
        descricao: "Um jogo roguelike de ação aclamado pela crítica, ambientado no submundo grego.",
        status: "Disponível",
        ano: "2020",
        preco: 129.90
    },
    {
        id: 6,
        nome: "Stardew Valley",
        categoria: "indie",
        plataforma: "pc",
        genero: "simulação",
        img: "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/4c0c8a41-9b2a-5a16-9e23-4e8f377de3e5/2c8cafd4-f8ab-52f1-81ab-44c99cf03f5f.jpg",
        etaria: "L",
        descricao: "Um jogo de simulação de fazenda com elementos de RPG e exploração.",
        status: "Disponível",
        ano: "2016",
        preco: 29.99
    },
    {
        id: 7,
        nome: "Elden Ring",
        categoria: "rpg",
        plataforma: "ps5",
        genero: "ação",
        img: "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/eb1817ed-c2a4-52ff-a973-8135cde6f11c/538ec15a-e39d-5044-a27e-87a3634539c4.jpg",
        etaria: "18",
        descricao: "Um RPG de ação em mundo aberto desenvolvido pela FromSoftware.",
        status: "Disponível",
        ano: "2022",
        preco: 299.90
    },
    {
        id: 8,
        nome: "Baldur's Gate 3",
        categoria: "rpg",
        plataforma: "pc",
        genero: "rpg",
        img: "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/5734a2c4-a123-51ba-858d-fc6d6e14aee0/01a84265-e09c-5682-92ce-681c89a1afe2.jpg",
        etaria: "16",
        descricao: "Um RPG épico baseado no universo de Dungeons & Dragons.",
        status: "Disponível",
        ano: "2023",
        preco: 299.90
    },
    {
        id: 9,
        nome: "Stellar Blade",
        categoria: "ação",
        plataforma: "ps5",
        genero: "ação",
        img: "https://gmedia.playstation.com/is/image/SIEPDC/stellar-blade-hero-banner-desktop-01-en-12jan24?$1600px$",
        etaria: "18",
        descricao: "Um jogo de ação e aventura frenético com visuais deslumbrantes no PS5.",
        status: "Disponível",
        ano: "2024",
        preco: 349.90
    },
    {
        id: 10,
        nome: "Metaphor: ReFantazio",
        categoria: "rpg",
        plataforma: "pc",
        genero: "rpg",
        img: "https://metaphor.atlus.com/img/share.jpg",
        etaria: "14",
        descricao: "Um novo RPG de fantasia épica dos criadores de Persona.",
        status: "Disponível",
        ano: "2024",
        preco: 299.00
    },
    {
        id: 11,
        nome: "EA Sports CF 25",
        categoria: "esporte",
        plataforma: "ps5",
        genero: "esporte",
        img: "https://media.rawg.io/media/games/0bd/0bd564a39bc6275812e987747814639b.jpg",
        etaria: "L",
        descricao: "O retorno triunfante do futebol americano universitário aos consoles.",
        status: "Disponível",
        ano: "2024",
        preco: 349.90
    },
    {
        id: 12,
        nome: "Black Myth: Wukong",
        categoria: "ação",
        plataforma: "pc",
        genero: "ação",
        img: "https://media.rawg.io/media/games/60e/60ee69389334547b6781254687a4128b.jpg",
        etaria: "16",
        descricao: "RPG de ação baseado na mitologia chinesa 'Jornada ao Oeste'.",
        status: "Disponível",
        ano: "2024",
        preco: 229.00
    },
    {
        id: 13,
        nome: "Helldivers 2",
        categoria: "ação",
        plataforma: "pc",
        genero: "ação",
        img: "https://media.rawg.io/media/games/90b/90b9308269666014494a8e25048b3764.jpg",
        etaria: "18",
        descricao: "Lute pela liberdade em uma galáxia hostil neste shooter cooperativo.",
        status: "Disponível",
        ano: "2024",
        preco: 199.50
    },
    {
        id: 14,
        nome: "Tekken 8",
        categoria: "ação",
        plataforma: "ps5",
        genero: "ação",
        img: "https://media.rawg.io/media/games/f66/f663475f46487922d0590135898516e8.jpg",
        etaria: "14",
        descricao: "O próximo capítulo da lendária franquia de jogos de luta.",
        status: "Disponível",
        ano: "2024",
        preco: 349.90
    },
    {
        id: 15,
        nome: "Dragon's Dogma 2",
        categoria: "rpg",
        plataforma: "pc",
        genero: "rpg",
        img: "https://media.rawg.io/media/games/33d/33d73516087968516f461e8927878696.jpg",
        etaria: "18",
        descricao: "Uma jornada épica em um mundo de fantasia rico e detalhado.",
        status: "Disponível",
        ano: "2024",
        preco: 299.00
    },
    {
        id: 16,
        nome: "Final Fantasy VII Rebirth",
        categoria: "rpg",
        plataforma: "ps5",
        genero: "rpg",
        img: "https://media.rawg.io/media/games/287/2872161492061033621f379237649553.jpg",
        etaria: "14",
        descricao: "A continuação da épica releitura de Final Fantasy VII.",
        status: "Disponível",
        ano: "2024",
        preco: 349.90
    },
    {
        id: 17,
        nome: "Balatro",
        categoria: "indie",
        plataforma: "pc",
        genero: "roguelike",
        img: "https://media.rawg.io/media/games/0bd/0bd564a39bc6275812e987747814639b.jpg",
        etaria: "L",
        descricao: "Um roguelike de poker hipnótico e extremamente viciante.",
        status: "Disponível",
        ano: "2024",
        preco: 44.99
    },
    {
        id: 18,
        nome: "Zelda: Echoes of Wisdom",
        categoria: "aventura",
        plataforma: "switch",
        genero: "ação",
        img: "https://media.rawg.io/media/games/7c4/7c448208955140e9409895f3295f9c4f.jpg",
        etaria: "L",
        descricao: "Desta vez, Zelda assume o papel principal para salvar Hyrule.",
        status: "Disponível",
        ano: "2024",
        preco: 299.00
    },
    {
        id: 19,
        nome: "Silent Hill 2",
        categoria: "terror",
        plataforma: "pc",
        genero: "terror",
        img: "https://media.rawg.io/media/games/60e/60ee69389334547b6781254687a4128b.jpg",
        etaria: "18",
        descricao: "O remake aclamado do clássico de terror psicológico.",
        status: "Disponível",
        ano: "2024",
        preco: 349.50
    },
    {
        id: 20,
        nome: "Animal Crossing",
        categoria: "indie",
        plataforma: "switch",
        genero: "simulação",
        img: "https://media.rawg.io/media/games/858/85847668637777777777777777777777.jpg",
        etaria: "L",
        descricao: "Crie seu próprio paraíso em uma ilha deserta.",
        status: "Disponível",
        ano: "2020",
        preco: 299.00
    },
    {
        id: 21,
        nome: "Cyberpunk 2077",
        categoria: "rpg",
        plataforma: "pc",
        genero: "rpg",
        img: "https://media.rawg.io/media/games/26d/26d4437715bee6013893a79560309990.jpg",
        etaria: "18",
        descricao: "Um RPG de ação em mundo aberto ambientado na futurista Night City.",
        status: "Disponível",
        ano: "2020",
        preco: 199.90
    },
    {
        id: 22,
        nome: "God of War Ragnarök",
        categoria: "ação",
        plataforma: "ps5",
        genero: "ação",
        img: "https://media.rawg.io/media/games/709/709bf53f557babc90b7132a6771099c2.jpg",
        etaria: "18",
        descricao: "Kratos e Atreus devem viajar pelos nove reinos em busca de respostas.",
        status: "Disponível",
        ano: "2022",
        preco: 299.90
    },
    {
        id: 23,
        nome: "Forza Horizon 5",
        categoria: "esporte",
        plataforma: "xbox",
        genero: "esporte",
        img: "https://media.rawg.io/media/games/082/082365507c0422401a91e0ba83210f30.jpg",
        etaria: "L",
        descricao: "Sua aventura definitiva no Horizon espera por você nas paisagens do México.",
        status: "Disponível",
        ano: "2021",
        preco: 249.00
    },
    {
        id: 24,
        nome: "Sea of Thieves",
        categoria: "multiplayer",
        plataforma: "xbox",
        genero: "ação",
        img: "https://media.rawg.io/media/games/da1/da1b267761b77274020950348744576c.jpg",
        etaria: "12",
        descricao: "Seja o pirata que você sempre quis ser neste jogo de aventura em mundo compartilhado.",
        status: "Disponível",
        ano: "2018",
        preco: 149.00
    },
    {
        id: 25,
        nome: "It Takes Two",
        categoria: "aventura",
        plataforma: "pc",
        genero: "ação",
        img: "https://media.rawg.io/media/games/5eb/5eb49302c5c39b36c05156a090cbccd0.jpg",
        etaria: "12",
        descricao: "Uma aventura cooperativa inovadora e emocionante.",
        status: "Disponível",
        ano: "2021",
        preco: 199.00
    },
    {
        id: 26,
        nome: "Genshin Impact",
        categoria: "rpg",
        plataforma: "mobile",
        genero: "rpg",
        img: "https://media.rawg.io/media/games/d03/d030347839f7466ad90a947367460a72.jpg",
        etaria: "12",
        descricao: "Um RPG de ação em mundo aberto gratuito com um vasto mundo de fantasia.",
        status: "Disponível",
        ano: "2020",
        preco: 0.00
    },
    {
        id: 27,
        nome: "Among Us",
        categoria: "multiplayer",
        plataforma: "mobile",
        genero: "social",
        img: "https://media.rawg.io/media/games/e74/e7445c45df4057604a87c38300302839.jpg",
        etaria: "L",
        descricao: "Um jogo de trabalho em equipe e traição no espaço.",
        status: "Disponível",
        ano: "2018",
        preco: 0.00
    },
    {
        id: 28,
        nome: "Resident Evil Village",
        categoria: "terror",
        plataforma: "ps5",
        genero: "terror",
        img: "https://media.rawg.io/media/games/c05/c05359670081e626e386057283626786.jpg",
        etaria: "18",
        descricao: "Experimente o horror de sobrevivência como nunca antes no oitavo capítulo principal.",
        status: "Disponível",
        ano: "2021",
        preco: 179.90
    },
    {
        id: 29,
        nome: "Hollow Knight",
        categoria: "indie",
        plataforma: "pc",
        genero: "ação",
        img: "https://media.rawg.io/media/games/4cf/4cfc6b7f1850590c61f2216508f7f6c3.jpg",
        etaria: "10",
        descricao: "Uma aventura épica em um vasto reino em ruínas de insetos e heróis.",
        status: "Disponível",
        ano: "2017",
        preco: 27.99
    },
    {
        id: 30,
        nome: "Spider-Man 2",
        categoria: "ação",
        plataforma: "ps5",
        genero: "ação",
        img: "https://media.rawg.io/media/games/214/2143f71da0590135898516e8.jpg",
        etaria: "12",
        descricao: "Peter Parker e Miles Morales enfrentam o vilão Venom em Nova York.",
        status: "Disponível",
        ano: "2023",
        preco: 349.90
    },
    {
        id: 31,
        nome: "Starfield",
        categoria: "rpg",
        plataforma: "xbox",
        genero: "rpg",
        img: "https://media.rawg.io/media/games/5ec/5ec769389334547b6781254687a4128b.jpg",
        etaria: "14",
        descricao: "O primeiro novo universo em 25 anos da Bethesda Game Studios.",
        status: "Disponível",
        ano: "2023",
        preco: 299.00
    },
    {
        id: 32,
        nome: "Alan Wake 2",
        categoria: "terror",
        plataforma: "pc",
        genero: "terror",
        img: "https://media.rawg.io/media/games/618/618c201492061033621f379237649553.jpg",
        etaria: "18",
        descricao: "Um horror psicológico envolvente que continua a história do escritor Alan Wake.",
        status: "Disponível",
        ano: "2023",
        preco: 220.00
    },
    {
        id: 33,
        nome: "Cuphead",
        categoria: "indie",
        plataforma: "switch",
        genero: "ação",
        img: "https://media.rawg.io/media/games/225/225f7f1850590c61f2216508f7f6c3.jpg",
        etaria: "L",
        descricao: "Um jogo de ação clássico focado em batalhas de chefes com estilo de desenho animado.",
        status: "Disponível",
        ano: "2017",
        preco: 36.99
    },
    {
        id: 34,
        nome: "Roblox",
        categoria: "indie",
        plataforma: "mobile",
        genero: "social",
        img: "https://media.rawg.io/media/games/93e/93e69389334547b6781254687a4128b.jpg",
        etaria: "L",
        descricao: "A plataforma definitiva para criar e compartilhar experiências com amigos.",
        status: "Disponível",
        ano: "2006",
        preco: 0.00
    },
    {
        id: 35,
        nome: "FIFA 23",
        categoria: "esporte",
        plataforma: "ps5",
        genero: "esporte",
        img: "https://media.rawg.io/media/games/92b/92b9308269666014494a8e25048b3764.jpg",
        etaria: "L",
        descricao: "O jogo de futebol mais popular do mundo com tecnologias HyperMotion2.",
        status: "Disponível",
        ano: "2022",
        preco: 299.00
    },
    {
        id: 36,
        nome: "Call of Duty: MW III",
        categoria: "ação",
        plataforma: "pc",
        genero: "ação",
        img: "https://media.rawg.io/media/games/5ec/5ec769389334547b6781254687a4128b.jpg",
        etaria: "18",
        descricao: "A sequência direta do sucesso Modern Warfare II.",
        status: "Disponível",
        ano: "2023",
        preco: 299.00
    },
    {
        id: 37,
        nome: "The Witcher 3",
        categoria: "rpg",
        plataforma: "pc",
        genero: "rpg",
        img: "https://media.rawg.io/media/games/618/618c201492061033621f379237649553.jpg",
        etaria: "18",
        descricao: "Torne-se um caçador de monstros profissional e embarque em uma aventura épica.",
        status: "Disponível",
        ano: "2015",
        preco: 99.00
    },
    {
        id: 38,
        nome: "Red Dead Redemption 2",
        categoria: "ação",
        plataforma: "ps5",
        genero: "ação",
        img: "https://media.rawg.io/media/games/511/5118fa3f557babc90b7132a6771099c2.jpg",
        etaria: "18",
        descricao: "Uma história épica sobre a vida no impiedoso coração dos Estados Unidos.",
        status: "Disponível",
        ano: "2018",
        preco: 249.00
    },
    {
        id: 39,
        nome: "Grand Theft Auto V",
        categoria: "ação",
        plataforma: "pc",
        genero: "ação",
        img: "https://media.rawg.io/media/games/b11/b1155a3f557babc90b7132a6771099c2.jpg",
        etaria: "18",
        descricao: "Um jovem ladrão, um assaltante de bancos e um psicopata aterrorizante.",
        status: "Disponível",
        ano: "2013",
        preco: 69.90
    },
    {
        id: 40,
        nome: "Valorant",
        categoria: "multiplayer",
        plataforma: "pc",
        genero: "ação",
        img: "https://media.rawg.io/media/games/93e/93e69389334547b6781254687a4128b.jpg",
        etaria: "14",
        descricao: "Um jogo de tiro tático 5v5 baseado em personagens ambientado em um futuro próximo.",
        status: "Disponível",
        ano: "2020",
        preco: 0.00
    }
];

const gradeJogos = document.querySelector('.grade-jogos');
const campoBusca = document.querySelector('.campo-busca');
let categoriaAtiva = "todos";
let plataformaAtiva = "todos";
let generoAtivo = "todos";
let etariaAtiva = "todos";
let anoAtivo = "todos";
let precoAtivo = "todos";
let termoPesquisa = "";
let cardAberto = null;
let cliqueTimer = null;

// ── Função para formatar preço ───────────────────────────────────────────────
function formatarPreco(valor) {
    return valor.toFixed(2).replace('.', ',');
}

// ── Renderização de cards ────────────────────────────────────────────────────
function renderizarJogos(lista) {
    if (!gradeJogos) return;

    if (cardAberto) fecharCard(cardAberto);

    if (lista.length === 0) {
        gradeJogos.innerHTML = `
            <div style="grid-column:1/-1; text-align:center; padding:40px 20px; color: var(--cor-texto-muted);">
                <i class="fas fa-search" style="font-size:2rem; margin-bottom:12px; display:block; color:var(--cor-primaria);"></i>
                <p style="font-family:var(--font-titulo); letter-spacing:0.1em;">Nenhum jogo encontrado.</p>
            </div>`;
        return;
    }

    gradeJogos.innerHTML = lista.map((jogo, i) => {
        let precoClasse = '';
        let precoTexto = '';
        if (jogo.preco === 0) {
            precoClasse = 'gratis';
            precoTexto = 'Grátis';
        } else if (jogo.preco <= 50) {
            precoClasse = 'baixo';
            precoTexto = `R$ ${formatarPreco(jogo.preco)}`;
        } else if (jogo.preco <= 150) {
            precoClasse = 'medio';
            precoTexto = `R$ ${formatarPreco(jogo.preco)}`;
        } else {
            precoClasse = 'alto';
            precoTexto = `R$ ${formatarPreco(jogo.preco)}`;
        }

        return `
        <article 
            class="card-jogo animar-entrada" 
            data-id="${jogo.id}"
            style="animation-delay:${i * 0.06}s"
        >
            <div class="card-jogo-sidebar">
                <img 
                    src="${jogo.img}" 
                    alt="${jogo.nome}" 
                    loading="lazy"
                    onerror="this.src='assets/img/naoencontrada.png'"
                >
                <span class="badge-etaria etaria-${jogo.etaria || 'L'}">${jogo.etaria || 'L'}</span>
            </div>
            
            <div class="card-jogo-content">
                <h2 class="card-jogo-titulo">${jogo.nome}</h2>
                <p class="card-jogo-descricao">${jogo.descricao}</p>
                
                <div class="card-jogo-info">
                    <span class="info-tag"><i class="fas fa-tag"></i> ${jogo.categoria}</span>
                    <span class="info-tag"><i class="fas fa-gamepad"></i> ${jogo.genero}</span>
                    <span class="info-tag"><i class="fas fa-desktop"></i> ${jogo.plataforma}</span>
                    <span class="info-tag"><i class="fas fa-shield-alt"></i> ${jogo.etaria}</span>
                    <span class="info-tag"><i class="fas fa-calendar"></i> ${jogo.ano}</span>
                    <span class="info-tag info-preco ${precoClasse}">
                        <i class="fas fa-dollar-sign"></i> ${precoTexto}
                    </span>
                    <span class="info-tag info-status ${jogo.status === 'Disponível' ? 'status-disponivel' : 'status-em-breve'}">
                        <i class="fas fa-circle"></i> ${jogo.status}
                    </span>
                </div>
                
                <button class="botao-detalhes" data-id="${jogo.id}">
                    <i class="fas fa-chevron-right"></i> Ver detalhes
                </button>
            </div>
        </article>
    `
    }).join('');

    adicionarEventosCards();
}

function adicionarEventosCards() {
    document.querySelectorAll('.card-jogo').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.botao-detalhes')) return;

            const id = parseInt(card.dataset.id);
            const jogo = listaDeJogos.find(j => j.id === id);
            if (!jogo) return;

            if (cliqueTimer) {
                clearTimeout(cliqueTimer);
                cliqueTimer = null;
                window.location.href = `pages/pagina.html?id=${id}`;
            } else {
                cliqueTimer = setTimeout(() => {
                    cliqueTimer = null;
                    toggleCard(card);
                }, 250);
            }
        });

        const botaoDetalhes = card.querySelector('.botao-detalhes');
        if (botaoDetalhes) {
            botaoDetalhes.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(card.dataset.id);
                window.location.href = `pages/pagina.html?id=${id}`;
            });
        }
    });
}

// ── Funções de Expansão do Card ─────────────────────────────────────────────
function toggleCard(card) {
    if (cardAberto === card) {
        fecharCard(card);
    } else {
        if (cardAberto) fecharCard(cardAberto);
        abrirCard(card);
    }
}

function abrirCard(card) {
    card.classList.add('open');
    cardAberto = card;
}

function fecharCard(card) {
    card.classList.remove('open');
    if (cardAberto === card) {
        cardAberto = null;
    }
}

// ── Função para resetar um filtro específico ────────────────────────────────
function resetarFiltro(menuId) {
    const menu = document.getElementById(menuId);
    if (!menu) return;

    // Encontra a opção "todos" e a seleciona
    const opcaoTodos = menu.querySelector('.opcao-filtro[data-filtro="todos"]');
    if (opcaoTodos) {
        // Remove seleção de todas as opções
        menu.querySelectorAll('.opcao-filtro').forEach(o => o.classList.remove('selecionada'));
        // Marca "todos" como selecionado
        opcaoTodos.classList.add('selecionada');

        // Atualiza a variável correspondente
        const valor = opcaoTodos.dataset.filtro;
        if (menuId === 'menu-categorias') categoriaAtiva = valor;
        if (menuId === 'menu-plataforma') plataformaAtiva = valor;
        if (menuId === 'menu-genero') generoAtivo = valor;
        if (menuId === 'menu-etaria') etariaAtiva = valor;
        if (menuId === 'menu-ano') anoAtivo = valor;
        if (menuId === 'menu-preco') precoAtivo = valor;

        aplicarFiltros();

        // Remove a classe 'ativo' do botão principal correspondente
        const botaoPrincipal = document.querySelector(`.botao-filtro-principal[data-menu="${menuId}"]`);
        if (botaoPrincipal) {
            botaoPrincipal.classList.remove('ativo');
        }
    }

    // Fecha o menu
    menu.classList.remove('show');
}

function aplicarFiltros() {
    const jogosFiltrados = listaDeJogos.filter(jogo => {
        const cat = categoriaAtiva === "todos" || jogo.categoria === categoriaAtiva;
        const plat = plataformaAtiva === "todos" || jogo.plataforma === plataformaAtiva;
        const gen = generoAtivo === "todos" || jogo.genero === generoAtivo;
        const eta = etariaAtiva === "todos" || jogo.etaria === etariaAtiva;
        const ano = anoAtivo === "todos" || jogo.ano === anoAtivo;

        let precoMatch = true;
        if (precoAtivo !== "todos") {
            switch (precoAtivo) {
                case "gratis":
                    precoMatch = jogo.preco === 0;
                    break;
                case "baixo":
                    precoMatch = jogo.preco > 0 && jogo.preco <= 50;
                    break;
                case "medio":
                    precoMatch = jogo.preco > 50 && jogo.preco <= 150;
                    break;
                case "alto":
                    precoMatch = jogo.preco > 150;
                    break;
                default:
                    precoMatch = true;
            }
        }

        const bus = jogo.nome.toLowerCase().includes(termoPesquisa.toLowerCase());
        return cat && plat && gen && eta && ano && precoMatch && bus;
    });
    renderizarJogos(jogosFiltrados);

    // Atualiza o estado dos botões principais
    atualizarBotoesFiltro();
}

// ── Função para atualizar indicadores de filtro ativo ──────────────────────
function atualizarBotoesFiltro() {
    const filtros = {
        'menu-categorias': categoriaAtiva,
        'menu-plataforma': plataformaAtiva,
        'menu-genero': generoAtivo,
        'menu-etaria': etariaAtiva,
        'menu-ano': anoAtivo,
        'menu-preco': precoAtivo
    };

    Object.keys(filtros).forEach(menuId => {
        const botao = document.querySelector(`.botao-filtro-principal[data-menu="${menuId}"]`);
        if (botao) {
            if (filtros[menuId] !== 'todos') {
                botao.classList.add('ativo');
            } else {
                botao.classList.remove('ativo');
            }
        }
    });
}

// ── Busca ────────────────────────────────────────────────────────────────────
if (campoBusca) {
    campoBusca.addEventListener('input', () => {
        termoPesquisa = campoBusca.value;
        aplicarFiltros();
    });
}

// ── Eventos de Filtro ────────────────────────────────────────────────────────
document.querySelectorAll('.botao-filtro-principal').forEach(botao => {
    botao.addEventListener('click', e => {
        e.stopPropagation();
        const menuId = botao.dataset.menu;
        const menu = document.getElementById(menuId);

        document.querySelectorAll('.menu-flutuante.show').forEach(m => {
            if (m !== menu) m.classList.remove('show');
        });

        if (menu) menu.classList.toggle('show');
    });
});

// ── Eventos dos botões de reset ─────────────────────────────────────────────
document.querySelectorAll('.btn-reset-filtro').forEach(btn => {
    btn.addEventListener('click', e => {
        e.stopPropagation();
        const menuId = btn.dataset.menu;
        resetarFiltro(menuId);
    });
});

// ── Eventos das opções de filtro ─────────────────────────────────────────────
document.querySelectorAll('.opcao-filtro[data-filtro]').forEach(opcao => {
    opcao.addEventListener('click', e => {
        e.stopPropagation();
        const grupo = opcao.closest('.menu-flutuante').id;
        const valor = opcao.dataset.filtro;

        document.querySelectorAll(`#${grupo} .opcao-filtro`).forEach(o => o.classList.remove('selecionada'));
        opcao.classList.add('selecionada');

        if (grupo === 'menu-categorias') categoriaAtiva = valor;
        if (grupo === 'menu-plataforma') plataformaAtiva = valor;
        if (grupo === 'menu-genero') generoAtivo = valor;
        if (grupo === 'menu-etaria') etariaAtiva = valor;
        if (grupo === 'menu-ano') anoAtivo = valor;
        if (grupo === 'menu-preco') precoAtivo = valor;

        aplicarFiltros();
        opcao.closest('.menu-flutuante').classList.remove('show');
    });
});

document.addEventListener('click', () => {
    document.querySelectorAll('.menu-flutuante.show').forEach(m => m.classList.remove('show'));
});

// ── Carrossel ────────────────────────────────────────────────────────────────
(function iniciarCarrossel() {
    const track = document.getElementById('carouselTrack');
    const indicadores = document.getElementById('carouselIndicators');
    if (!track || !indicadores) return;

    const slides = track.querySelectorAll('.carousel-slide');
    const total = slides.length;
    const DURACAO = 5000;
    let atual = 0;
    let intervalo = null;

    slides.forEach((_, i) => {
        const btn = document.createElement('button');
        btn.className = 'carousel-indicator' + (i === 0 ? ' ativo' : '');
        btn.addEventListener('click', () => irPara(i));
        indicadores.appendChild(btn);
    });

    function irPara(idx) {
        atual = (idx + total) % total;
        track.style.transform = `translateX(-${atual * 100}%)`;
        document.querySelectorAll('.carousel-indicator').forEach((b, i) => {
            b.classList.toggle('ativo', i === atual);
        });
        reiniciarIntervalo();
    }

    function avancar() { irPara(atual + 1); }

    function reiniciarIntervalo() {
        clearInterval(intervalo);
        intervalo = setInterval(avancar, DURACAO);
    }

    reiniciarIntervalo();
})();

// ── Renderização inicial ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    aplicarFiltros();
});