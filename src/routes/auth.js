import express from "express";
const router = express.Router();
import { adminLogin,  logOut } from "../controllers/auth/auth.js";
import { isAdmin, isAuthorization } from "../../src/middleware/auth.js";
/**
 * @swagger
 * paths:
 *   /auth/adminLogin:
 *     post:
 *       summary: admin login
 *       tags:
 *         - Auth
 *       description: Endpoint for user to login
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: user@example.com
 *                   description: User's email
 *                 password:
 *                   type: string
 *                   example: Pa$$w0rd!
 *                   description: User's password
 *       responses:
 *         '200':
 *           description: admin logged in successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   message:
 *                     type: string
 *                     example: admin logged in successfully
 *                   token:
 *                     type: string
 *                     example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         '203':
 *           description: Validation error or user not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: Invalid Email & Password
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: Internal Server Error
 */

router.route("/adminLogin").post(adminLogin);


/**
 * @swagger
 * /auth/logOut:
 *   get:
 *     summary: Log out an admin
 *     tags: [Auth]
 *     description: Endpoint for logging out an admin
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 success:
 *                   type: boolean
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 */
router.route("/logOut").get(isAdmin, isAuthorization(["ADMIN"]), logOut);

export default router;
