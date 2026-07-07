/**
 * Gerenciamento da página de Login e Cadastro
 * Responsável pela animação de transição entre os formulários e filtros
 */

// Variáveis de estado dos filtros
let filtroEtariaAtivo = 'todos';
let filtroAnoAtivo = 'todos';
let filtroPrecoAtivo = 'todos';

document.addEventListener('DOMContentLoaded', () => {
    const botaoRegistrar = document.getElementById('registrar');
    const botaoLogar = document.getElementById('logar');
    const containerAutenticacao = document.getElementById('autenticacao');

    // Elementos para versão mobile
    const linkIrParaCadastro = document.getElementById('ir-para-cadastro');
    const linkIrParaLogin = document.getElementById('ir-para-login');

    /**
     * Ativa o modo de cadastro (animação para a direita)
     */
    const ativarCadastro = () => {
        if (containerAutenticacao) containerAutenticacao.classList.add('ativo');
    };

    /**
     * Ativa o modo de login (animação para a esquerda)
     */
    const ativarLogin = () => {
        if (containerAutenticacao) containerAutenticacao.classList.remove('ativo');
    };

    // Eventos para desktop (painel deslizante)
    if (botaoRegistrar) {
        botaoRegistrar.addEventListener('click', ativarCadastro);
    }

    if (botaoLogar) {
        botaoLogar.addEventListener('click', ativarLogin);
    }

    // Eventos para mobile (links simples)
    if (linkIrParaCadastro) {
        linkIrParaCadastro.addEventListener('click', (e) => {
            e.preventDefault();
            ativarCadastro();
        });
    }

    if (linkIrParaLogin) {
        linkIrParaLogin.addEventListener('click', (e) => {
            e.preventDefault();
            ativarLogin();
        });
    }

    // Validação básica de formulário (apenas visual)
    const formularios = document.querySelectorAll('.formulario');
    formularios.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const tipo = form.classList.contains('formulario--login') ? 'Login' : 'Cadastro';
            console.log(`${tipo} submetido com sucesso!`);
        });
    });

    // Eventos de Filtro
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

            if (grupo === 'menu-etaria') filtroEtariaAtivo = valor;
            if (grupo === 'menu-ano') filtroAnoAtivo = valor;
            if (grupo === 'menu-preco') filtroPrecoAtivo = valor;

            console.log(`Filtros ativos: Etária=${filtroEtariaAtivo}, Ano=${filtroAnoAtivo}, Preço=${filtroPrecoAtivo}`);
            opcao.closest('.menu-flutuante').classList.remove('show');
        });
    });

    document.addEventListener('click', () => {
        document.querySelectorAll('.menu-flutuante.show').forEach(m => m.classList.remove('show'));
    });
});
