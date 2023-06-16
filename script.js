document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("meuFormulario");
  const tabela = document.getElementById("minhaTabela");
  const botaoEditar = document.getElementById("botaoEditar");
  const botaoExcluir = document.getElementById("botaoExcluir");
  const botaoOK = document.createElement("button");
  botaoOK.textContent = "OK";
  botaoOK.setAttribute("id", "botaoOK");
  botaoOK.setAttribute("disabled", "disabled");
  const botoesAcao = document.querySelector(".botoes-de-acao");
  botoesAcao.appendChild(botaoOK);

  let linhaSelecionada = null;
  let editarClicado = false; // Flag para verificar se o botão "Editar" foi clicado

  tabela.addEventListener("click", function (evento) {
    if (evento.target.tagName === "TD") {
      const celulaAtual = evento.target;

      if (linhaSelecionada) {
        linhaSelecionada.classList.remove("selecionado");
      }

      linhaSelecionada = celulaAtual.parentNode;
      linhaSelecionada.classList.add("selecionado");

      botaoEditar.removeAttribute("disabled");
      botaoExcluir.removeAttribute("disabled");
      botaoOK.setAttribute("disabled", "disabled");
    }
  });

  botaoEditar.addEventListener("click", function () {
    if (linhaSelecionada) {
      const colunas = linhaSelecionada.cells;
      const nome = colunas[0];
      const email = colunas[1];
      const telefone = colunas[2];

      // Transforma as células em campos editáveis
      nome.innerHTML = `<input type="text" value="${nome.textContent}">`;
      email.innerHTML = `<input type="email" value="${email.textContent}">`;
      telefone.innerHTML = `<input type="tel" value="${telefone.textContent}">`;

      botaoEditar.setAttribute("disabled", "disabled");
      botaoExcluir.setAttribute("disabled", "disabled");
      botaoOK.removeAttribute("disabled");

      editarClicado = true;
    }
  });

  botaoExcluir.addEventListener("click", function () {
    if (linhaSelecionada) {
      tabela.deleteRow(linhaSelecionada.rowIndex);
      linhaSelecionada = null;

      botaoEditar.setAttribute("disabled", "disabled");
      botaoExcluir.setAttribute("disabled", "disabled");
      botaoOK.setAttribute("disabled", "disabled");
    }
  });

  botaoOK.addEventListener("click", function () {
    if (linhaSelecionada) {
      const colunas = linhaSelecionada.cells;
      const nome = colunas[0].querySelector("input").value;
      const email = colunas[1].querySelector("input").value;
      const telefone = colunas[2].querySelector("input").value;

      colunas[0].textContent = nome;
      colunas[1].textContent = email;
      colunas[2].textContent = telefone;

      linhaSelecionada.classList.remove("selecionado");
      linhaSelecionada = null;

      botaoEditar.removeAttribute("disabled");
      botaoExcluir.removeAttribute("disabled");
      botaoOK.setAttribute("disabled", "disabled");

      editarClicado = false;
    }
  });

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;

    if (linhaSelecionada || editarClicado) {
      linhaSelecionada.classList.remove("selecionado");
      linhaSelecionada = null;
      editarClicado = false;
      botaoEditar.dispatchEvent(new Event("click"));

      botaoEditar.removeAttribute("disabled");
      botaoExcluir.removeAttribute("disabled");
      botaoOK.setAttribute("disabled", "disabled");
    }
      const novaLinha = tabela.insertRow();
      const colunaNome = novaLinha.insertCell();
      const colunaEmail = novaLinha.insertCell();
      const colunaTelefone = novaLinha.insertCell();

      colunaNome.textContent = nome;
      colunaEmail.textContent = email;
      colunaTelefone.textContent = telefone;


    formulario.reset();
  });
});
