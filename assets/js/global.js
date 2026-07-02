/* ─── FUNCIONALIDADES GLOBAIS ──────────────────────────────────────────────── */

// Sistema de Traduções
const traducoes = {
    'pt-BR': {
        'inicio': 'Início',
        'sobre': 'Sobre nós',
        'feedback': 'Feedback',
        'radar': 'Radar de Preços',
        'perfil': 'Perfil',
        'configuracoes': 'Configurações',
        'buscar': 'BUSCAR',
        'salvar': 'Salvar alterações',
        'idioma': 'Idioma',
        'aparencia': 'Aparência',
        'cor_destaque': 'Cor de destaque',
        'animacoes': 'Animações',
        'animacoes_desc': 'Transições e efeitos de entrada nas páginas',
        'conta': 'Conta',
        'nome_exibicao': 'Nome de exibição',
        'email': 'E-mail',
        'senha': 'Senha',
        'alterar': 'Alterar',
        'toast_sucesso': 'Alterações salvas com sucesso!',
        'entrar': 'Entrar',
        'registrar': 'Registrar-se',
        'sobre_titulo': 'SOBRE O GAME SEARCH',
        'sobre_desc': 'A plataforma criada para ajudar jogadores a encontrar os melhores preços, promoções e oportunidades do mercado gamer.',
        'missao_titulo': 'Nossa Missão',
        'missao_desc': 'O Game Search foi criado para centralizar preços de jogos em diversas plataformas e facilitar a vida dos jogadores. Unimos tecnologia, design e dados para que você nunca perca uma oferta.',
        'historia_titulo': 'Nossa História',
        'historia_1': 'Início do projeto e concepção da ideia central.',
        'historia_2': 'Desenvolvimento do primeiro protótipo funcional.',
        'historia_3': 'Integração com as principais APIs de lojas de jogos.',
        'historia_4': 'Lançamento da versão oficial para a comunidade.',
        'porque_titulo': 'Por que criamos o Game Search',
        'feature_1_t': 'Economia Real',
        'feature_1_d': 'Encontre sempre o menor preço entre diversas lojas.',
        'feature_2_t': 'Comparação Rápida',
        'feature_2_d': 'Consulte várias plataformas em poucos segundos.',
        'feature_3_t': 'Histórico de Preços',
        'feature_3_d': 'Acompanhe a evolução dos valores ao longo do tempo.',
        'feature_4_t': 'Alertas Inteligentes',
        'feature_4_d': 'Receba notificações quando seu jogo favorito entrar em promoção.',
        'equipe_titulo': 'Equipe de Desenvolvimento',
        'equipe_1_d': 'Especialista em interfaces e experiência do usuário.',
        'equipe_2_d': 'Focada em design de interação e prototipagem.',
        'equipe_3_d': 'Responsável pela integração de dados e performance.',
        'tech_titulo': 'Tecnologias Utilizadas',
        'stats_titulo': 'Estatísticas',
        'stat_1': 'Jogos monitorados',
        'stat_2': 'Plataformas integradas',
        'stat_3': 'Pesquisas mensais',
        'stat_4': 'Monitoramento contínuo',
        'feedback_titulo': 'Sua Opinião Importa',
        'feedback_desc': 'Ajude-nos a melhorar o Game Search compartilhando suas sugestões ou relatando problemas.',
        'enviar_feedback': 'Enviar Feedback',
        'fb_nome': 'Nome (opcional)',
        'fb_email': 'E-mail (opcional)',
        'fb_tipo': 'Tipo de Feedback',
        'fb_sugestao': 'Sugestão',
        'fb_erro': 'Erro encontrado',
        'fb_elogio': 'Elogio',
        'fb_reclamacao': 'Reclamação',
        'fb_mensagem': 'Mensagem',
        'fb_avaliacao': 'Avaliação Geral',
        'relatar_problema': 'Relatar Problema',
        'relatar_desc': 'Selecione o tipo de problema encontrado:',
        'prob_1': 'Preço incorreto',
        'prob_2': 'Link quebrado',
        'prob_3': 'Loja não encontrada',
        'prob_4': 'Lentidão no site',
        'prob_5': 'Erro visual',
        'sugestoes_populares': 'Sugestões Populares',
        'sug_1': 'Alerta de queda de preço por e-mail',
        'sug_2': 'Comparação de edições (Deluxe/Gold)',
        'sug_3': 'Integração com biblioteca da Steam',
        'sug_4': 'Histórico de preços em gráfico',
        'sug_5': 'Filtro por região de loja',
        'nome_usuario': 'Nome do Usuário',
        'stat_jogos': 'Jogos',
        'stat_progresso': 'Progresso',
        'stat_conquistas': 'Conquistas',
        'meus_jogos': 'meus jogos',
        'desejos': 'desejos',
        'conquistas': 'conquistas'
    },
    'en': {
        'inicio': 'Home',
        'sobre': 'About us',
        'feedback': 'Feedback',
        'radar': 'Price Radar',
        'perfil': 'Profile',
        'configuracoes': 'Settings',
        'buscar': 'SEARCH',
        'salvar': 'Save changes',
        'idioma': 'Language',
        'aparencia': 'Appearance',
        'cor_destaque': 'Accent Color',
        'animacoes': 'Animations',
        'animacoes_desc': 'Transitions and entry effects on pages',
        'conta': 'Account',
        'nome_exibicao': 'Display name',
        'email': 'Email',
        'senha': 'Password',
        'alterar': 'Change',
        'toast_sucesso': 'Changes saved successfully!',
        'entrar': 'Login',
        'registrar': 'Register',
        'sobre_titulo': 'ABOUT GAME SEARCH',
        'sobre_desc': 'The platform created to help players find the best prices, promotions, and opportunities in the gaming market.',
        'missao_titulo': 'Our Mission',
        'missao_desc': 'Game Search was created to centralize game prices across various platforms and make life easier for players. We combine technology, design, and data so you never miss a deal.',
        'historia_titulo': 'Our History',
        'historia_1': 'Project start and core idea conception.',
        'historia_2': 'Development of the first functional prototype.',
        'historia_3': 'Integration with major game store APIs.',
        'historia_4': 'Official version launch for the community.',
        'porque_titulo': 'Why we created Game Search',
        'feature_1_t': 'Real Savings',
        'feature_1_d': 'Always find the lowest price among various stores.',
        'feature_2_t': 'Quick Comparison',
        'feature_2_d': 'Check multiple platforms in seconds.',
        'feature_3_t': 'Price History',
        'feature_3_d': 'Track price evolution over time.',
        'feature_4_t': 'Smart Alerts',
        'feature_4_d': 'Get notified when your favorite game goes on sale.',
        'equipe_titulo': 'Development Team',
        'equipe_1_d': 'Interface and user experience specialist.',
        'equipe_2_d': 'Focused on interaction design and prototyping.',
        'equipe_3_d': 'Responsible for data integration and performance.',
        'tech_titulo': 'Technologies Used',
        'stats_titulo': 'Statistics',
        'stat_1': 'Monitored games',
        'stat_2': 'Integrated platforms',
        'stat_3': 'Monthly searches',
        'stat_4': 'Continuous monitoring',
        'feedback_titulo': 'Your Opinion Matters',
        'feedback_desc': 'Help us improve Game Search by sharing your suggestions or reporting issues.',
        'enviar_feedback': 'Send Feedback',
        'fb_nome': 'Name (optional)',
        'fb_email': 'Email (optional)',
        'fb_tipo': 'Feedback Type',
        'fb_sugestao': 'Suggestion',
        'fb_erro': 'Error found',
        'fb_elogio': 'Compliment',
        'fb_reclamacao': 'Complaint',
        'fb_mensagem': 'Message',
        'fb_avaliacao': 'General Rating',
        'relatar_problema': 'Report an Issue',
        'relatar_desc': 'Select the type of issue found:',
        'prob_1': 'Incorrect price',
        'prob_2': 'Broken link',
        'prob_3': 'Store not found',
        'prob_4': 'Site slowness',
        'prob_5': 'Visual error',
        'sugestoes_populares': 'Popular Suggestions',
        'sug_1': 'Price drop alert by email',
        'sug_2': 'Edition comparison (Deluxe/Gold)',
        'sug_3': 'Steam library integration',
        'sug_4': 'Price history chart',
        'sug_5': 'Filter by store region',
        'nome_usuario': 'Username',
        'stat_jogos': 'Games',
        'stat_progresso': 'Progress',
        'stat_conquistas': 'Achievements',
        'meus_jogos': 'my games',
        'desejos': 'wishlist',
        'conquistas': 'achievements'
    },
    'es': {
        'inicio': 'Inicio',
        'sobre': 'Sobre nosotros',
        'feedback': 'Feedback',
        'radar': 'Radar de Precios',
        'perfil': 'Perfil',
        'configuracoes': 'Configuraciones',
        'buscar': 'BUSCAR',
        'salvar': 'Guardar cambios',
        'idioma': 'Idioma',
        'aparencia': 'Apariencia',
        'cor_destaque': 'Color de acento',
        'animacoes': 'Animaciones',
        'animacoes_desc': 'Transiciones y efectos de entrada en las páginas',
        'conta': 'Cuenta',
        'nome_exibicao': 'Nombre de mostrar',
        'email': 'Correo electrónico',
        'senha': 'Contraseña',
        'alterar': 'Cambiar',
        'toast_sucesso': '¡Cambios guardados con éxito!',
        'entrar': 'Entrar',
        'registrar': 'Registrarse',
        'sobre_titulo': 'SOBRE GAME SEARCH',
        'sobre_desc': 'La plataforma creada para ayudar a los jugadores a encontrar los mejores precios, promociones y oportunidades en el mercado de los videojuegos.',
        'missao_titulo': 'Nuestra Misión',
        'missao_desc': 'Game Search fue creado para centralizar los precios de los juegos en varias plataformas y facilitar la vida de los jugadores. Combinamos tecnología, diseño y datos para que nunca te pierdas una oferta.',
        'historia_titulo': 'Nuestra Historia',
        'historia_1': 'Inicio del proyecto y concepción de la idea central.',
        'historia_2': 'Desarrollo del primer prototipo funcional.',
        'historia_3': 'Integración con las principales API de tiendas de juegos.',
        'historia_4': 'Lanzamiento de la versión oficial para la comunidad.',
        'porque_titulo': 'Por qué creamos Game Search',
        'feature_1_t': 'Ahorro Real',
        'feature_1_d': 'Encuentra siempre el precio más bajo entre varias tiendas.',
        'feature_2_t': 'Comparación Rápida',
        'feature_2_d': 'Consulta múltiples plataformas en segundos.',
        'feature_3_t': 'Historial de Precios',
        'feature_3_d': 'Sigue la evolución de los precios a lo largo del tiempo.',
        'feature_4_t': 'Alertas Inteligentes',
        'feature_4_d': 'Recibe notificaciones cuando tu juego favorito entre en oferta.',
        'equipe_titulo': 'Equipo de Desarrollo',
        'equipe_1_d': 'Especialista en interfaces y experiencia de usuario.',
        'equipe_2_d': 'Enfocada en diseño de interacción y prototipado.',
        'equipe_3_d': 'Responsable de la integración de datos y rendimiento.',
        'tech_titulo': 'Tecnologías Utilizadas',
        'stats_titulo': 'Estadísticas',
        'stat_1': 'Juegos monitoreados',
        'stat_2': 'Plataformas integradas',
        'stat_3': 'Búsquedas mensuales',
        'stat_4': 'Monitoreo continuo',
        'feedback_titulo': 'Tu Opinión Importa',
        'feedback_desc': 'Ayúdanos a mejorar Game Search compartiendo tus sugerencias o informando problemas.',
        'enviar_feedback': 'Enviar Comentarios',
        'fb_nome': 'Nombre (opcional)',
        'fb_email': 'Correo electrónico (opcional)',
        'fb_tipo': 'Tipo de Comentario',
        'fb_sugestao': 'Sugerencia',
        'fb_erro': 'Error encontrado',
        'fb_elogio': 'Elogio',
        'fb_reclamacao': 'Reclamación',
        'fb_mensagem': 'Mensaje',
        'fb_avaliacao': 'Calificación General',
        'relatar_problema': 'Informar un Problema',
        'relatar_desc': 'Seleccione el tipo de problema encontrado:',
        'prob_1': 'Precio incorrecto',
        'prob_2': 'Enlace roto',
        'prob_3': 'Tienda no encontrada',
        'prob_4': 'Lentitud del sitio',
        'prob_5': 'Error visual',
        'sugestoes_populares': 'Sugerencias Populares',
        'sug_1': 'Alerta de caída de precio por correo',
        'sug_2': 'Comparación de ediciones (Deluxe/Gold)',
        'sug_3': 'Integración con biblioteca de Steam',
        'sug_4': 'Historial de precios en gráfico',
        'sug_5': 'Filtro por región de tienda',
        'nome_usuario': 'Nombre de Usuario',
        'stat_jogos': 'Juegos',
        'stat_progresso': 'Progreso',
        'stat_conquistas': 'Logros',
        'meus_jogos': 'mis juegos',
        'desejos': 'deseos',
        'conquistas': 'logros'
    },
};

