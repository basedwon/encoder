const { _, log } = require('basd')
const Codex = require('@basd/codex')

/**
 * Represents a field that encodes and decodes values using the Base58 format.
 */
class Bs58Field extends Codex.Field {
  /** 
   * Gets the type of the field.
   * @returns {string} The field type.
   */
  static get type() { return 'bs58' }

  /**
   * Validates the data.
   * @param {any} data - The data to validate.
   * @returns {boolean} True if the data is a string; otherwise, false.
   */
  _valid(data) {
    return typeof data === 'string'
  }

  /**
   * Encodes a value using Base58.
   * @param {string} value - The value to encode.
   * @returns {Buffer|undefined} The encoded buffer or the original value if it's null or undefined.
   */
  encode(value) {
    if (_.isNil(value))
      return value
    return _.toBuffer(_.bs58.decode(value))
  }

  /**
   * Decodes a value from Base58.
   * @param {Buffer} value - The buffer to decode.
   * @returns {string|undefined} The decoded string or the original value if it's null or undefined.
   */
  decode(value) {
    if (_.isNil(value))
      return value
    return _.bs58.encode(value)
  }
}

/**
 * Represents a foreign field that can encode and decode values based on another model.
 */
class EncoderForeignField extends Codex.Field.Foreign {
  /**
   * Encodes data using a foreign model.
   * @param {any} data - The data to encode.
   * @returns {any} The encoded data.
   */
  encode(data) {
    return this._model.codex.getModel(this.type).encode(data)
  }

  /**
   * Decodes data using a foreign model.
   * @param {any} data - The data to decode.
   * @returns {any} The decoded data.
   */
  decode(data) {
    return this._model.codex.getModel(this.type).decode(data)
  }
}

/**
 * Represents a model that can encode and decode its fields.
 */
class EncoderModel extends Codex.Model {
  /**
   * Encodes the data of the model.
   * @param {Object} data - The data to encode.
   * @returns {Buffer} The encoded buffer.
   */
  encode(data) {
    const arr = []
    for (const [prop, field] of Object.entries(this.fields)) {
      let value = _.get(data, prop)
      if (field.list)
        value = value.map(v => field.encode(v))
      else
        value = field.encode(value)
      arr.push(value)
    }
    return _.msgpack.encode(arr)
  }

  /**
   * Decodes a buffer into the model's data.
   * @param {Buffer} buffer - The buffer to decode.
   * @returns {Object|null} The decoded entity or null if the buffer isn't binary.
   */
  decode(buffer) {
    if (!_.isBinary(buffer))
      return null
    const arr = _.msgpack.decode(buffer)
    const entity = {}
    for (const [prop, field] of Object.entries(this.fields)) {
      let value = arr.shift()
      if (field.list)
        value = value.map(v => field.decode(v))
      else
        value = field.decode(value)
      _.setWith(entity, prop, value, Object)
    }
    return entity
  }
}

/**
 * Represents a Codex with encoding and decoding capabilities.
 */
class Encoder extends Codex {
  static get Encoder() { return Encoder }
  /**
   * Gets the foreign field class.
   * @returns {Function} The EncoderForeignField class.
   */
  static get ForeignField() { return EncoderForeignField }

  /**
   * Gets the Bs58 field class.
   * @returns {Function} The Bs58Field class.
   */
  static get Bs58Field() { return Bs58Field }

  /**
   * Gets the model class.
   * @returns {Function} The EncoderModel class.
   */
  static get Model() { return EncoderModel }

  /**
   * Initializes a new instance of the Encoder class.
   * @param {Object} models - The models to initialize.
   * @param {Object} opts - The options to initialize.
   * @param {...any} args - Additional arguments.
   */
  constructor(models = {}, opts = {}, ...args) {
    super(models, _.merge({ classes: {
      'model.default': EncoderModel,
      'field.bs58': Bs58Field,
      'field.foreign': EncoderForeignField,
    }}, opts), ...args)
  }

  /**
   * Adds a model to the encoder and ensures it has encoding and decoding functions.
   * @param {string} type - The type of the model.
   * @param {Object} config - The model configuration.
   * @returns {Object} The added model.
   */
  addModel(type, config) {
    const model = super.addModel(type, config)
    for (const [key, field] of _.entries(model.fields)) {
      if (!field.encode) _.objProp(field, 'encode', (data) => data)
      if (!field.decode) _.objProp(field, 'decode', (data) => data)
    }
    return model
  }

  /**
   * Encodes data of a specific model type.
   * @param {string} type - The type of the model.
   * @param {Object} data - The data to encode.
   * @returns {Buffer} The encoded buffer.
   */
  encode(type, data) {
    return this.getModel(type).encode(data)
  }

  /**
   * Decodes data of a specific model type.
   * @param {string} type - The type of the model.
   * @param {Buffer} data - The buffer to decode.
   * @returns {Object} The decoded entity.
   */
  decode(type, data) {
    return this.getModel(type).decode(data)
  }
}

Encoder.Field.Bs58 = Bs58Field

module.exports = Encoder
