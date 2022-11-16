import { profileFull } from "../../utils/types/oauth";
import { NextApiRequest } from "next";
import Redis from "ioredis";

export async function getSession(
    req: NextApiRequest,
    redisClient: Redis
): Promise<profileFull | false> {
    const key = sessionKeyFromRequest(req, "auth");

    // check is user is logged in
    if (key === false) {
        // TODO: this should then use refresh token to get new auth key.
        return false;
    }

    // get user id
    const userId = await redisClient.get(`jwt:${key}`);

    if (!userId) {
        return false;
    }

    // get user profile
    const profile = await redisClient.get(`spotify:${userId}:profile`);

    // make sure user's profile exists
    if (!profile) {
        return false;
    }

    // return user's profile
    return JSON.parse(profile);
}

export function sessionKeyFromRequest(
    req: NextApiRequest,
    cookieName: string
): string | false {
    if (!req.cookies[cookieName] || req.cookies[cookieName] === "") {
        return false;
    }
    return req.cookies[cookieName] ?? "";
}
