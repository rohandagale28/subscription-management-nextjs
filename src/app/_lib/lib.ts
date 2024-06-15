'use server'
import { JWTPayload, jwtVerify, SignJWT } from "jose";



const key = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET!)


export async function encrypt(payload: JWTPayload | undefined) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1day")
        .sign(key);
}

export async function decrypt(data: string | Uint8Array) {
    const { payload } = await jwtVerify(data, key, {
        algorithms: ["HS256"],
    });
    return payload;
}