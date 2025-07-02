# Projeto2Backend

Este é um projeto de backend desenvolvido em Java com o framework Spring Boot. Ele foi criado para servir como a API de suporte para uma aplicação, provavelmente um blog pessoal ou similar, oferecendo endpoints para manipulação de dados e lógica de negócio.

## Visão Geral

O `Projeto2Backend` é uma aplicação RESTful que gerencia dados relacionados a um blog, como usuários, postagens, temas, etc. Ele utiliza o poder do Spring Boot para oferecer um desenvolvimento rápido e robusto, com foco na estabilidade e escalabilidade.

## Tecnologias Utilizadas

* **Java 17+**: Linguagem de programação principal.
* **Spring Boot**: Framework para o desenvolvimento rápido de aplicações Java.
* **Maven**: Ferramenta de automação de construção e gerenciamento de dependências.
* **Spring Data JPA**: Para persistência de dados e interação com o banco de dados.
* **Spring Security**: Para autenticação e autorização (se implementado, mencione).
* **Banco de Dados H2 (em memória)**: Utilizado para desenvolvimento e testes, facilitando a execução local sem necessidade de configuração externa de banco.
* **MySQL**: Banco de dados relacional para ambiente de produção (configuração padrão).
* **Lombok**: Para reduzir o boilerplate code (código repetitivo) em classes Java.
* **JUnit 5 / Mockito**: Para testes unitários e de integração.
* **Swagger/OpenAPI**: Para documentação automática e testes dos endpoints da API (se implementado, mencione).

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

* **Java Development Kit (JDK) 17 ou superior**
    * [Download JDK](https://www.oracle.com/java/technologies/downloads/)
* **Apache Maven 3.x**
    * [Download Maven](https://maven.apache.org/download.cgi)
* **Git**
    * [Download Git](https://git-scm.com/downloads)
* **IDE (Ambiente de Desenvolvimento Integrado) de sua preferência:**
    * [VS Code](https://code.visualstudio.com/) com `Extension Pack for Java`
    * [IntelliJ IDEA Community Edition](https://www.jetbrains.com/idea/download/)
    * [Eclipse IDE for Enterprise Java Developers](https://www.eclipse.org/downloads/packages/)

## Como Rodar o Projeto

Siga os passos abaixo para clonar e executar o `Projeto2Backend` em sua máquina local.

### 1. Clonar o Repositório

Abra o terminal ou prompt de comando e execute o seguinte comando:

```bash
git clone [https://github.com/Tgardelli/Projeto2Backend.git](https://github.com/Tgardelli/Projeto2Backend.git)
cd Projeto2Backend
