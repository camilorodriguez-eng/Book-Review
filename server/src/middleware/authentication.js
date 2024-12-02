import jwt from "jsonwebtoken";

export const authenticationCookie = (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token || token.trim() === "") {
        return res.status(401).json({ message: "Access denied, no token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

export default authenticationCookie;