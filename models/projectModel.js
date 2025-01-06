import mongoose from 'mongoose';

// Define the National Importance Systems schema
const nationalImportanceSystemSchema = new mongoose.Schema({
  system_id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    maxlength: 255,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['E-commerce', 'Disaster Relief', 'Social Welfare', 'Education', 'Healthcare', 'Other'],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  funding_required: {
    type: mongoose.Types.Decimal128, // Store the required funding amount
    required: true,
  },
  current_funding: {
    type: mongoose.Types.Decimal128,
    default: 0.00,
},
  contribution_type: {
    type: [String], // Array to support multiple types of contributions
    enum: ['Code', 'Financial', 'Advisory', 'Other'],
    required: true,
  },
  status: {
    type: String,
    enum: ['Planned', 'In Development', 'Completed'],
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  git_repo: {
    type: String,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.*\..*/.test(v);
      },
      message: props => `${props.value} is not a valid Git repository URL!`
    }
  },
  contributors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    default: [], // Allow contributors to be added later, start with an empty array
  }],
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true, // Make this field required
  },
});

// Create a model from the schema
const NationalImportanceSystem = mongoose.model('NationalImportanceSystem', nationalImportanceSystemSchema);

export default NationalImportanceSystem;
