import {
  getModelForClass, prop, pre, ModelOptions, Severity, index
} from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';

// Typegoose is a library that wraps around Mongoose to allow us to write
// Mongoose models using TypeScript decorators and classes.
// Typegoose makes heavy use of decorators to make the models type-rich with TypeScript

@pre<User>('save', async function (next) {
  if (!this.isModified('password')) return next();

  // Hash the users password with a factor of 12 before we save the document to the database
  this.password = await bcrypt.hash(this.password, 12);
  // Set to undefined so that the field is removed from the document on save 
  this.passwordConfirm = undefined;
  return next();
})

// Model Options is used to set options on a Class
// Adds the createdAt and updatedAt fields 
@ModelOptions({
  schemaOptions: {
    timestamps: true, 
  },
  options: {
    allowMixed: Severity.ALLOW,
  }
})

// Index added to the email field 
@index({ email: 1 })

  
// User class created with all attributes added to the model using TypeGoose decorators
export class User {
  readonly _id: string;

  @prop({ required: true })
    name: string; 
  
  // Each user registered to the system  must have a unique email address
  @prop({ required: true, unique: true, lowercase: true })
    email: string; 

  @prop({ default: 'user' })
    role: string;

  @prop({ required: true, select: false })
    password: string;

  @prop({ required: true })
    passwordConfirm: string | undefined;

  @prop({ default: 'default.jpg' })
    photo: string;

  @prop({ default: true, select: false })
    verified: boolean;

  static async comparePasswords(hashedPassword: string, candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, hashedPassword)
  }
}

// use getModelForClass to extract the Mongoose Model from the defined class 
const UserModel = getModelForClass<typeof User>(User);
export default UserModel;