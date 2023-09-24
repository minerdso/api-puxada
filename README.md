
```markdown
# API de Puxada

Este projeto demonstra como criar sua própria API para puxar dados usando Node.js. Este código foi criado para fins de estudo e não tem fins lucrativos. O objetivo é ensinar como criar uma API de puxada de dados.

## Instalação

Para configurar o ambiente de desenvolvimento, siga estas etapas:

1. Instale o Node.js com NVM:
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
   export NVM_DIR="$HOME/.nvm"
   [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
   nvm install 16.14.1
   nvm use 16.14.1
   ```
2. Verifique se o Node.js foi instalado corretamente:
   ```bash
   node -v
   ```

## Banco de Dados

Utilizamos um banco de dados SQLite no projeto. Você pode baixá-lo [aqui](https://drive.google.com/file/d/1CCMN37G_xPuMy2sZ0CNKK9o5z1GPZsA1/view). Coloque o banco de dados dentro da pasta raiz do projeto.

## Dependências do Node.js

Certifique-se de instalar as seguintes dependências Node.js para o projeto:

```bash
npm install express sqlite3
```

## Uso da API

A API oferece os seguintes endpoints:

- Para buscar por CPF:
  ```
  http://ipVPS:8080/api/buscar-por-cpf?cpf=01065983336
  ```

- Para buscar por nome:
  ```
  http://ipVPS:8080/api/buscar-por-nome?nome=MARCOS%20CAMARGO%20MACHADO
  ```

- Para buscar por celular:
  ```
  http://ipVPS:8080/api/buscar-por-celular?celular=5521974250061
  ```

- Para buscar por telefone:
  ```
  http://ipVPS:8080/api/buscar-por-telefone?telefone=5511974248005
  ```

- Para buscar por CNS (Cartão Nacional de Saúde):
  ```
  http://ipVPS:8080/api/buscar-por-cns?cns=700804452297282
  ```

## Conclusão

Este projeto é destinado a fins educacionais. Esperamos que você aproveite o aprendizado e continue compartilhando seu conhecimento com a comunidade. Lembre-se de que só mantemos o que temos compartilhando o que aprendemos.

Bons estudos!
```
