declare module '@basd/encoder' {
  export class Bs58Field extends Codex.Field {
    static type: string;
    _valid(data: any): boolean;
    encode(value: any): Buffer | any;
    decode(value: any): string | any;
  }

  export class EncoderForeignField extends Codex.Field.Foreign {
    encode(data: any): any;
    decode(data: any): any;
  }

  export class EncoderModel extends Codex.Model {
    encode(data: any): Buffer;
    decode(buffer: Buffer): any | null;
  }

  export class Encoder extends Codex {
    static ForeignField: typeof EncoderForeignField;
    static Bs58Field: typeof Bs58Field;
    static Model: typeof EncoderModel;
    constructor(models?: any, opts?: any, ...args: any[]);
    addModel(type: string, config: any): any;
    encode(type: string, data: any): Buffer;
    decode(type: string, data: any): any;
  }
}
