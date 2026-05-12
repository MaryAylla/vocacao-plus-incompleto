// js/index.js

document.addEventListener('DOMContentLoaded', () => {

    // 1. Resgata as avaliações do navegador
    let avaliacoes = JSON.parse(localStorage.getItem('vocacaoPlus_avaliacoes'));

    // Se estiver vazio, injetamos dados de demonstração
    if (!avaliacoes || avaliacoes.length === 0) {
        avaliacoes = [
            { id: 1, nome: "Lucas Marcolino Belo", nota: 5, comentario: "Achei o teste incrível! O resultado fez muito sentido com o que eu gosto de fazer. As descrições dos cursos ajudaram bastante a clarear minhas ideias.", liked: false, starred: false },
            { id: 2, nome: "Jonas Costa", nota: 5, comentario: "Muito bom. O gráfico de radar me surpreendeu muito. Sugeriu cursos que eu nem sabia que existiam na UFCA.", liked: true, starred: false },
            { id: 3, nome: "Laiany Sampaio", nota: 4, comentario: "Gostei bastante da plataforma, achei o design muito bonito e fácil de usar. Só o carregamento da IA que demorou uns segundinhos, mas o texto compensou.", liked: false, starred: true }
        ];
        localStorage.setItem('vocacaoPlus_avaliacoes', JSON.stringify(avaliacoes));
    }

    // Elementos da tela
    const elMediaNumero = document.getElementById('media-numero');
    const elMediaEstrelas = document.getElementById('media-estrelas');
    const elTotalAvaliacoes = document.getElementById('total-avaliacoes');
    const elBarrasDistribuicao = document.getElementById('barras-distribuicao');
    const elListaComentarios = document.getElementById('lista-comentarios');

    // 2. Função principal para renderizar a tela toda
    const renderizarTela = () => {
        let somaNotas = 0;
        let distribuicao = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

        avaliacoes.forEach(av => {
            somaNotas += av.nota;
            distribuicao[av.nota]++;
        });

        const media = (somaNotas / avaliacoes.length).toFixed(1).replace('.', ',');
        
        elMediaNumero.innerText = media;
        elTotalAvaliacoes.innerText = avaliacoes.length;

        // Estrelas da nota média geral
        let estrelasHTML = '';
        const notaArredondada = Math.round(somaNotas / avaliacoes.length);
        for (let i = 1; i <= 5; i++) {
            if (i <= notaArredondada) estrelasHTML += '<i class="fas fa-star"></i>';
            else estrelasHTML += '<i class="far fa-star"></i>';
        }
        elMediaEstrelas.innerHTML = estrelasHTML;

        // Barras de Progresso
        elBarrasDistribuicao.innerHTML = '';
        for (let i = 5; i >= 1; i--) {
            const porcentagem = ((distribuicao[i] / avaliacoes.length) * 100).toFixed(0);
            
            elBarrasDistribuicao.innerHTML += `
                <div class="d-flex align-items-center mb-2">
                    <span class="text-indigo fw-bold me-2" style="width: 15px;">${i}</span>
                    <div class="progress flex-grow-1" style="height: 8px; background-color: #E8F0FE;">
                        <div class="progress-bar rounded-pill" style="width: ${porcentagem}%; background-color: #1565C0;"></div>
                    </div>
                </div>
            `;
        }

        // Lista de Comentários
        elListaComentarios.innerHTML = '';
        avaliacoes.forEach((av, index) => {
            let stars = '';
            for (let i = 1; i <= 5; i++) {
                stars += i <= av.nota ? '<i class="fas fa-star text-warning small"></i>' : '<i class="far fa-star text-warning small"></i>';
            }

            // Lógica visual dos botões de interação
            const heartClass = av.liked ? 'fas text-danger' : 'far text-danger opacity-50';
            const starClass = av.starred ? 'fas text-warning' : 'far text-warning opacity-50';

            elListaComentarios.innerHTML += `
                <div class="d-flex flex-column mb-3 border-bottom border-light pb-4">
                    <div class="d-flex align-items-center mb-3">
                        <div class="rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm" style="width: 45px; height: 45px; background-color: #E8F0FE; color: #1565C0; font-weight: bold; font-size: 1.2rem;">
                            ${av.nome.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h5 class="fw-bold text-indigo mb-0">${av.nome}</h5>
                            <div>${stars}</div>
                        </div>
                    </div>
                    <p class="text-muted" style="line-height: 1.6; padding-left: 60px;">${av.comentario}</p>
                    <div class="d-flex gap-3 mt-2" style="padding-left: 60px; font-size: 1.2rem;">
                        <i class="${heartClass} cursor-pointer hover-scale transition" onclick="toggleInteracao(${index}, 'like')" title="Curtir"></i>
                        <i class="${starClass} cursor-pointer hover-scale transition" onclick="toggleInteracao(${index}, 'star')" title="Destacar"></i>
                    </div>
                </div>
            `;
        });
    };

    // 3. Funções para interagir com os botões (Global para o HTML conseguir chamar)
    window.toggleInteracao = (index, tipo) => {
        // Inverte o valor (se era true vira false, e vice-versa)
        if (tipo === 'like') {
            avaliacoes[index].liked = !avaliacoes[index].liked;
        } else if (tipo === 'star') {
            avaliacoes[index].starred = !avaliacoes[index].starred;
        }

        // Salva no banco de dados do navegador e redesenha a tela
        localStorage.setItem('vocacaoPlus_avaliacoes', JSON.stringify(avaliacoes));
        renderizarTela();
    };

    // Inicializa a tela pela primeira vez
    renderizarTela();

});