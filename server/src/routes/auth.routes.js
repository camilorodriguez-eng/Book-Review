import { Router } from "express";
import { registerUser, loginUser, logoutUser} from "../controllers/login.controller.js";
import { getBook, searchBook } from "../controllers/book.controller.js";

import authentication from "../middleware/authentication.js";

const app = Router();

// rutas publicas 
app.post("/register", registerUser);
app.post("/login", loginUser);
app.post("/logout", logoutUser);

// rutas privadas
app.get("/book", authentication, getBook);
app.get("/search", authentication, searchBook);

export default app;