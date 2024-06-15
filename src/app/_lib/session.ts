import { cookies } from "next/headers";
import { decrypt } from "./lib";
import { redirect } from "next/navigation";

export async function verifySession() {
    const cookie = cookies().get('token')?.value
    const session = await decrypt(cookie)

    if (!session) {
        redirect('/login')
    }
}