document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-agendamento");
    const mensagem = document.getElementById("mensagem");

    // Preencher os serviços dinamicamente
    const servicos = [
        { nome: "Corte Simples", preco: "R$30" },
        { nome: "Corte + Barba", preco: "R$50" },
        { nome: "Barba", preco: "R$25" },
        { nome: "Sobrancelha", preco: "R$15" }
    ];

    const listaServicos = document.getElementById("lista-servicos");

    servicos.forEach(servico => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <h3>${servico.nome}</h3>
            <p><strong>${servico.preco}</strong></p>
        `;
        listaServicos.appendChild(card);
    });

    // Envio do formulário para WhatsApp
    if (form && mensagem) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const nome = document.getElementById("nome").value.trim();
            const servico = document.getElementById("servico").value;
            const data = document.getElementById("data").value;
            const hora = document.getElementById("hora").value;

            if (!nome || !servico || !data || !hora) {
                mensagem.textContent = "Por favor, preencha todos os campos.";
                mensagem.style.color = "red";
                return;
            }

            const textoMensagem = `Novo agendamento:\nNome: ${nome}\nServiço: ${servico}\nData: ${data}\nHora: ${hora}`;
            const numero = "5511914713070"; // Substitua pelo número correto
            const url = `https://wa.me/ ${numero}?text=${encodeURIComponent(textoMensagem)}`;

            window.open(url, "_blank");

            mensagem.textContent = "Agendamento enviado! Entraremos em contato.";
            mensagem.style.color = "#000";
            form.reset();
        });
    } else {
        console.error("Formulário ou elemento de mensagem não encontrado.");
    }

    // Service Worker para PWA
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker.register("sw.js")
                .then(() => console.log("Service Worker registrado"))
                .catch(err => console.error("Erro ao registrar SW:", err));
        });
    }
});