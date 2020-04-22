const Jwt = require("./Jwt");
const validJWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVjNzQxZWFiNzY1MDU1MDAxODMyYWVmMSJ9LCJmb3JtIjp7Il9pZCI6IjVjNzAyNGJiM2EzNjkzMDAxOGY0ZjQ2NCJ9LCJpYXQiOjE1Njg3NDUzMzIsImV4cCI6MTU2ODc1OTczMn0.LtD4j-AuU7TQX_fbbB85P_2mWEcCYZfRwGKdibJvKG8";
const validSecret = "CHANGEME";

const decodedJWT = {
  user: {
    _id: "5c741eab765055001832aef1"
  },
  form: {
    _id: "5c7024bb3a36930018f4f464"
  },
  iat: 1568745332,
  exp: 1568759732
};

test("Should verify a malformed token", () => {
  const token = "abvdcdv.1231,31231231";
  const [error, decoded] = Jwt.verify({ token });
  expect(typeof decoded).toBe("undefined");
  expect(typeof error).toBe("object");
  expect(error.name).toBe("JsonWebTokenError");
  expect(error.message).toBe("jwt malformed");
});

test("Should fail with invalid signature", () => {
  const secret = "ME";
  const [error] = Jwt.verify({ token: validJWT, secret });
  expect(error.name).toBe("JsonWebTokenError");
  expect(error.message).toBe("invalid signature");
});

test("Should verify DATE on valid JWT HS256", () => {
  const [error] = Jwt.verify({ token: validJWT, secret: validSecret });

  expect(error.name).toBe("TokenExpiredError");
});

test("Should encode a payload JWT HS256", () => {
  const token = Jwt.sign({
    payload: decodedJWT,
    secret: validSecret
  });

  expect(typeof token).toBe("string");
  expect(token).toBe(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVjNzQxZWFiNzY1MDU1MDAxODMyYWVmMSJ9LCJmb3JtIjp7Il9pZCI6IjVjNzAyNGJiM2EzNjkzMDAxOGY0ZjQ2NCJ9LCJpYXQiOjE1Njg3NDUzMzIsImV4cCI6MTU2ODc1OTczMn0.LtD4j-AuU7TQX_fbbB85P_2mWEcCYZfRwGKdibJvKG8"
  );
});

test("Should verify a valid JWT token HS256", () => {
  const payload = {
    ...decodedJWT,
    ...{ iat: 1568759732, exp: 9999999999 }
  };
  const SignedPayload = Jwt.sign({
    payload,
    secret: validSecret
  });

  const [error, decoded] = Jwt.verify({
    token: SignedPayload,
    secret: validSecret
  });
  expect(typeof error).toBe("undefined");
  expect(decoded.user._id).toBe("5c741eab765055001832aef1");
});
