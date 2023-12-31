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
2. Clone **this** repository and navigate to its root.
3. Run:
   ```bash
   yarn install
   ```
4. (Optional) the previous command should automatically link the local package, but it you want to be sure, run:
   ```bash
   yarn link "sparql-query-builder"
   ```
5. To start the application (on port 8000), run:
   ```bash
   yarn run dev --port 8000
   ```
