const { Encoder, Model, ForeignField, Bs58Field } = require('../lib/encoder')

describe('Encoder', () => {
  const expectedArray = [145, 169, 116, 101, 115, 116,  86,  97, 108, 117, 101]
  let encoder
  
  beforeEach(() => {
    encoder = new Encoder({ someType: { someField: 'string' }})
  })

  it('should add default encode/decode to fields when added through constructor', () => {
    const model = encoder.getModel('someType')
    expect(model.fields.someField.encode).to.be.a('function')
    expect(model.fields.someField.decode).to.be.a('function')
  })

  it('should add default encode/decode to fields when adding model', () => {
    encoder = new Encoder()
    encoder.addModel('someType', {
      fields: {
        someField: {}
      }
    })
    const model = encoder.getModel('someType')
    expect(model.fields.someField.encode).to.be.a('function')
    expect(model.fields.someField.decode).to.be.a('function')
  })

  it('Should construct with default classes', () => {
    const encoder = new Encoder()
    expect(encoder.registry.get('model.default')).to.equal(Model)
    expect(encoder.registry.get('field.bs58')).to.equal(Bs58Field)
    expect(encoder.registry.get('field.foreign')).to.equal(ForeignField)
  })

  it('should encode data using the specified model', () => {
    const result = encoder.encode('someType', { someField: 'testValue' })
    const expectedArray = [145, 169, 116, 101, 115, 116,  86,  97, 108, 117, 101]
    const resultArray = [...result]
    expect(resultArray).to.deep.equal(expectedArray)
  })

  it('should decode data using the specified model', () => {
    const buffer = Buffer.from(expectedArray)
    const result = encoder.decode('someType', buffer)
    expect(result.someField).to.equal('testValue')
  })

  it('should handle list encoding and decoding', () => {
    encoder = new Encoder({
      someType: { someField: { list: 'string' }}
    })
    const encoded = encoder.encode('someType', { someField: ['test1', 'test2'] })
    const encodedArray = [...encoded]
    const expectedArray = [145, 146, 165, 116, 101, 115, 116,  49, 165, 116, 101, 115, 116, 50]
    expect(encodedArray).to.eql(expectedArray)
    const decoded = encoder.decode('someType', encoded)
    expect(decoded.someField).to.eql(['test1', 'test2'])
  })
})

/* // @todo
describe('Bs58Field', () => {
  it('should validate string data as valid', () => {
    // const field = new Bs58Field()
    // expect(field._valid('someString')).to.be.true
  })

  it('should not validate non-string data', () => {
    // const field = new Bs58Field()
    // expect(field._valid(123)).to.be.false
    // expect(field._valid({})).to.be.false
    // expect(field._valid([])).to.be.false
  })

  // Add more tests related to the `encode` and `decode` methods
})
describe.omit('Bs58Field', () => {
  // let field = new Bs58Field()

  it.omit('should validate correctly', () => {
    assert.isTrue(field._valid('string'))
    assert.isFalse(field._valid(123))
  })

  it.omit('should encode and decode correctly', () => {
    let encoded = field.encode('testValue') 
    let decoded = field.decode(encoded)
    assert.equal(decoded, 'testValue')
  })
})

describe('EncoderForeignField', () => {
  // Assuming an implementation for Codex.Field.Foreign and some mock data.
  // Tests will be similar to Bs58Field but with a focus on encoding and decoding foreign fields.
})

describe('EncoderModel', () => {
  let model = new Model()

  it('should encode and decode correctly', () => {
    let testData = { key: 'value' }
    let encoded = model.encode(testData) 
    let decoded = model.decode(encoded)
    assert.deepEqual(decoded, testData)
  })
})

const models = {
  user: { name: 'string', age: 'number' },
  post: { title: 'string', body: 'string', author: 'user' },
}

describe('@basd/encoder', () => {
  describe('Encoder', () => {
    let encoder

    beforeEach(() => {
      encoder = new Encoder(models)
    })

    it('should create a user model', () => {
      const data = { name: 'Alice', age: 33 }
      const user = encoder.create('user', data)
      expect(user.name).to.equal('Alice')
      expect(user.age).to.equal(33)
    })

    it('should create, encode and decode a post', () => {
      let data = { name: 'Alice', age: 33 }
      let user = encoder.create('user', data)
      let content = { title: 'Hello', body: 'World', author: user }
      let post = encoder.create('post', content)

      let encoded = encoder.encode('post', post)
      let decoded = encoder.decode('post', encoded)

      expect(decoded.title).to.equal('Hello')
      expect(decoded.body).to.equal('World')
      expect(decoded.author.name).to.equal('Alice')
      expect(decoded.author.age).to.equal(33)
    })
  })

  describe('Base58Field', () => {
    it('should encode a Base58 string', () => {
      const value = 'test'
      const base58Value = bs58.encode(Buffer.from(value))
      const base58Field = new Encoder.Base58Field()
      const encodedValue = base58Field.encode(base58Value)
      expect(encodedValue.toString()).to.equal(Buffer.from(value).toString())
    })

    it('should decode a Base58 string', () => {
      const value = 'test'
      const base58Value = bs58.encode(Buffer.from(value))
      const base58Field = new Encoder.Base58Field()
      const decodedValue = base58Field.decode(Buffer.from(value))
      expect(decodedValue).to.equal(base58Value)
    })
  })

  describe('EncoderForeignField', () => {
    it('should encode a foreign field', () => {
      const encoder = new Encoder(models)
      const foreignField = new Encoder.EncoderForeignField({ codex: encoder, type: 'user' })
      const user = { name: 'Alice', age: 33 }
      const encodedUser = foreignField.encode(user)
      expect(encodedUser).to.deep.equal(encoder.encode('user', user))
    })

    it('should decode a foreign field', () => {
      const encoder = new Encoder(models)
      const foreignField = new Encoder.EncoderForeignField({ codex: encoder, type: 'user' })
      const user = { name: 'Alice', age: 33 }
      const encodedUser = encoder.encode('user', user)
      const decodedUser = foreignField.decode(encodedUser)
      expect(decodedUser).to.deep.equal(user)
    })
  })

  describe('EncoderModel', () => {
    let model

    beforeEach(() => {
      const encoder = new Encoder(models)
      model = new Encoder.EncoderModel({ fields: models.user, codex: encoder })
    })

    it('should encode a model', () => {
      const data = { name: 'Alice', age: 33 }
      const encoded = model.encode(data)
      const expected = msgpack.encode([data.name, data.age])
      expect(encoded.toString()).to.equal(expected.toString())
    })

    it('should decode a model', () => {
      const data = { name: 'Alice', age: 33 }
      const encoded = msgpack.encode([data.name, data.age])
      const decoded = model.decode(encoded)
      expect(decoded).to.deep.equal(data)
    })
  })

  // Encoder class tests can remain the same as they were written earlier.
})

*/
