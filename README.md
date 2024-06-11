# Membros App

Aplicativo desenvolvido em React-Native, com o intuito de realizar o cadastro, edição, remoção e listagem de membros.

## Rodando o projeto

1. Dependências necessárias
   - Se faz essencial possuir o Node.js v20.12.2+ instalado em sua máquina [Link para download](https://nodejs.org/en)
   - O App foi criado utilizando o expo seguindo sua [documentação](https://docs.expo.dev/get-started/set-up-your-environment/)

2. Rodando o aplicativo

   Vá para a pasta onde o projeto foi instalado e então instale os pacotes com
   ```bash
    npm install
   ```
   Depois, inicie o projeto através do comando
   ```bash
    npx expo start
   ```
Será possível abrir o aplicativo com as seguintes opções:
   Escolha a mais apropriada para você
- [Compilação de desenvolvimento](https://docs.expo.dev/develop/development-builds/introduction/)
- [Emulador Android](https://docs.expo.dev/workflow/android-studio-emulator/)
- [Simulador iOS](https://docs.expo.dev/workflow/ios-simulator/) (Não Recomendado)
- [Expo Go](https://expo.dev/go) (Recomendado)

## Funcionalidades
   O aplicativo possui integração com API com firebase, navegação entre telas com o React Navigation e validação de formulários utilizando o yup. O que permite as seguintes funcionalidades: 
   - Login de usuário (Com função esqueci minha senha)
   - Cadastro de usuário 
   - Adição de membro em tempo real
   - Edição de membro em tempo real
   - Remoção de membro em tempo real
## Telas do Aplicativo
 - **Welcome Page**

   ![WelcomePage](https://github.com/MilitaoPedro/MembersApp/assets/102882308/09c259cf-35fb-461d-a0e8-b1f7c4caf68d)

   > Primeira tela do Aplicativo 

- **Login Page**

   https://github.com/MilitaoPedro/MembersApp/assets/102882308/e64ab257-8db2-4eaa-a266-beabd6aac539

   > Tela de login integrado com firebase e com validação de formulário

- **Página de Cadastro**

   https://github.com/MilitaoPedro/MembersApp/assets/102882308/556152bb-07ff-414a-a6a4-6c3eed623cb9

   > Tela de login integrado com firebase e com validação de formulário

- **Página de esqueci minha senha**

   https://github.com/MilitaoPedro/MembersApp/assets/102882308/97bd5473-ad8d-4ec8-8e71-996c13904935

   > Tela de esqueci minha senha, integrada com firebase
   
- **Página de carregamento**

   https://github.com/MilitaoPedro/MembersApp/assets/102882308/423dbe2b-6280-431b-b766-3005cc5b096d

   > Tela de loading que faz com que o usuário aguarde até todos os membros do banco de dados serem listados
   
- **Página de listagem de membros**

   https://github.com/MilitaoPedro/MembersApp/assets/102882308/f9b928d3-4246-47e7-a777-0d5064229704

   > Tela com todos os membros presentes no banco de dados. Cada membro possui Nome, Email, Idade, Matricula e Imagem de perfil (Opcional)
   > É possível realizar a edição, remoção e criação de novos membros nesta página
   
- **Modal de adição de membro**

   https://github.com/MilitaoPedro/MembersApp/assets/102882308/a6ae4265-8e01-4adf-aea5-1b88daccb4da

   > Modal responsável por adicionar um membro no banco de dados
