/* ─── HOME — CARROSSEL E FILTROS DE JOGOS ──────────────────────────────────── */

// ── Dados dos jogos (unificados) ─────────────────────────────────────────────
const listaDeJogos = [
    { id: 1, nome: "Minecraft", categoria: "indie", plataforma: "pc", genero: "sandbox", img: "https://st.perplexity.ai/estatic/0b226c450798410ac541646c86ec31afd840e5beab817a5d84fa821e7db61981ec84c3b4a3f072a7a2e1899c9fb06c6ee32ee51b7aa5df0a674cb1dd5564173b8403cd1fe49f606a7bca981a435a0298c0e277b3e347d804e1fd8f174238ecbabc0c67f9a4782a8581638776010f023d", etaria: "L", descricao: "Um jogo de sandbox 3D onde você pode construir, explorar e sobreviver em mundos infinitos.", status: "Disponível" },
    { id: 2, nome: "The Escapists", categoria: "estratégia", plataforma: "pc", genero: "estratégia", img: "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/4667cfa4-c112-5fc6-b1d1-cbe7296263eb/6efae07d-89a5-523e-a5bc-14061fbec762.jpg", etaria: "12", descricao: "Um jogo de estratégia onde você planeja e executa fugas de prisões de segurança máxima.", status: "Disponível" },
    { id: 3, nome: "Graveyard Keeper", categoria: "indie", plataforma: "pc", genero: "simulação", img: "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/90c33e3c-d87d-53a5-9b68-0867a7cb183a/08ff30ba-7935-5672-9aa3-bad3e2c747b4.jpg", etaria: "10", descricao: "Um simulador de gerenciamento de cemitério com um toque de humor negro.", status: "Disponível" },
    { id: 4, nome: "Towerborne", categoria: "ação", plataforma: "xbox", genero: "ação", img: "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/5734a2c4-a123-51ba-858d-fc6d6e14aee0/01a84265-e09c-5682-92ce-681c89a1afe2.jpg", etaria: "14", descricao: "Um jogo de ação e aventura cooperativo em um mundo de fantasia.", status: "Em breve" },
    { id: 5, nome: "Hades", categoria: "roguelike", plataforma: "pc", genero: "roguelike", img: "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/eb1817ed-c2a4-52ff-a973-8135cde6f11c/538ec15a-e39d-5044-a27e-87a3634539c4.jpg", etaria: "16", descricao: "Um jogo roguelike de ação aclamado pela crítica, ambientado no submundo grego.", status: "Disponível" },
];

const gradeJogos = document.querySelector('.grade-jogos');
const campoBusca = document.querySelector('.campo-busca');
let categoriaAtiva = "todos";
let plataformaAtiva = "todos";
let generoAtivo = "todos";
let termoPesquisa = "";
let cardAberto = null; // Referência ao card atualmente expandido
let cliqueTimer = null;

// ── Renderização de cards ────────────────────────────────────────────────────
function renderizarJogos(lista) {
    if (!gradeJogos) return;

    // Fechar card aberto se houver
    if (cardAberto) fecharCard(cardAberto);

    if (lista.length === 0) {
        gradeJogos.innerHTML = `
            <div style="grid-column:1/-1; text-align:center; padding:40px 20px; color: var(--cor-texto-muted);">
                <i class="fas fa-search" style="font-size:2rem; margin-bottom:12px; display:block; color:var(--cor-primaria);"></i>
                <p style="font-family:var(--font-titulo); letter-spacing:0.1em;">Nenhum jogo encontrado.</p>
            </div>`;
        return;
    }

    gradeJogos.innerHTML = lista.map((jogo, i) => `
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
                    <span class="info-tag info-status ${jogo.status === 'Disponível' ? 'status-disponivel' : 'status-em-breve'}">
                        <i class="fas fa-circle"></i> ${jogo.status}
                    </span>
                </div>
                
                <button class="botao-detalhes" data-id="${jogo.id}">
                    <i class="fas fa-chevron-right"></i> Ver detalhes
                </button>
            </div>
        </article>
    `).join('');

    adicionarEventosCards();
}

function adicionarEventosCards() {
    document.querySelectorAll('.card-jogo').forEach(card => {
        // Clique no card (expansão)
        card.addEventListener('click', (e) => {
            // Ignora se clicou no botão de detalhes
            if (e.target.closest('.botao-detalhes')) return;

            const id = parseInt(card.dataset.id);
            const jogo = listaDeJogos.find(j => j.id === id);
            if (!jogo) return;

            if (cliqueTimer) {
                clearTimeout(cliqueTimer);
                cliqueTimer = null;
                // Clique Duplo - Navega para página de detalhes
                window.location.href = `pages/pagina.html?id=${id}`;
            } else {
                cliqueTimer = setTimeout(() => {
                    cliqueTimer = null;
                    // Clique Único - Abre/Fecha card
                    toggleCard(card);
                }, 250);
            }
        });

        // Evento para o botão "Ver detalhes"
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

function aplicarFiltros() {
    const jogosFiltrados = listaDeJogos.filter(jogo => {
        const cat = categoriaAtiva === "todos" || jogo.categoria === categoriaAtiva;
        const plat = plataformaAtiva === "todos" || jogo.plataforma === plataformaAtiva;
        const gen = generoAtivo === "todos" || jogo.genero === generoAtivo;
        const bus = jogo.nome.toLowerCase().includes(termoPesquisa.toLowerCase());
        return cat && plat && gen && bus;
    });
    renderizarJogos(jogosFiltrados);
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