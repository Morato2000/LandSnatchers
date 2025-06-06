"use server";
import { connectDB } from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function markMessageAsRead(messageId) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User is Required");
  }

  const { userId } = sessionUser;

  const message = await Message.findById(messageId);

  if (!message) throw new Error("Message not found");

  //Verify that the message belongs to the user
  if (message.recipient.toString() !== userId) {
    throw new Error("You are not authorized to mark this message as read");
  }
    //Update the message to mark it as read
    message.read = !message.read;

    revalidatePath('/messages', 'page');
    await message.save();
  return message.read;
 
}
export default markMessageAsRead;
