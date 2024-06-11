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

   https://github.com/MilitaoPedro/MembersApp/assets/102882308/f85e606b-737d-4266-b829-7c11405c6269

   > Tela de login integrado com firebase e com validação de formulário

- **Página de Cadastro**

   https://github.com/MilitaoPedro/MembersApp/assets/102882308/bf383160-b5aa-4171-8702-37248ce9146b

   > Tela de login integrado com firebase e com validação de formulário

- **Página de esqueci minha senha**

   https://github.com/MilitaoPedro/MembersApp/assets/102882308/0f5049d2-a329-4448-a244-bab82e3ad7bb

   > Tela de esqueci minha senha, integrada com firebase
   
- **Página de carregamento**

   https://github.com/MilitaoPedro/MembersApp/assets/102882308/4611faed-bebe-433f-b66e-c155c47d86ab

   > Tela de loading que faz com que o usuário aguarde até todos os membros do banco de dados serem listados
   
- **Página de listagem de membros**

   https://github.com/MilitaoPedro/MembersApp/assets/102882308/f9b928d3-4246-47e7-a777-0d5064229704

   > Tela com todos os membros presentes no banco de dados. Cada membro possui Nome, Email, Idade, Matricula e Imagem de perfil (Opcional)
   > É possível realizar a edição, remoção e criação de novos membros nesta página
   
- **Modal de adição de membro**
  
   https://github.com/MilitaoPedro/MembersApp/assets/102882308/f01e668f-c8bd-4f92-ac80-dd7bb1b5ed84

   > Modal responsável por adicionar um membro no banco de dados
