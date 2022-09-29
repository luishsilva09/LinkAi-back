import joi from "joi";

export const linkData = joi.object({
  tag: joi.string().trim().required(),
  originalLink: joi.string().trim().uri().required(),
});
