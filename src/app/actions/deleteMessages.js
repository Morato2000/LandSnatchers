'use server';

import  {connectDB}  from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteMessage(messageId) {

    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
        throw new { error: "UserId is Required" };
    }
    
    const {userId} = sessionUser;

    await connectDB();

    const message = await Message.findById(messageId);

    if (!message.recipient.toString() === userId) {
        throw new { error: "You are not authorized to delete this message" };
    }

    await Message.deleteOne();

    revalidatePath('/', 'layout');

}

export default deleteMessage;