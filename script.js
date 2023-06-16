document.addEventListener("DOMContentLoaded", function () {
  const tabela = document.getElementById("minhaTabela");
  const botaoEditar = document.getElementById("botaoEditar");
  const botaoExcluir = document.getElementById("botaoExcluir");
  let linhaSelecionada = null;

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
    }
  });

  botaoExcluir.addEventListener("click", function () {
    if (linhaSelecionada) {
      tabela.deleteRow(linhaSelecionada.rowIndex);
      linhaSelecionada = null;

      botaoEditar.setAttribute("disabled", "disabled");
      botaoExcluir.setAttribute("disabled", "disabled");
    }
  });

  tabela.addEventListener("blur", function (evento) {
    if (linhaSelecionada && evento.target.tagName === "INPUT") {
      const input = evento.target;
      const celula = input.parentNode;
      const valor = input.value;
      celula.textContent = valor;

      linhaSelecionada = null;
      botaoEditar.removeAttribute("disabled");
      botaoExcluir.removeAttribute("disabled");
    }
  });

  const formulario = document.getElementById("meuFormulario");

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;

    if (linhaSelecionada) {
      const colunas = linhaSelecionada.cells;
      colunas[0].textContent = nome;
      colunas[1].textContent = email;
      colunas[2].textContent = telefone;

      linhaSelecionada.classList.remove("selecionado");
      linhaSelecionada = null;

      botaoEditar.setAttribute("disabled", "disabled");
      botaoExcluir.setAttribute("disabled", "disabled");
    } else {
      const novaLinha = tabela.insertRow();
      const colunaNome = novaLinha.insertCell();
      const colunaEmail = novaLinha.insertCell();
      const colunaTelefone = novaLinha.insertCell();

      colunaNome.textContent = nome;
      colunaEmail.textContent = email;
      colunaTelefone.textContent = telefone;
    }

    formulario.reset();
  });
});
