
export type Field = { property: string; errors: string[] }
export class HttpException {
  public message: string;
  public code: number;
  public fields?: Field[];
  constructor({ message, code, fields }: { message: string; code: number; fields?: any[] }) {
    this.code = code;
    this.message = message;
    this.fields = fields;
  }
}