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

    // Integração com o Backend MySQL via Fetch API
    const formCadastro = document.getElementById('formulario-cadastro');
    const formLogin = document.getElementById('formulario-login');

    if (formCadastro) {
        formCadastro.addEventListener('submit', async (e) => {
            e.preventDefault();
            const campos = formCadastro.querySelectorAll('.formulario__campo');
            const nome = campos[0].value;
            const email = campos[2].value;
            const senha = campos[3].value;
            const confirmarSenha = campos[4].value;

            if (senha !== confirmarSenha) {
                alert('As senhas não coincidem!');
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/usuarios/registrar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nome, email, senha })
                });
                const data = await response.json();
                alert(data.message);
                if (data.message === "Você foi registrado com sucesso!") {
                    ativarLogin();
                }
            } catch (error) {
                console.error('Erro ao registrar:', error);
                alert('Erro ao conectar com o servidor.');
            }
        });
    }

    if (formLogin) {
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault();
            const campos = formLogin.querySelectorAll('.formulario__campo');
            const email = campos[0].value;
            const senha = campos[1].value;

            try {
                const response = await fetch('http://localhost:5000/api/usuarios/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, senha })
                });
                const data = await response.json();
                if (data.user) {
                    localStorage.setItem('usuarioLogado', JSON.stringify(data.user));
                    alert('Login realizado com sucesso!');
                    window.location.href = '../index.html';
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error('Erro ao logar:', error);
                alert('Erro ao conectar com o servidor.');
            }
        });
    }

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
