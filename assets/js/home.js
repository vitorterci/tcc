/* ─── HOME — CARROSSEL E FILTROS DE JOGOS ──────────────────────────────────── */

// ── Dados dos jogos (unificados) ──────────────────────────
let listaDeJogos = [];

// Função para carregar jogos do backend MySQL
async function carregarJogos() {
    try {
        const response = await fetch('http://localhost/php_backend/games.php');
        listaDeJogos = await response.json();
        aplicarFiltros();
    } catch (error) {
        console.error('Erro ao carregar jogos:', error);
        // Fallback para uma lista vazia se o servidor falhar
        listaDeJogos = [];
        aplicarFiltros();
    }
}

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
    if (typeof valor === 'string') valor = parseFloat(valor);
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
        const precoNum = typeof jogo.preco === 'string' ? parseFloat(jogo.preco) : jogo.preco;

        if (precoNum === 0) {
            precoClasse = 'gratis';
            precoTexto = 'Grátis';
        } else if (precoNum <= 50) {
            precoClasse = 'baixo';
            precoTexto = `R$ ${formatarPreco(precoNum)}`;
        } else if (precoNum <= 150) {
            precoClasse = 'medio';
            precoTexto = `R$ ${formatarPreco(precoNum)}`;
        } else {
            precoClasse = 'alto';
            precoTexto = `R$ ${formatarPreco(precoNum)}`;
        }

        return `
        <article 
            class="card-jogo animar-entrada" 
            data-id="${jogo.id}"
            style="animation-delay:${i * 0.08}s"
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

    const opcaoTodos = menu.querySelector('.opcao-filtro[data-filtro="todos"]');
    if (opcaoTodos) {
        menu.querySelectorAll('.opcao-filtro').forEach(o => o.classList.remove('selecionada'));
        opcaoTodos.classList.add('selecionada');

        const valor = opcaoTodos.dataset.filtro;
        if (menuId === 'menu-categorias') categoriaAtiva = valor;
        if (menuId === 'menu-plataforma') plataformaAtiva = valor;
        if (menuId === 'menu-genero') generoAtivo = valor;
        if (menuId === 'menu-etaria') etariaAtiva = valor;
        if (menuId === 'menu-ano') anoAtivo = valor;
        if (menuId === 'menu-preco') precoAtivo = valor;

        aplicarFiltros();

        const botaoPrincipal = document.querySelector(`.botao-filtro-principal[data-menu="${menuId}"]`);
        if (botaoPrincipal) {
            botaoPrincipal.classList.remove('ativo');
        }
    }
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
        const precoNum = typeof jogo.preco === 'string' ? parseFloat(jogo.preco) : jogo.preco;
        if (precoAtivo !== "todos") {
            switch (precoAtivo) {
                case "gratis":
                    precoMatch = precoNum === 0;
                    break;
                case "baixo":
                    precoMatch = precoNum > 0 && precoNum <= 50;
                    break;
                case "medio":
                    precoMatch = precoNum > 50 && precoNum <= 150;
                    break;
                case "alto":
                    precoMatch = precoNum > 150;
                    break;
                default:
                    precoMatch = true;
            }
        }

        const bus = jogo.nome.toLowerCase().includes(termoPesquisa.toLowerCase());
        return cat && plat && gen && eta && ano && precoMatch && bus;
    });
    renderizarJogos(jogosFiltrados);
    atualizarBotoesFiltro();
}

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

document.querySelectorAll('.btn-reset-filtro').forEach(btn => {
    btn.addEventListener('click', e => {
        e.stopPropagation();
        const menuId = btn.dataset.menu;
        resetarFiltro(menuId);
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
    carregarJogos();
});
