// api/gerar-analise.js

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ erro: 'Método não permitido' });
    }

    try {
        // Recebe o texto (prompt) que o seu Front-end enviou
        const promptParaIA = request.body.prompt;
        
        // Puxa a chave da API do cofre secreto da Vercel
        const apiKey = process.env.GEMINI_API_KEY;
        
        // Usamos o modelo 1.5-flash para garantir as 1.500 requisições diárias gratuitas
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        // Faz a comunicação com o servidor do Google
        const respostaGoogle = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: promptParaIA }] }] })
        });

        if (!respostaGoogle.ok) {
            const erroDetalhado = await respostaGoogle.text();
            throw new Error(`Google recusou: ${erroDetalhado}`);
        }

        const dadosAPI = await respostaGoogle.json();
        let respostaTexto = dadosAPI.candidates[0].content.parts[0].text;
        
        // Filtro de Segurança
        respostaTexto = respostaTexto.replace(/```json/g, "").replace(/```/g, "").trim();
        const resultadoFinal = JSON.parse(respostaTexto);

        // Devolve o JSON pronto e limpo para o seu Front-end
        return response.status(200).json(resultadoFinal);

    } catch (erro) {
        console.error("🕵️ ERRO NO BACK-END:", erro);
        return response.status(500).json({ erro: 'Falha ao processar a análise com a IA.' });
    }
}