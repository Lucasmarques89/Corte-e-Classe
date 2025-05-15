document.addEventListener("DOMContentLoaded", function () {

    const servicos = [
        { nome: "Corte Assinatura", preco: "R$600", imagem: "assets/images/corte1.jpg" },
        { nome: "Pacote Mensal", preco: "R$1500", imagem: "assets/images/corte2.jpg" },
        { nome: "Corte + Barba + Sobrancelha", preco: "R$450", imagem: "assets/images/corte3.jpg" }
    ];

    const cardsContainer = document.getElementById("cards-servicos");
    servicos.forEach(servico => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${servico.imagem}" alt="${servico.nome}">
            <div class="info">
                <h3>${servico.nome}</h3>
                <p><strong>${servico.preco}</strong></p>
            </div>
        `;
        cardsContainer.appendChild(card);
    });

    // Formulário
    const form = document.getElementById("form-agendamento");
    const mensagem = document.getElementById("mensagem");

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
    }

    // Service Worker
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker.register("sw.js")
                .then(() => console.log("Service Worker registrado"))
                .catch(err => console.error("Erro ao registrar SW:", err));
        });
    }
});