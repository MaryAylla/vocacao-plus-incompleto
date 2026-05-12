## 🚧 Status do Projeto e Próximos Passos

Este projeto está em fase ativa de desenvolvimento. Se você faz parte da equipe de desenvolvedores, atente-se aos seguintes pontos:

### 🎨 Ajustes de Design

O layout atual serve como uma estrutura base, mas ainda **não está 100% fiel ao protótipo do Figma**. Precisamos trabalhar no refino de:

* Espaçamentos e alinhamentos finos.
* Fidelidade de cores e arredondamento de bordas.
* **Responsividade:** O site ainda não foi adaptado para dispositivos móveis (mobile). No momento, o foco é a visualização em Desktop.

### 🤖 Nota sobre a API (IA)

A chave certa da API do Google Gemini **não está incluída no código por questões de segurança**.

* Ao rodar o teste vocacional, é esperado que a página de resultados apresente um **erro de comunicação**.
* Não se preocupe com erros no console relacionados ao `404`, `403` ou `429`; eles são causados pela ausência da chave ou limite de cota.
* Se precisar testar a lógica da IA, insira sua própria chave temporariamente no arquivo `js/api.js`.

---

## 🚀 Como Rodar Localmente

Para visualizar o projeto em sua máquina:

1. Faça o clone do repositório ou baixe os arquivos.
2. Certifique-se de que a estrutura de pastas está correta (CSS em `/css`, JS em `/js`).
3. Recomendamos o uso da extensão **Live Server** no VS Code:
* Clique com o botão direito no arquivo `index.html`.
* Selecione **"Open with Live Server"**.


4. Caso não use o Live Server, basta abrir o arquivo `index.html` em qualquer navegador moderno.

---

## ⚠️ CADA DUPLA DE DESENVOLVEDODES DEVE AJEITAR SUA PÁGINA DESIGNADA ORIGINALMENTE. (Obs.: Um arquivo só de css para todas as páginas)
