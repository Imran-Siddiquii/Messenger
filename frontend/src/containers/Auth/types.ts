export interface AuthInitialState {
  loading: boolean;
  error: boolean;
  user: any;
  token:string,
  message: string;
}

export interface LoginFormType {
  phone_number: string;
  password: string;
}

export interface SignInFormType extends LoginFormType {
  name: string;
}

export interface LoginAction {
  payload: LoginFormType;
}

export interface SignInAction {
  payload:SignInFormType
}


export interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}