/* ─── FUNCIONALIDADES GLOBAIS ──────────────────────────────────────────────── */

const Preferencias = {
    aplicarTudo() {
        this.aplicarCor();
        this.aplicarAnimacoes();
    },

    aplicarCor() {
        const cor = localStorage.getItem('pref_cor') || '#2e00e6';
        document.documentElement.style.setProperty('--cor-primaria', cor);
        const rgb = this.hexToRgb(cor);
        if (rgb) {
            const rgbStr = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
            document.documentElement.style.setProperty('--cor-primaria-rgb', rgbStr);
            document.documentElement.style.setProperty('--shadow-glow', `0 0 20px rgba(${rgbStr}, 0.25)`);
            document.documentElement.style.setProperty('--shadow-glow-hover', `0 0 35px rgba(${rgbStr}, 0.45)`);
        }
    },

    aplicarAnimacoes() {
        const animacoesAtivas = localStorage.getItem('pref_animacoes') !== 'false';
        if (!animacoesAtivas) {
            document.body.classList.add('sem-animacoes');
        } else {
            document.body.classList.remove('sem-animacoes');
        }
    },

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
};

// Executar aplicação de preferências imediatamente para evitar FOUC (Flash of Unstyled Content)
if (document.body) {
    Preferencias.aplicarTudo();
} else {
    document.addEventListener('DOMContentLoaded', () => Preferencias.aplicarTudo());
}

document.addEventListener('DOMContentLoaded', () => {

    /* ── Busca global ── */
    const campoBusca = document.querySelector('.campo-busca');
    if (campoBusca) {
        campoBusca.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && campoBusca.value.trim()) {
                const termo = encodeURIComponent(campoBusca.value);
                const base = window.location.pathname.includes('/pages/') ? '../' : '';
                window.location.href = `${base}index.html?busca=${termo}`;
            }
        });
    }

    /* ── Marcar item ativo na sidebar ── */
    const paginaAtual = decodeURIComponent(window.location.pathname.split('/').pop() || 'index.html');
    document.querySelectorAll('.menu-navegacao li').forEach(li => li.classList.remove('ativo'));
    document.querySelectorAll('.menu-navegacao li a').forEach(link => {
        const href = decodeURIComponent(link.getAttribute('href')?.split('/').pop() || '');
        if (href === paginaAtual) {
            link.closest('li')?.classList.add('ativo');
        }
    });

    /* ── Animar entradas de cards ── */
    const observador = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animar-entrada');
                observador.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card-jogo, .item-jogo-perfil, .card').forEach(el => {
        observador.observe(el);
    });

    /* ── Sidebar retrátil com persistência ── */
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const corpo = document.body;

    // Função para aplicar o estado da sidebar
    const aplicarEstadoSidebar = (estaFechada) => {
        const ehMobile = window.innerWidth <= 1024;
        
        if (estaFechada) {
            corpo.classList.add('sidebar-fechada');
            hamburgerBtn?.setAttribute('aria-expanded', 'false');
            
            if (ehMobile) {
                drawerOverlay?.classList.remove('ativo');
                setTimeout(() => {
                    if (drawerOverlay && !drawerOverlay.classList.contains('ativo')) {
                        drawerOverlay.style.display = 'none';
                    }
                }, 300);
            }
        } else {
            corpo.classList.remove('sidebar-fechada');
            hamburgerBtn?.setAttribute('aria-expanded', 'true');
            
            if (ehMobile) {
                if (drawerOverlay) {
                    drawerOverlay.style.display = 'block';
                    // Pequeno delay para a transição de opacidade
                    setTimeout(() => drawerOverlay.classList.add('ativo'), 10);
                }
            }
        }
        localStorage.setItem('sidebar_fechada', estaFechada);
    };

    // Inicializar estado baseado no localStorage
    const estadoSalvo = localStorage.getItem('sidebar_fechada') === 'true';
    
    // No mobile, sempre começar fechada por padrão se não houver estado salvo
    const ehMobile = window.innerWidth <= 1024;
    if (localStorage.getItem('sidebar_fechada') === null && ehMobile) {
        aplicarEstadoSidebar(true);
    } else {
        aplicarEstadoSidebar(estadoSalvo);
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            const estaFechada = corpo.classList.contains('sidebar-fechada');
            aplicarEstadoSidebar(!estaFechada);
        });
    }

    if (drawerOverlay) {
        drawerOverlay.addEventListener('click', () => aplicarEstadoSidebar(true));
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !corpo.classList.contains('sidebar-fechada') && window.innerWidth <= 1024) {
            aplicarEstadoSidebar(true);
        }
    });

    // Fechar ao clicar em links no mobile
    document.querySelectorAll('.barra-lateral .menu-navegacao a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                aplicarEstadoSidebar(true);
            }
        });
    });
});

/* ── Cards Expansíveis ── */
function inicializarCardsExpansiveis() {
    const cards = document.querySelectorAll('.card-expansivel');
    cards.forEach(card => {
        const cabecalho = card.querySelector('.cabecalho-expansivel') || card;
        cabecalho.addEventListener('click', () => {
            card.classList.toggle('expandido');
            
            // Acessibilidade
            const expandido = card.classList.contains('expandido');
            cabecalho.setAttribute('aria-expanded', expandido);
        });
    });
}

// Inicializar após o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
    inicializarCardsExpansiveis();
});
