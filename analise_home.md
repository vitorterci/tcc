# Análise da Home e Plano de Modernização

## 1. Problemas Identificados
- **Hierarquia Visual:** O logo principal no Hero é muito grande e compete com o carrossel. A tipografia (Dogica) é pixelada e pode cansar a leitura se usada em excesso.
- **Navegação:** A sidebar é funcional, mas o header (busca) é muito simples. Falta um "apelo" visual mais moderno como o da imagem de referência (background escuro com elementos vibrantes).
- **Hero Section:** O carrossel é básico. O contraste entre o texto e as imagens pode ser melhorado.
- **Espaçamento e Alinhamento:** Os filtros ocupam muito espaço e os menus flutuantes podem ser mais elegantes.
- **Responsividade:** Já existem regras, mas podem ser refinadas para garantir que o visual "moderno" se mantenha em telas menores.
- **Componentes:** Os cards de jogos são funcionais, mas o estilo de expansão (clone via JS) é complexo. Podemos melhorar o visual sem quebrar essa lógica.

## 2. Inspiração da Imagem de Referência
- **Estilo:** Dark mode profundo com detalhes em cores vibrantes (roxo/azul).
- **Layout:** Seções bem definidas com sobreposições leves.
- **Tipografia:** Uso de fontes sem serifa modernas para contraste com títulos.

## 3. Plano de Ação (Alterações Necessárias)
### index.html
- Ajustar a estrutura do Hero para ser mais impactante, talvez integrando o logo de forma mais sutil ou como parte de um banner.
- Melhorar o Header de busca.
- Adicionar classes para animações de entrada (Fade-in, Slide-up).

### assets/css/global.css & index.html (estilos inline)
- Atualizar variáveis de cores para tons mais profundos.
- Melhorar o design dos botões (gradientes sutis, sombras internas).
- Refinar o design dos cards (bordas mais suaves, hover mais fluido).
- Adicionar overlays de gradiente nas imagens do carrossel para melhor legibilidade.

### assets/js/home.js (se necessário)
- Ajustar delays de animação.

## 4. Restrições Mantidas
- Não alteraremos a arquitetura de pastas.
- Não removeremos o PixelBlast (background animado).
- Não quebraremos a funcionalidade de filtros.
