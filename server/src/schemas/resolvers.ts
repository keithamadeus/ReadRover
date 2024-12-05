// Define the query and mutation functionality to work with the Mongoose models.
import { User } from '../models/User';
import { signToken } from '../services/auth';
import type { Request, Response } from 'express';

interface MeArgs {
  user_id: string;
}

interface AddUserArgs {
  username: string;
  email: string;
  password: string;
}

const resolvers = {
  Query: {
    me: async (_: any, args: MeArgs, context: { req: Request }) => {
      const foundUser = await User.findOne({
        $or: [{ _id: context.req.user ? context.req.user._id : args.user_id }, { username: args.username }],
      });

      if (!foundUser) {
        throw new Error('Cannot find a user with this id!');
      }

      return foundUser;
    },
  },
  Mutation: {
    addUser: async (_: any, args: AddUserArgs) => {
      const user = await User.create(args);

      if (!user) {
        throw new Error('Something is wrong!');
      }
      const token = signToken(user.username, user.password, user._id);
      return { token, user };
    },
    login: async (_: any, args: { username: string; email: string; password: string }) => {
      const user = await User.findOne({ $or: [{ username: args.username }, { email: args.email }] });
      if (!user) {
        throw new Error("Can't find this user");
      }

      const correctPw = await user.isCorrectPassword(args.password);

      if (!correctPw) {
        throw new Error('Wrong password!');
      }
      const token = signToken(user.username, user.password, user._id);
      return { token, user };
    },
    saveBook: async (_: any, args: { book: any }, context: { req: Request }) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.req.user._id },
          { $addToSet: { savedBooks: args.book } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      } catch (err) {
        console.log(err);
        throw new Error('Error saving book');
      }
    },
    deleteBook: async (_: any, args: { bookId: string }, context: { req: Request }) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.req.user._id },
        { $pull: { savedBooks: { bookId: args.bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        throw new Error("Couldn't find user with this id!");
      }
      return updatedUser;
    },
  },
};

export default resolvers;