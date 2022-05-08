# Introdução do MVP

Com a crescente demanda no mercado nacional de pets, montamos uma iniciativa para explorar as necessidades inerentes a esse mercado. Desta forma a **PetCare** foi criada para ser uma aplicação multiplataforma de gerenciamento de serviços relacionados ao mundo Pet. Alguns exemplos de derviços abordados:

> 1) Hospedagem de pets;
> 2) Cuidados relacionados ao bem estar do pet;
> 3) Serviço de adoção;

## Arquitetura geral da aplicação

O serviço será sustentado pela plataforma de cloud da AWS, seguindo os padrões de microserviços. O desenho arquitetural dos componentes se apresentam da seguinte maneira:

<br><br>
<p align="center">
  <img src="ArqMs.png" />
</p> 
   

***
### Definição do domínio do microserviço `publicação`

O microserviço de publicação deverá ser responsável por persistir uma nova publicação no DynamoDB. Em sua porta de entrada ele deverá escutar mensagens do SQS e como lógica de negócio deverá identificar quais são os usuários relevantes para visualizar a publicação, e consequentemente deverá replicar a publicação para o cache (DynamoDB) de cada usuário do sistema. Após realizar a persistência, por meio de sua porta de saída, deverá notificar cada usuário relevante de três formas:
1) envio de email;
2) envio de mensagem via socket já aberto pelo cliente;
3) envio de notificação push (requisição Firebase)
   
#### Entidade publicação

A entidade publicação descreve alguns subtipos de publicação:
1) publicação de doação;
2) publicação de hospedagem;
3) publicação de serviço;
4) publicação solicitação de um serviço;
   
Em sua definação mais abstrata a publicação deverá conteplar os seguintes atributos:
* Data e hora de publicação;
* Tipo da publicação;
* Código de identificação do proprietário da publicação;
* Url da imagem associada à publicação;
* Texto da publicação;
* Título da publicação;
* Código de identificação da publicação 

### Conectores de Entrada

O microserviço de publicação deverá fazer pooling na SQS `https://sqs.sa-east-1.amazonaws.com/*******/petcare-order-post.fifo`

### Conectores de saída

O serviço enviará uma notificação.

### Estrutura do microserviço `publicação`

O microserviço de publicação foi construido seguindo o padrão de arquitetura hexagonal.

>```
>project
>│   README.md    
>│
>└───App
>    |    package.json
>    │   
>    └───src  
>       |   Index.ts
>       |
>       └───adapters
>       |    └───driven
>       |    |     |   MockRepository.ts
>       |    |     |   Repository.ts
>       |    |     |    
>       |    |     └───ports
>       |    |           IRepository.ts 
>       |    └───drivers
>       |          Sqs.ts
>       |    
>       └───application
>       │     └───domain
>       |     |     Assessment.ts
>       |     |     Location.ts
>       |     |     Publication.ts
>       |     |     User.ts
>       │     └───port
>       │     |    IPublishService.ts
>       │     └───services
>       |           PublicationService.ts 
>       │
>       └───test/use_cases
>              LocationTest.spec.ts
>              PublicationServiceTest.spec.ts
>              PublicationsTest.spec.ts
>              UserTest.spec.ts
>```

# Executar testes unitários

Para executar os casos de teste do microserviço voce deverá executar o comando abaixo:
>npm run test

Para executar o teste será necessário que o ambiente de execução contenha o Node.js instalado. Para visualização gráfica dos casos de teste será necessário configuração da extenção Jasmine no VS Code. para detalhes da instalação acesse: https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-jasmine-test-adapter


## Executar o programa apontando para infra aws

Para executar o programa apontando para infra aws voce deverá executar o comando:
>npm run start
