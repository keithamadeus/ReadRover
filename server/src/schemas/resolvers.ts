import User from '../models/User.js';
import { signToken } from '../utils/auth.js';



const resolvers = {
  Query: {
    me: async (_: any, __: any, context: { req: any }) => {
      if (context.req.user) {
        return User.findById(context.req.user._id);
      }
      throw new Error('Not authenticated');
    },
  },
  Mutation: {
    login: async (_: any, { email, password }: { email: string; password: string }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new Error('Incorrect credentials');
      }

      const token = signToken(user as { username: string; email: string; _id: string });
      return { token, user };
    },
    addUser: async (_: any, { username, email, password }: { username: string; email: string; password: string }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user as { username: string; email: string; _id: string });
      return { token, user };
    },
    saveBook: async (_: any, { book }: { book: any }, context: { req: any }) => {
      if (context.req.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.req.user._id,
          { $addToSet: { savedBooks: book } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw new Error('Not authenticated');
    },
    removeBook: async (_: any, { bookId }: { bookId: string }, context: { req: any }) => {
      if (context.req.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.req.user._id,
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new Error('Not authenticated');
    },
  },
};

export default resolvers;