export class CustomerModel {
  constructor(
    public userName: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public gender: string
  ) {}
}
export interface CustomerData {
  firstName: string;
  lastName: string;
  userName: string;
}

export interface CustomerUserModel {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
}
