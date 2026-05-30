/* ==========================================================================
   LÓGICA PRINCIPAL (JAVASCRIPT) - REFÚGIO LITERÁRIO
   ========================================================================== */

// Banco de dados literário estruturado de forma relacional
const repositorioLiterario = {
    ansiedade: {
        jovem: {
            texto: "Você não precisa ter tudo resolvido aos dezessete anos. O futuro não é uma barreira que desaba sobre nós, é algo que se constrói um dia de cada vez.",
            livro: "Tartarugas Até Lá Embaixo", autor: "John Green"
        },
        adulto: {
            texto: "A ansiedade é o interesse pago adiantado por uma dívida que você talvez nunca venha a dever. Respire. O momento presente é o único lugar onde a vida existe.",
            livro: "O Poder do Agora", autor: "Eckhart Tolle"
        },
        idoso: {
            texto: "Olho para trás e vejo quantas tempestades antecipei que nunca chegaram a acontecer. O tempo me ensinou a desarmar o futuro.",
            livro: "Memórias Inventadas", autor: "Manoel de Barros"
        }
    },
    depressao: {
        jovem: {
            texto: "Há coisas muito, muito melhores pela frente do que qualquer outra que deixamos para trás. A dor não define o fim da sua história.",
            livro: "As Crônicas de Nárnia", autor: "C.S. Lewis"
        },
        adulto: {
            texto: "No meio do inverno, eu finalmente aprendi que havia dentro de mim um verão invencível. Você é maior do que o seu momento mais sombrio.",
            livro: "O Mito de Sísifo", autor: "Albert Camus"
        },
        idoso: {
            texto: "A vida não é a que a gente viveu, e sim a que a gente recorda, e como a recorda para contá-la. Seu valor permanece intacto na história.",
            livro: "Viver para Contar", autor: "Gabriel García Márquez"
        }
    },
    solidao: {
        jovem: {
            texto: "Ninguém nunca é completamente sozinho. Nós somos conectados pelas mesmas dúvidas e pelas músicas que ouvimos no escuro do quarto.",
            livro: "As Vantagens de Ser Invisível", autor: "Stephen Chbosky"
        },
        adulto: {
            texto: "A solidão é a sorte de todos os espíritos excepcionais. Ela machuca, mas também abre espaço para que você conheça a própria imensidão.",
            livro: "A Hora da Estrela", autor: "Clarice Lispector"
        },
        idoso: {
            texto: "O segredo de uma boa velhice não é outra coisa senão um pacto honroso com a solidão. Transformá-la em calmaria, não em ausência.",
            livro: "Cem Anos de Solidão", autor: "Gabriel García Márquez"
        }
    },
    luto: {
        jovem: {
            texto: "O luto não é a ausência do amor, é o amor que não tem mais para onde ir. Ele se transforma em saudade, e a saudade é uma forma de guardar quem se foi.",
            livro: "A Culpa é das Estrelas", autor: "John Green"
        },
        adulto: {
            texto: "A única maneira de superar uma dor é passando por dentro dela. Não fuja do seu inverno, a primavera voltará no tempo certo.",
            livro: "A Ridícula Ideia de Não Voltar a Te Ver", autor: "Rosa Montero"
        },
        idoso: {
            texto: "Aqueles que passam por nós não vão sós, não nos deixam sós. Deixam um pouco de si, levam um pouco de nós. O amor é mais forte que a partida.",
            livro: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry"
        }
    }
};

// Variáveis de controle para armazenar o estado atual das escolhas do usuário
let emocaoSelecionada = null;
let idadeSelecionada = null;

// Escuta de eventos para capturar o clique nos botões (Event Delegation)
document.querySelectorAll('.selector-btn').forEach(botao => {
    botao.addEventListener('click', (e) => {
        const tipo = e.target.dataset.type;
        const valor = e.target.dataset.value;

        // Gerencia a classe 'active' para destacar visualmente apenas o botão selecionado do grupo
        document.querySelectorAll(`.selector-btn[data-type="${tipo}"]`).forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        // Atualiza o estado global da aplicação
        if (tipo === 'emotion') emocaoSelecionada = valor;
        if (tipo === 'age') idadeSelecionada = valor;

        // Executa a lógica de busca e renderização se ambos os filtros estiverem ativos
        processarSelecao();
    });
});

// Processa o cruzamento de dados e exibe a citação na tela com uma animação suave de fade
function processarSelecao() {
    if (!emocaoSelecionada || !idadeSelecionada) return;

    const elementoTexto = document.getElementById('display-text');
    const elementoMeta = document.getElementById('display-meta');
    
    // Cruza as chaves do objeto usando o estado atual
    const dadosFrase = repositorioLiterario[emocaoSelecionada][idadeSelecionada];

    // Transição suave de saída (Opacidade 0)
    elementoTexto.style.opacity = 0;
    elementoMeta.style.opacity = 0;

    // Aguarda o término da transição de saída para alterar os textos e reexibir (Opacidade 1)
    setTimeout(() => {
        elementoTexto.innerText = `"${dadosFrase.texto}"`;
        elementoMeta.innerHTML = `${dadosFrase.autor} <div class="quote-context">Obra: ${dadosFrase.livro}</div>`;
        
        elementoTexto.style.opacity = 1;
        elementoMeta.style.opacity = 1;
    }, 200);
}
