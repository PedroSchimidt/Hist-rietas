function updateRemoveButtons() {
    const removeButtons = document.querySelectorAll('.personagem-row .btn-danger');
    const personagemRows = document.querySelectorAll('.personagem-row');
  
    if (personagemRows.length <= 3) {
      removeButtons.forEach(button => button.disabled = true);
    } else {
      removeButtons.forEach(button => button.disabled = false);
    }
  }
  
  function addPersonagem() {
    const personagemDiv = document.getElementById('personagens'); 
    const personagemRow = document.createElement('div');
    personagemRow.className = 'personagem-row';
  
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.className = 'personagem form-control personagem-input';
    newInput.placeholder = 'Informe personagens ou cenários...';
  
    const removeButton = document.createElement('button');
    removeButton.className = 'btn-danger';
    removeButton.innerText = 'Excluir';
    removeButton.onclick = () => removePersonagem(removeButton);
  
    personagemRow.appendChild(newInput);
    personagemRow.appendChild(removeButton);
  
    personagemDiv.appendChild(personagemRow);
  
    updateRemoveButtons();
  }
  
  function removePersonagem(button) {
    const personagemRow = button.parentElement;
    personagemRow.remove();
    updateRemoveButtons();
  }
  
  async function submitForm() {
    const personagemInput = document.querySelectorAll('.personagem-input'); 
    const personagem = [];
  
    personagemInput.forEach(input => {
      if (input.value) {
        personagem.push(input.value);
      }
    });
  
    if (personagem.length < 3) {
      alert('Por favor, preencha pelo menos três campos!');
      return;
    }
  
    const data = {
      personagem: personagem
    };
  
    try {
      const response = await fetch('http://localhost:5000/historia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      const result = await response.json();
      const responseDiv = document.getElementById('response');
  
      if (result.personagens) { 
        const receita = `${result.personagens.join('')}`;
        responseDiv.innerHTML = receita;
      } else {
        responseDiv.innerHTML = `<p>Erro: ${result.Erro}</p>`;
      }
  
      responseDiv.style.display = 'block';
  
    } catch (error) {
      const responseDiv = document.getElementById('response');
      responseDiv.innerHTML = `<p>Erro: ${error.message}</p>`;
      responseDiv.style.display = 'block';
    }
  }
  
  document.addEventListener('DOMContentLoaded', updateRemoveButtons);