document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("meuFormulario");
    const tabela = document.getElementById("minhaTabela");
    const botaoEditar = document.getElementById("botaoEditar");
    const botaoExcluir = document.getElementById("botaoExcluir");
    let linhaSelecionada = null;
  
    tabela.addEventListener("click", function (evento) {
      if (evento.target.tagName === "TD") {
        const linhaAtual = evento.target.parentNode;
  
        if (linhaSelecionada) {
          linhaSelecionada.classList.remove("selecionado");
        }
  
        linhaSelecionada = linhaAtual;
        linhaSelecionada.classList.add("selecionado");
  
        botaoEditar.removeAttribute("disabled");
        botaoExcluir.removeAttribute("disabled");
      }
    });
  
    formulario.addEventListener("submit", function (evento) {
      evento.preventDefault();
  
      const nome = document.getElementById("nome").value;
      const email = document.getElementById("email").value;
      const telefone = document.getElementById("telefone").value;
  
      if (linhaSelecionada) {
        linhaSelecionada.cells[0].textContent = nome;
        linhaSelecionada.cells[1].textContent = email;
        linhaSelecionada.cells[2].textContent = telefone;
  
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
  
    botaoEditar.addEventListener("click", function () {
      if (linhaSelecionada) {
        const nome = linhaSelecionada.cells[0].textContent;
        const email = linhaSelecionada.cells[1].textContent;
        const telefone = linhaSelecionada.cells[2].textContent;
  
        document.getElementById("nome").value = nome;
        document.getElementById("email").value = email;
        document.getElementById("telefone").value = telefone;
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
  });
  