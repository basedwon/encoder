## Classes

<dl>
<dt><a href="#Bs58Field">Bs58Field</a></dt>
<dd><p>Represents a field that encodes and decodes values using the Base58 format.</p>
</dd>
<dt><a href="#EncoderForeignField">EncoderForeignField</a></dt>
<dd><p>Represents a foreign field that can encode and decode values based on another model.</p>
</dd>
<dt><a href="#EncoderModel">EncoderModel</a></dt>
<dd><p>Represents a model that can encode and decode its fields.</p>
</dd>
<dt><a href="#Encoder">Encoder</a></dt>
<dd><p>Represents a Codex with encoding and decoding capabilities.</p>
</dd>
</dl>

<a name="Bs58Field"></a>

## Bs58Field
Represents a field that encodes and decodes values using the Base58 format.

**Kind**: global class  

* [Bs58Field](#Bs58Field)
    * _instance_
        * [._valid(data)](#Bs58Field+_valid) ⇒ <code>boolean</code>
        * [.encode(value)](#Bs58Field+encode) ⇒ <code>Buffer</code> \| <code>undefined</code>
        * [.decode(value)](#Bs58Field+decode) ⇒ <code>string</code> \| <code>undefined</code>
    * _static_
        * [.type](#Bs58Field.type) ⇒ <code>string</code>

<a name="Bs58Field+_valid"></a>

### bs58Field.\_valid(data) ⇒ <code>boolean</code>
Validates the data.

**Kind**: instance method of [<code>Bs58Field</code>](#Bs58Field)  
**Returns**: <code>boolean</code> - True if the data is a string; otherwise, false.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>any</code> | The data to validate. |

<a name="Bs58Field+encode"></a>

### bs58Field.encode(value) ⇒ <code>Buffer</code> \| <code>undefined</code>
Encodes a value using Base58.

**Kind**: instance method of [<code>Bs58Field</code>](#Bs58Field)  
**Returns**: <code>Buffer</code> \| <code>undefined</code> - The encoded buffer or the original value if it's null or undefined.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | The value to encode. |

<a name="Bs58Field+decode"></a>

### bs58Field.decode(value) ⇒ <code>string</code> \| <code>undefined</code>
Decodes a value from Base58.

**Kind**: instance method of [<code>Bs58Field</code>](#Bs58Field)  
**Returns**: <code>string</code> \| <code>undefined</code> - The decoded string or the original value if it's null or undefined.  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>Buffer</code> | The buffer to decode. |

<a name="Bs58Field.type"></a>

### Bs58Field.type ⇒ <code>string</code>
Gets the type of the field.

**Kind**: static property of [<code>Bs58Field</code>](#Bs58Field)  
**Returns**: <code>string</code> - The field type.  
<a name="EncoderForeignField"></a>

## EncoderForeignField
Represents a foreign field that can encode and decode values based on another model.

**Kind**: global class  

* [EncoderForeignField](#EncoderForeignField)
    * [.encode(data)](#EncoderForeignField+encode) ⇒ <code>any</code>
    * [.decode(data)](#EncoderForeignField+decode) ⇒ <code>any</code>

<a name="EncoderForeignField+encode"></a>

### encoderForeignField.encode(data) ⇒ <code>any</code>
Encodes data using a foreign model.

**Kind**: instance method of [<code>EncoderForeignField</code>](#EncoderForeignField)  
**Returns**: <code>any</code> - The encoded data.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>any</code> | The data to encode. |

<a name="EncoderForeignField+decode"></a>

### encoderForeignField.decode(data) ⇒ <code>any</code>
Decodes data using a foreign model.

**Kind**: instance method of [<code>EncoderForeignField</code>](#EncoderForeignField)  
**Returns**: <code>any</code> - The decoded data.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>any</code> | The data to decode. |

<a name="EncoderModel"></a>

## EncoderModel
Represents a model that can encode and decode its fields.

**Kind**: global class  

* [EncoderModel](#EncoderModel)
    * [.encode(data)](#EncoderModel+encode) ⇒ <code>Buffer</code>
    * [.decode(buffer)](#EncoderModel+decode) ⇒ <code>Object</code> \| <code>null</code>

<a name="EncoderModel+encode"></a>

### encoderModel.encode(data) ⇒ <code>Buffer</code>
Encodes the data of the model.

**Kind**: instance method of [<code>EncoderModel</code>](#EncoderModel)  
**Returns**: <code>Buffer</code> - The encoded buffer.  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | The data to encode. |

<a name="EncoderModel+decode"></a>

### encoderModel.decode(buffer) ⇒ <code>Object</code> \| <code>null</code>
Decodes a buffer into the model's data.

**Kind**: instance method of [<code>EncoderModel</code>](#EncoderModel)  
**Returns**: <code>Object</code> \| <code>null</code> - The decoded entity or null if the buffer isn't binary.  

| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>Buffer</code> | The buffer to decode. |

<a name="Encoder"></a>

## Encoder
Represents a Codex with encoding and decoding capabilities.

**Kind**: global class  

* [Encoder](#Encoder)
    * [new Encoder(models, opts, ...args)](#new_Encoder_new)
    * _instance_
        * [.addModel(type, config)](#Encoder+addModel) ⇒ <code>Object</code>
        * [.encode(type, data)](#Encoder+encode) ⇒ <code>Buffer</code>
        * [.decode(type, data)](#Encoder+decode) ⇒ <code>Object</code>
    * _static_
        * [.ForeignField](#Encoder.ForeignField) ⇒ <code>function</code>
        * [.Bs58Field](#Encoder.Bs58Field) ⇒ <code>function</code>
        * [.Model](#Encoder.Model) ⇒ <code>function</code>

<a name="new_Encoder_new"></a>

### new Encoder(models, opts, ...args)
Initializes a new instance of the Encoder class.


| Param | Type | Description |
| --- | --- | --- |
| models | <code>Object</code> | The models to initialize. |
| opts | <code>Object</code> | The options to initialize. |
| ...args | <code>any</code> | Additional arguments. |

<a name="Encoder+addModel"></a>

### encoder.addModel(type, config) ⇒ <code>Object</code>
Adds a model to the encoder and ensures it has encoding and decoding functions.

**Kind**: instance method of [<code>Encoder</code>](#Encoder)  
**Returns**: <code>Object</code> - The added model.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The type of the model. |
| config | <code>Object</code> | The model configuration. |

<a name="Encoder+encode"></a>

### encoder.encode(type, data) ⇒ <code>Buffer</code>
Encodes data of a specific model type.

**Kind**: instance method of [<code>Encoder</code>](#Encoder)  
**Returns**: <code>Buffer</code> - The encoded buffer.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The type of the model. |
| data | <code>Object</code> | The data to encode. |

<a name="Encoder+decode"></a>

### encoder.decode(type, data) ⇒ <code>Object</code>
Decodes data of a specific model type.

**Kind**: instance method of [<code>Encoder</code>](#Encoder)  
**Returns**: <code>Object</code> - The decoded entity.  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The type of the model. |
| data | <code>Buffer</code> | The buffer to decode. |

<a name="Encoder.ForeignField"></a>

### Encoder.ForeignField ⇒ <code>function</code>
Gets the foreign field class.

**Kind**: static property of [<code>Encoder</code>](#Encoder)  
**Returns**: <code>function</code> - The EncoderForeignField class.  
<a name="Encoder.Bs58Field"></a>

### Encoder.Bs58Field ⇒ <code>function</code>
Gets the Bs58 field class.

**Kind**: static property of [<code>Encoder</code>](#Encoder)  
**Returns**: <code>function</code> - The Bs58Field class.  
<a name="Encoder.Model"></a>

### Encoder.Model ⇒ <code>function</code>
Gets the model class.

**Kind**: static property of [<code>Encoder</code>](#Encoder)  
**Returns**: <code>function</code> - The EncoderModel class.  
