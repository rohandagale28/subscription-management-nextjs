import User from "@/model/user.model";
import { connectDB } from "../mongoose";

export const fetchUser = async (userId: string) => {
  try {
    connectDB();

    return await User.findOne({ id: userId });
    // .populate({
    //   path: 'communities',
    //   model: Community,
    // });
  } catch (error: any) {
    console.log(error);
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
};
