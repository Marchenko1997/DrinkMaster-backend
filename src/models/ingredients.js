import { Schema, model } from 'mongoose';
import { handleMongooseError } from '../helpers/index.js';


const ingredientSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ingredientThumb: {
      type: String,
      required: true,
    },
    'thumb-medium': {
      type: String,
      required: true,
    },
    'thumb-small': {
      type: String,
      required: true,
    },
    abv: {
      type: String,
      required: true,
    },
    alcohol: {
      type: String,
      required: true,
      enum: ['Yes', 'No'],
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    flavour: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

ingredientSchema.post("save", handleMongooseError);

export const Ingredient = model("ingredient", ingredientSchema);
