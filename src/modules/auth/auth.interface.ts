export type AuthModuleOptions = {
  secret?: string;
};
export type Payload = {
  email: string;
  sub: string;
};

export type JWTDecodeValue = {
  iat: number;
  exp: number;
  iss?: string;
  aud?: string | string[];
} & Payload;

export type JwtGenerateOption = {
  audience?: string | string[];
  issuer?: string;
  jwtid?: string;
};
