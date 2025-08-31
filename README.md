# @lamersv/clean

Este pacote fornece funções utilitárias em TypeScript para limpeza e formatação de strings, geração de códigos, validações comuns de dados brasileiros e manipulação simples de HTML e URI. O objetivo é oferecer chamadas pequenas e diretas para tarefas recorrentes de back-end e front-end. O código-fonte está em TypeScript e a publicação expõe a saída compilada em `dist`. A distribuição segue o mapa de exports para o módulo principal e também para importação direta de módulos específicos.

Repositório: https://github.com/LamersV/lamers-clean  
Homepage: https://github.com/LamersV/lamers-clean#readme  
Versão: 1.0.0

## Instalação

Este pacote é publicado no GitHub Packages sob o escopo `@lamersv`. Para instalar é necessário configurar um token de acesso pessoal com permissão de leitura de packages e adicionar sua autenticação no `.npmrc`. Em um ambiente típico, crie ou ajuste o arquivo `.npmrc` no seu projeto apontando para o registro do GitHub:

```
@lamersv:registry=https://npm.pkg.github.com
```

Depois disso, instale normalmente com seu gerenciador preferido. Exemplos com npm, yarn e pnpm:

```
npm install @lamersv/clean
```

```
yarn add @lamersv/clean
```

```
pnpm add @lamersv/clean
```

## Uso básico

Você pode importar tudo do índice ou importar módulos específicos conforme sua necessidade. Abaixo alguns exemplos diretos de uso. Todos os exemplos utilizam ESM/TypeScript, mas o pacote também pode ser consumido em projetos JavaScript padrão.

```ts
// Importação do índice com agregação de módulos
import { cleanString, capitalize, toCurrency, toCPF, toCNPJ, formatLink, validateCPF, validateLink, decodeHTML, encodeURIString, decodeURIString, generateRandomCode, generateRandomPassword, generateTimestamp } from "@lamersv/clean";

// Importação por caminho de módulo, útil para reduzir tamanho do bundle
import { cleanString } from "@lamersv/clean/modules/clean";
import { capitalize } from "@lamersv/clean/modules/format";
import { toCurrency, toCPF, toCNPJ, formatLink } from "@lamersv/clean/modules/format";
import { validateCPF, validateLink } from "@lamersv/clean/modules/validate";
import { decodeHTML } from "@lamersv/clean/modules/html";
import { encodeURIString, decodeURIString } from "@lamersv/clean/modules/uri";
import { generateRandomCode, generateRandomPassword, generateTimestamp } from "@lamersv/clean/modules/generate";
```

## Exemplos práticos

O método `cleanString` normaliza acentos com `NFD`, permite remoção opcional de caracteres especiais, limpeza de conectores comuns em português e substituições baseadas em expressões regulares. As opções aceitas são `trim`, `case` com valores `none`, `lower` e `upper`, `removeSpecial`, `removeJoiners` e `replace` com uma lista de objetos contendo `searchValue`, `replaceValue` e opcionalmente `flags`.

```ts
import { cleanString } from "@lamersv/clean";

const texto = " João  da Silva — São Paulo ";
const limpo = cleanString(texto, {
  trim: true,
  case: "none",
  removeSpecial: true,
  removeJoiners: true,
  replace: [{ searchValue: /\\s{2,}/g, replaceValue: " " }],
});
// "Joao Silva Sao Paulo"
```

A função `capitalize` trabalha com capitalização de uma palavra isolada ou de uma frase completa, preservando preposições e conectores comuns quando não estão no início do texto.

```ts
import { capitalize } from "@lamersv/clean";

capitalize("joão");            // "João"
capitalize("joão da silva", { all: true }); // "João da Silva"
```

Para formatação monetária em reais utilize `toCurrency`, que delega ao `Intl.NumberFormat` com locale `pt-BR` e moeda `BRL`.

```ts
import { toCurrency } from "@lamersv/clean";

toCurrency(1234.5); // "R$ 1.234,50"
```

Para documentos nacionais utilize `toCPF` e `toCNPJ`. As duas rotinas validam a entrada e, se inválida, emitem `console.warn` e retornam a string original.

```ts
import { toCPF, toCNPJ } from "@lamersv/clean";

toCPF("12345678909");    // "123.456.789-09" (após validação)
toCNPJ("11222333000181"); // "11.222.333/0001-81" (após validação)
```

Links podem ser saneados com `formatLink`, que remove espaços, mantém o caso original, avisa sobre links inválidos e acrescenta `https://` se o esquema estiver ausente.

```ts
import { formatLink } from "@lamersv/clean";

formatLink(" exemplo.com/teste ");
// "https://exemplo.com/teste"
```

As validações incluem `validateCPF` e `validateLink`. O validador de CPF desconsidera caracteres não numéricos e calcula os dígitos verificadores. O validador de link higieniza a entrada e testa contra uma expressão regular simples.

```ts
import { validateCPF, validateLink } from "@lamersv/clean";

validateCPF("123.456.789-09"); // true/false
validateLink("https://meusite.com/rota"); // true/false
```

Para HTML e URI há funções diretas para decodificar entidades HTML e codificar ou decodificar strings para uso em URIs.

```ts
import { decodeHTML } from "@lamersv/clean";
import { encodeURIString, decodeURIString } from "@lamersv/clean";

decodeHTML("Tom &amp; Jerry"); // "Tom & Jerry"
encodeURIString("a b");        // "a%20b"
decodeURIString("a%20b");      // "a b"
```

A geração de utilidades inclui `generateTimestamp`, `generateRandomCode` com tamanho configurável e `generateRandomPassword` que sempre inclui pelo menos um caractere especial, uma letra maiúscula, uma minúscula e um dígito.

```ts
import { generateTimestamp, generateRandomCode, generateRandomPassword } from "@lamersv/clean";

generateTimestamp();        // "1735649123456"
generateRandomCode(12);     // por exemplo "aZ09Bx..."
generateRandomPassword(12); // senha forte com composição mínima garantida
```

## Mapa de exports

O pacote expõe o ponto de entrada padrão `./dist/index.js` e também `./modules/*` para importações específicas. Em instalações modernas de bundlers e Node.js, isso permite tree-shaking natural quando você aponta para módulos isolados.

```json
{
  ".": {
    "import": "./dist/index.js",
    "require": "./dist/index.js",
    "default": "./dist/index.js",
    "types": "./dist/index.d.ts"
  },
  "./modules/*": {
    "import": "./dist/modules/*.js",
    "require": "./dist/modules/*.js",
    "default": "./dist/modules/*.js",
    "types": "./dist/modules/*.d.ts"
  }
}
```

## Licença

MIT. Consulte o arquivo de licença no repositório oficial.
