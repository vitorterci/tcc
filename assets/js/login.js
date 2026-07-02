/**
 * Gerenciamento da página de Login e Cadastro
 * Responsável pela animação de transição entre os formulários
 */

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
        containerAutenticacao.classList.add('ativo');
    };

    /**
     * Ativa o modo de login (animação para a esquerda)
     */
    const ativarLogin = () => {
        containerAutenticacao.classList.remove('ativo');
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
            // Aqui seria implementada a lógica de autenticação real
        });
    });
});
