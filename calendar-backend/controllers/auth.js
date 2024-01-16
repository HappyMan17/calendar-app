import { response } from "express";
import { userMapper } from "../mappers/userMapper.js";

export const createUser = (req, res = response) => {
  const user = userMapper(req.body);

  res.json({
    ok: true,
    message: 'Register made',
    user,
  });
};

export const loginUser = (req, res = response) => {
  const { data, error } = userMapper(req.body);

  if (error) {
    res.status(error.status).json({ error });
  }

  res.json({
    ok: true,
    message: 'Register made',
    user: data,
  });
};

export const checkUserToken = (req, res = response) => {
  res.json({
    ok: true,
    message: 'Ok',
  });
};
