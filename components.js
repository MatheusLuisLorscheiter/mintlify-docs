// Custom JavaScript components for Sistema de Representantes Documentation

// API Endpoint Component
export function ApiEndpoint({ method, path }) {
  const methodClass = method.toLowerCase();
  return `
    <div class="api-endpoint ${methodClass}">
      <span>${method}</span>
      <code>${path}</code>
    </div>
  `;
}

// Status Badge Component
export function StatusBadge({ status, type = 'default' }) {
  return `<span class="status-badge ${type}">${status}</span>`;
}

// Copy to Clipboard functionality
export function initializeCopyButtons() {
  document.querySelectorAll('.copy-button').forEach(button => {
    button.addEventListener('click', async () => {
      const codeBlock = button.parentElement.querySelector('code');
      const text = codeBlock.textContent;
      
      try {
        await navigator.clipboard.writeText(text);
        button.classList.add('copied');
        button.textContent = 'Copiado!';
        
        setTimeout(() => {
          button.classList.remove('copied');
          button.textContent = 'Copiar';
        }, 2000);
      } catch (err) {
        console.error('Falha ao copiar:', err);
      }
    });
  });
}

// Initialize interactive API tester
export function initializeApiTester() {
  const testerElements = document.querySelectorAll('.api-tester');
  
  testerElements.forEach(element => {
    const endpoint = element.dataset.endpoint;
    const method = element.dataset.method || 'GET';
    
    // Create interactive form
    const form = document.createElement('form');
    form.className = 'api-tester-form';
    
    // Add API key input
    form.innerHTML = `
      <div class="form-group">
        <label>API Key:</label>
        <input type="password" name="apiKey" placeholder="sua-chave-api-aqui" required>
      </div>
      ${method === 'POST' ? `
        <div class="form-group">
          <label>Body (JSON):</label>
          <textarea name="body" rows="10" placeholder='${getExampleBody(endpoint)}'></textarea>
        </div>
      ` : ''}
      <button type="submit">Executar ${method}</button>
      <div class="response-container" style="display: none;">
        <h4>Resposta:</h4>
        <pre><code class="response-code"></code></pre>
      </div>
    `;
    
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const apiKey = formData.get('apiKey');
      const body = formData.get('body');
      
      const responseContainer = form.querySelector('.response-container');
      const responseCode = form.querySelector('.response-code');
      
      try {
        const options = {
          method,
          headers: {
            'x-api-key': apiKey,
            'Content-Type': 'application/json'
          }
        };
        
        if (body && method !== 'GET') {
          options.body = body;
        }
        
        const response = await fetch(`https://api.sistema-representantes.com.br/api/v1${endpoint}`, options);
        const data = await response.json();
        
        responseCode.textContent = JSON.stringify(data, null, 2);
        responseContainer.style.display = 'block';
        
        // Highlight response
        if (response.ok) {
          responseContainer.classList.add('success');
          responseContainer.classList.remove('error');
        } else {
          responseContainer.classList.add('error');
          responseContainer.classList.remove('success');
        }
        
      } catch (error) {
        responseCode.textContent = `Erro: ${error.message}`;
        responseContainer.style.display = 'block';
        responseContainer.classList.add('error');
      }
    });
    
    element.appendChild(form);
  });
}

// Get example body for endpoints
function getExampleBody(endpoint) {
  const examples = {
    '/clients': JSON.stringify({
      nome: "Empresa Exemplo",
      email: "contato@exemplo.com",
      telefone: "(11) 98765-4321",
      cidade: "São Paulo",
      estado: "SP"
    }, null, 2),
    '/sales': JSON.stringify({
      clienteId: "uuid-do-cliente",
      representadaId: "uuid-da-representada",
      status: "Pedido",
      itens: [
        {
          produtoId: "uuid-do-produto",
          quantidade: 10,
          valorUnitario: 250.00
        }
      ]
    }, null, 2)
  };
  
  return examples[endpoint] || '{}';
}

// Code syntax highlighting improvement
export function enhanceCodeBlocks() {
  document.querySelectorAll('pre code').forEach(block => {
    // Add line numbers
    const lines = block.textContent.split('\n');
    const numbered = lines.map((line, i) => 
      `<span class="line-number">${i + 1}</span>${line}`
    ).join('\n');
    
    block.innerHTML = numbered;
  });
}

// Initialize search functionality
export function initializeSearch() {
  const searchInput = document.querySelector('.search-input');
  if (!searchInput) return;
  
  let searchIndex = null;
  
  // Load search index
  fetch('/search-index.json')
    .then(res => res.json())
    .then(data => {
      searchIndex = data;
    });
  
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    if (!query || !searchIndex) return;
    
    const results = searchIndex.filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.content.toLowerCase().includes(query)
    );
    
    displaySearchResults(results);
  });
}

// Display search results
function displaySearchResults(results) {
  let resultsContainer = document.querySelector('.search-results');
  
  if (!resultsContainer) {
    resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results';
    document.querySelector('.search-input').parentElement.appendChild(resultsContainer);
  }
  
  if (results.length === 0) {
    resultsContainer.innerHTML = '<p>Nenhum resultado encontrado</p>';
    return;
  }
  
  resultsContainer.innerHTML = results.map(result => `
    <a href="${result.url}" class="search-result">
      <h4>${result.title}</h4>
      <p>${result.excerpt}</p>
    </a>
  `).join('');
}

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initializeCopyButtons();
  initializeApiTester();
  enhanceCodeBlocks();
  initializeSearch();
  
  // Add smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
  // Add active state to navigation
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
});

// Export for use in MDX files
export default {
  ApiEndpoint,
  StatusBadge,
  initializeCopyButtons,
  initializeApiTester,
  enhanceCodeBlocks,
  initializeSearch
};