const Preferencias = {
    aplicarTudo() {
        this.aplicarCor();
        this.aplicarAnimacoes();
        this.aplicarIdioma();
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

    aplicarIdioma() {
        const lang = localStorage.getItem('pref_idioma') || 'pt-BR';
        document.documentElement.lang = lang;
        
        // Aplicar traduções em elementos com data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const chave = el.dataset.i18n;
            if (traducoes[lang] && traducoes[lang][chave]) {
                if (el.tagName === 'INPUT' && el.placeholder) {
                    el.placeholder = traducoes[lang][chave];
                } else {
                    el.innerText = traducoes[lang][chave];
                }
            }
        });
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
// Mas precisamos que o body exista para as animações
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
                const termo = encodeURIComponent(campoBusca.value.trim());
                const base = document.querySelector('meta[name="base-path"]')?.content || '';
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

    /* ── Drawer da sidebar (mobile) ── */
    const sidebarDrawer = document.getElementById('sidebarDrawer');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const drawerOverlay = document.getElementById('drawerOverlay');

    if (sidebarDrawer && hamburgerBtn && drawerOverlay) {
        const abrirDrawer = () => {
            sidebarDrawer.classList.add('aberto');
            drawerOverlay.classList.add('ativo');
            drawerOverlay.style.display = 'block';
            hamburgerBtn.setAttribute('aria-expanded', 'true');
        };

        const fecharDrawer = () => {
            sidebarDrawer.classList.remove('aberto');
            drawerOverlay.classList.remove('ativo');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            setTimeout(() => {
                if (!drawerOverlay.classList.contains('ativo')) {
                    drawerOverlay.style.display = 'none';
                }
            }, 300);
        };

        hamburgerBtn.addEventListener('click', () => {
            const estaAberto = sidebarDrawer.classList.contains('aberto');
            estaAberto ? fecharDrawer() : abrirDrawer();
        });

        drawerOverlay.addEventListener('click', fecharDrawer);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebarDrawer.classList.contains('aberto')) {
                fecharDrawer();
            }
        });

        sidebarDrawer.querySelectorAll('.menu-navegacao a').forEach(link => {
            link.addEventListener('click', fecharDrawer);
        });
    }
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
