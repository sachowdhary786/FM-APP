import { Field, InputType, ObjectType } from 'type-graphql';
import { IsEmail, MaxLength, MinLength } from 'class-validator'; 

// Structure of the data the client sends to the server
@InputType()
export class SignUpInput {
  @Field(() => String)
    name: string; 

  @IsEmail()
  @Field(() => String)
    email: string; 

  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(32, { message: 'Password must be no more than 32 characters long' })
  @Field(() => String)
    password: string;
  
  @Field(() => String)
    passwordConfirm: string | undefined;

  @Field(() => String)
    photo: string;
}

// Structure of the data the client sends to the server
@InputType()
export class LoginInput {
  @IsEmail()
  @Field(() => String)
    email: string; 

  @MinLength(8, { message: 'Invalid Email or Password' })
  @MaxLength(32, { message: 'Invalid Email or Password' })
  @Field(() => String)
    password: string;
}

// Structure of the data the server returns to the client 
@ObjectType() 
export class UserData{
  @Field(() => String)
  readonly _id: string;

  @Field(() => String, { nullable: true })
  readonly id: string;
  
  @Field(() => String)
    name: string;

  @Field(() => String)
    email: string;

  @Field(() => String)
    role: string;

  @Field(() => String)
    photo: string;

  @Field(() => Date)
    createdAt: Date;

  @Field(() => Date)
    updatedAt: Date;
}

// Structure of the data the server returns to the client 
@ObjectType()
export class UserRepsonse {
  @Field(() => String)
    status: string;

  @Field(() => UserData)
    user: UserData;
}

// Structure of the data the server returns to the client 
@ObjectType() 
export class LoginResponse {
  @Field(() => String)
    status: string; 

  @Field(() => String)
    access_token: string; 
}