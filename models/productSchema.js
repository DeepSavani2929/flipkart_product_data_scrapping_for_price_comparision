// const mongoose = require("mongoose");

// const SizeSchema = new mongoose.Schema(
//   {
//     size: String,
//   },
//   { _id: false }
// );

// const ColorSchema = new mongoose.Schema(
//   {
//     color: String,
//     image: String,
//     url: String,
//   },
//   { _id: false }
// );

// const ProductSchema = new mongoose.Schema(
//   {
//     brandName: String,
//     productName: String,

//     price: Number,
//     mrp: Number,
//     discount: String,

//     images: [String],

//     sizes: [SizeSchema],

//     colors: [ColorSchema],

//     description: [String],

//     sizeFit: String,

//     specifications: {
//       type: Map,
//       of: String,
//     },

//     productCode: {
//       type: String,
//       unique: true,
//       index: true,
//     },

//     offers: [String],

//     url: String,
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("MyntraProduct", ProductSchema);

// const mongoose = require("mongoose");

// const SizeSchema = new mongoose.Schema(
//   {
//     size: String,
//     price: Number 
//   },
//   { _id: false }
// );

// const ColorSchema = new mongoose.Schema(
//   {
//     color: String,
//     image: String,
//     url: String,
//   },
//   { _id: false }
// );

// const ProductSchema = new mongoose.Schema(
//   {
//     brandName: String,
//     productName: String,

//     price: Number,
//     mrp: Number,
//     discount: String,

//     rating: Number,

//     images: [String],

//     sizes: [SizeSchema],

//     colors: [ColorSchema],

//     description: [String],

//     sizeFit: String,

//     specifications: {
//       type: Map,
//       of: String,
//     },

//     productCode: {
//       type: String,
//       unique: true,
//       index: true,
//     },

//     offers: [String],

//     url: String,
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("myntraDataForPriceComparision", ProductSchema);


// const mongoose = require("mongoose");

// const SpecificationSchema = new mongoose.Schema(
//   {
//     key: { type: String, required: true },
//     value: { type: String, required: true },
//   },
//   { _id: false }
// );

// const MyntraProductSchema = new mongoose.Schema(
//   {

//     brand: {
//       type: String,
//       required: true,
//       index: true,
//     },

//     productName: {
//       type: String,
//       required: true,
//       index: true,
//     },

//     commonKey: {
//       type: String,
//       required: true,
//       unique: true,
//       index: true,
//     },

//     productCode: {
//       type: String,
//       required: true,
//       unique: true,
//       index: true,
//     },

//     productUrl: {
//       type: String,
//       required: true,
//     },


//     price: {
//       type: Number,
//       default: null,
//     },

//     mrp: {
//       type: Number,
//       default: null,
//     },

//     discount: {
//       type: String,
//       default: null,
//     },


//     rating: {
//       type: Number,
//       default: null,
//     },

//     ratingCount: {
//       type: String, 
//       default: null,
//     },

//     // 🔹 Media
//     images: {
//       type: [String],
//       default: [],
//     },

//     sizes: {
//       type: [String], 
//       default: [],
//     },


//     highlights: {
//       type: [String],
//       default: [],
//     },


//     sizeFit: {
//       type: String,
//       default: null,
//     },

//     materialCare: {
//       type: String,
//       default: null,
//     },

//     specifications: {
//       type: [SpecificationSchema],
//       default: [],
//     },

 
//     source: {
//       type: String,
//       default: "myntra",
//       index: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("MyntraProduct", MyntraProductSchema);



const mongoose = require("mongoose");

const SpecificationSchema = new mongoose.Schema(
  {
    key: String,
    value: String,
  },
  { _id: false }
);

const MyntraProductSchema = new mongoose.Schema(
  {

    globalProductKey: {
      type: String,
      required: true,
      index: true,
    },


    productCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    productUrl: String,


    brand: String,
    productName: String,


    price: Number,
    mrp: Number,
    discount: String,

    rating: Number,
    ratingCount: String,


    images: [String],


    sizes: [String],

    highlights: [String],
    sizeFit: String,
    materialCare: String,

    specifications: [SpecificationSchema],

    source: {
      type: String,
      default: "myntra",
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("myntrascrappedData", MyntraProductSchema);
