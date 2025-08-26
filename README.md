# Documentação do Sistema de Representantes

Esta pasta contém a documentação da API REST do Sistema de Representantes usando Mintlify.

## Estrutura

```
docs-app/
├── api-reference/      # Documentação dos endpoints da API
│   ├── auth.mdx       # Autenticação e API Keys
│   ├── clients.mdx    # Endpoints de clientes
│   ├── introduction.mdx # Introdução à API
│   ├── openapi.json   # Especificação OpenAPI
│   └── sales.mdx      # Endpoints de vendas
├── images/            # Imagens da documentação
├── logo/              # Logos do sistema
├── snippets/          # Snippets reutilizáveis
├── docs.json          # Configuração do Mintlify
├── favicon.svg        # Favicon
└── index.mdx          # Página inicial
```

## Desenvolvimento Local

Para rodar a documentação localmente:

```bash
# Instalar Mintlify CLI
npm i -g mintlify

# Rodar servidor de desenvolvimento
mintlify dev
```

A documentação estará disponível em `http://localhost:3000`.

## Deploy

A documentação é automaticamente deployada quando há mudanças na branch principal.

## Atualizando a Documentação

### Adicionando Novos Endpoints

1. Crie um novo arquivo `.mdx` em `api-reference/`
2. Adicione a referência no `docs.json` na seção `navigation`
3. Atualize o `openapi.json` se necessário

### Convenções

- Use PascalCase para títulos
- Sempre inclua exemplos de request/response
- Documente todos os parâmetros e seus tipos
- Mantenha consistência com os outros endpoints

## Links Úteis

- [Documentação do Mintlify](https://mintlify.com/docs)
- [Sintaxe MDX](https://mdxjs.com/)
- [OpenAPI Specification](https://swagger.io/specification/)