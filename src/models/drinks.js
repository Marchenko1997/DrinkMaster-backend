import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { handleMongooseError } from '../helpers/index.js';

const drinkSchema = new Schema(
  {
    drink: {
      type: String,
      required: [true, 'Set name for drink'],
    },
    drinkAlternate: {
      type: String,
      default: 'Sorry, not specified',
    },
    tags: {
      type: String,
      default: 'Sorry, not specified',
    },
    video: {
      type: String,
      default: 'Sorry, not specified',
    },
    category: {
      type: String,
      required: [true, 'Choose category for a drink'],
      enum: [
        'Ordinary Drink',
        'Cocktail',
        'Shake',
        'Other/Unknown',
        'Cocoa',
        'Shot',
        'Coffee / Tea',
        'Homemade Liqueur',
        'Punch / Party Drink',
        'Beer',
        'Soft Drink',
      ],
    },
    IBA: { type: String, default: 'Sorry, not specified' },
    alcoholic: {
      type: String,
      required: true,
      enum: ['Alcoholic', 'Non-alcoholic'],
    },
    glass: {
      type: String,
      requied: [true, 'Choose glass for a drink'],
      enum: [
        'Highball glass',
        'Cocktail glass',
        'Old-fashioned glass',
        'Whiskey Glass',
        'Collins glass',
        'Pousse cafe glass',
        'Champagne flute',
        'Whiskey sour glass',
        'Cordial glass',
        'Brandy snifter',
        'White wine glass',
        'Nick and Nora Glass',
        'Hurricane glass',
        'Coffee mug',
        'Shot glass',
        'Jar',
        'Irish coffee cup',
        'Punch bowl',
        'Pitcher',
        'Pint glass',
        'Copper Mug',
        'Wine Glass',
        'Beer mug',
        'Margarita/Coupette glass',
        'Beer pilsner',
        'Beer Glass',
        'Parfait glass',
        'Mason jar',
        'Margarita glass',
        'Martini Glass',
        'Balloon Glass',
        'Coupe Glass',
      ],
    },
    description: {
      type: String,
      required: [true],
    },
    instruction: {
      type: String,
      required: [true],
    },
    instructionsES: {
      type: String,
      default: 'none',
    },
    instructionsDE: {
      type: String,
      default: 'none',
    },
    instructionsFR: {
      type: String,
      default: 'none',
    },
    instructionsIT: {
      type: String,
      default: 'none',
    },
    instructionsRU: {
      type: String,
      default: 'none',
    },
    instructionsPL: {
      type: String,
      default: 'none',
    },
    instructionsUK: {
      type: String,
      default: 'none',
    },
    drinkThumb: {
      type: String,
      default: null,
    },
    ingredients: [
      {
        title: String,
        measure: String,
        ingredientId: {
          type: Schema.Types.ObjectId,
          ref:'ingredients',
        },
      },
    ],
    shortDescription: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    users: {
      type: [String],
      default: [],
    },
  },
  { versionKey: false, timestamps: true },
);

drinkSchema.post('save', handleMongooseError);

export const Drink = model('recipes', drinkSchema);

export const drinkJoiSchema = Joi.object({
  drink: Joi.string().required().messages({
    'any.required': 'Missing drink name field',
    'string.base': 'The drink must be a string',
  }),
  description: Joi.string().required().messages({
    'any.required': 'Missing drink description field',
  }),
  category: Joi.string()
    .valid(
      'Ordinary Drink',
      'Cocktail',
      'Shake',
      'Other/Unknown',
      'Cocoa',
      'Shot',
      'Coffee / Tea',
      'Homemade Liqueur',
      'Punch / Party Drink',
      'Beer',
      'Soft Drink',
    )
    .required()
    .messages({ 'any.required': 'The category field is required' }),
  alcoholic: Joi.string()
    .valid('Alcoholic', 'Non-alcoholic')
    .required()
    .messages({
      'any.required': `missing required field 'alcoholic' of recipes`,
    }),
  glass: Joi.string()
    .valid(
      'Highball glass',
      'Cocktail glass',
      'Old-fashioned glass',
      'Whiskey Glass',
      'Collins glass',
      'Pousse cafe glass',
      'Champagne flute',
      'Whiskey sour glass',
      'Cordial glass',
      'Brandy snifter',
      'White wine glass',
      'Nick and Nora Glass',
      'Hurricane glass',
      'Coffee mug',
      'Shot glass',
      'Jar',
      'Irish coffee cup',
      'Punch bowl',
      'Pitcher',
      'Pint glass',
      'Copper Mug',
      'Wine Glass',
      'Beer mug',
      'Margarita / Coupette glass',
      'Beer pilsner',
      'Beer Glass',
      'Parfait glass',
      'Mason jar',
      'Margarita glass',
      'Martini Glass',
      'Balloon Glass',
      'Coupe Glass',
    )
    .required()
    .messages({
      'any.required': 'The glass field is required',
    }),
  ingredients: Joi.array()
    .items(
      Joi.object({
        measure: Joi.string().required(),
        title: Joi.string().required(),
        ingredientId: Joi.string().required(),
      }),
    )
    .min(1)
    .required()
    .messages({
      'any.required':
        'The ingredients field is required or missing required measure or title field',
      'array.min': 'The ingredients field must contain at least one ingredient',
    }),
  instruction: Joi.string(),
});

export const searchDrinkSchema = Joi.object({
  letter: Joi.string().min(1).max(20).required().messages({
    'any.required':
      'For search drinks, you must enter one letter to words with the length 20 characters',
  }),
});

export const searchByCategorySchema = Joi.object({
  category: Joi.string()
    .valid(
      'Ordinary Drink',
      'Cocktail',
      'Shake',
      'Other/Unknown',
      'Cocoa',
      'Shot',
      'Coffee / Tea',
      'Homemade Liqueur',
      'Punch / Party Drink',
      'Beer',
      'Soft Drink',
    )
    .required()
    .messages({ 'any.required': 'The category field is required' }),
});

export const searchByIngredientSchema = Joi.object({
  searchIngredient: Joi.string().min(1).max(20).required().messages({
    'any.required':
      'For search drinks, you must choose one of the following ingredients:',
  }),
});

export const searchDrinksByFiltersSchema = Joi.object({
  drink: Joi.string(),
  ingredient: Joi.string(),
  category: Joi.string().max(20).messages({
    'string.max': 'Category should have at most 20 characters',
  }),
});
