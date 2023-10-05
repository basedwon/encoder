# Encoder

[![npm](https://img.shields.io/npm/v/@basd/encoder?style=flat&logo=npm)](https://www.npmjs.com/package/@basd/encoder)
[![pipeline](https://gitlab.com/frenware/utils/encoder/badges/master/pipeline.svg)](https://gitlab.com/frenware/utils/encoder/-/pipelines)
[![license](https://img.shields.io/npm/l/@basd/encoder)](https://gitlab.com/frenware/utils/encoder/-/blob/master/LICENSE)
[![downloads](https://img.shields.io/npm/dw/@basd/encoder)](https://www.npmjs.com/package/@basd/encoder) 

[![Gitlab](https://img.shields.io/badge/Gitlab%20-%20?logo=gitlab&color=%23383a40)](https://gitlab.com/frenware/utils/encoder)
[![Github](https://img.shields.io/badge/Github%20-%20?logo=github&color=%23383a40)](https://github.com/basedwon/encoder)
[![Twitter](https://img.shields.io/badge/@basdwon%20-%20?logo=twitter&color=%23383a40)](https://twitter.com/basdwon)
[![Discord](https://img.shields.io/badge/Basedwon%20-%20?logo=discord&color=%23383a40)](https://discordapp.com/users/basedwon)

A highly extensible encoding library built on top of the @basd/codex package. It provides a convenient way to define models and their associated fields allowing users to easily encode and decode data structures using different encoding schemes such as Base58 and foreign fields.

## Features

- **Custom Field Types**: Supports different field types including `base58` and `foreign`.
- **Flexible Models**: Define and use models easily to work with complex data structures.
- **Encoding and Decoding**: Provides simple and efficient encoding and decoding capabilities.
- **Foreign Field Encoding:** Seamlessly encode and decode foreign fields linked to other models.
- **Bs58 Encoding:** Out-of-the-box support for Base58 encoding and decoding.

## Installation

Install the package with:

```bash
npm install @basd/encoder
```

## Usage

First, import the `Encoder` library.

```js
import Encoder from '@basd/encoder'
```
or
```js
const Encoder = require('@basd/encoder')
```

**Use the Encoder**:
```js
// Define models in the constructor
const encoder = new Encoder({ someType: { someField: 'string' }})

// Define a model by adding it
encoder.addModel('myModelType', { someField: 'string' })
// or
encoder.addModel('myModelType', { fields: { someField: 'string' }})

// Encode the data
const encodedData = encoder.encode('myModelType', data)

// Decode the data
const decodedData = encoder.decode('myModelType', encodedData)
```

### Advanced Usage

Here's an example of using a foreign field to reference another model:

```js
const models = {
  user: { name: 'string', age: 'number' },
  post: { title: 'string', body: 'string', author: 'user' },
}
const encoder = new Encoder(models, opts)
let data = { name: 'Alice', age: 33 }
let user = encoder.create('user', data)
let content = { title: 'Hello', body: 'World', author: user }
let post = encoder.create('post', content)

let encoded = encoder.encode('post', post)
let decoded = encoder.decode('post', encoded)
```

## Documentation

- [API Reference](/docs/api.md)

## Classes

### Base58Field

This class extends the string field type and provides encoding and decoding capabilities specific to the Base58 format.

### EncoderForeignField

The EncoderForeignField class extends the Codex's foreign field type to provide specific encoding and decoding functionality for foreign types.

### EncoderModel

The EncoderModel class provides methods for encoding and decoding a complete model by iterating through the defined fields.

### Encoder

The Encoder class is the main interface for working with models, defining encoding, and decoding methods based on the schema and options provided.

## Tests

In order to run the test suite, simply clone the repository and install its dependencies:

```bash
git clone https://gitlab.com/frenware/utils/encoder.git
cd encoder
npm install
```

To run the tests:

```bash
npm test
```

## Contributing

Thank you! Please see our [contributing guidelines](/docs/contributing.md) for details.

## Donations

If you find this project useful and want to help support further development, please send us some coin. We greatly appreciate any and all contributions. Thank you!

**Bitcoin (BTC):**
```
1JUb1yNFH6wjGekRUW6Dfgyg4J4h6wKKdF
```

**Monero (XMR):**
```
46uV2fMZT3EWkBrGUgszJCcbqFqEvqrB4bZBJwsbx7yA8e2WBakXzJSUK8aqT4GoqERzbg4oKT2SiPeCgjzVH6VpSQ5y7KQ
```

## License

@basd/encoder is [MIT licensed](https://gitlab.com/frenware/utils/encoder/-/blob/master/LICENSE).
