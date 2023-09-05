# SPARQL Query Builder (UI)

This React App (built using Vite) lets users select properties that translate to statement(s) in a SPARQL query. The SPARQL query can subsequently be run using a *general* SPARQL query engine, or a SPARQL *Link-Traversal-based Query Processing* (LTQP) engine.

## Installation
1. The application depends on the [SPARQL Query Builder](https://github.com/thesis-Martijn-Bogaert-2022-2023/sparql-query-builder) application.
   1. Clone the repository:
      ```bash
      git clone https://github.com/thesis-Martijn-Bogaert-2022-2023/sparql-query-builder.git
      ```
   2. Navigate to its root and run:
      ```bash
      yarn install
      ```
   3. To use it as a local package for the SPARQL Query Builder (UI) application, run:
      ```bash
      yarn link
      ```
2. The application also depends on a [Comunica Link Traversal Monorepo Fork](https://github.com/thesis-Martijn-Bogaert-2022-2023/comunica-feature-link-traversal).
   1. Clone the repository:
      ```bash
      git clone https://github.com/thesis-Martijn-Bogaert-2022-2023/comunica-feature-link-traversal.git
      ```
   2. Navigate to its root and switch to the correct branch:
      ```bash
      git checkout feature/change-gettyvocab-stadgent-links
      ```
   3. Run:
      ```bash
      yarn install
      ```
   4. Navigate to the customized engine application:
      ```bash
      cd ./engines/query-sparql-link-traversal
      ```
   5. To use it as a local package for the SPARQL Query Builder (UI) application, run:
      ```bash
      yarn link
      ```
3. Clone **this** repository and navigate to its root.
4. Run:
   ```bash
   yarn install
   ```
5. (Optional) the previous command should automatically link the local packages, but it you want to be sure, run:
   ```bash
   yarn link "sparql-query-builder" "@comunica/query-sparql-link-traversal-custom"
   ```
6. To start the application (on port 8000), run:
   ```bash
   yarn run dev --port 8000
   ```
