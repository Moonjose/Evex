export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public password: string,
    public photo_url: string | null,
    public phone: string | null,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
