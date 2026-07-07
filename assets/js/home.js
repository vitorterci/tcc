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