import express from "express";
const router = express.Router();
import { adminLogin, adminRegister, logOut } from "../controllers/auth/auth.js";
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
 * paths:
 *   /auth/adminRegister:
 *     post:
 *       summary: admin registration
 *       tags:
 *         - Auth
 *       description: Endpoint for admin registration
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   example: johndoe
 *                   description: User's username
 *                 email:
 *                   type: string
 *                   example: user@example.com
 *                   description: User's email
 *                 phone:
 *                   type: string
 *                   example: +1234567890
 *                   description: User's phone number
 *                 password:
 *                   type: string
 *                   example: Pa$$w0rd!
 *                   description: User's password
 *                 role:
 *                   type: string
 *                   example: Admin
 *                   description: User's role user this enum value ["ADMIN", "CONTENT_WRITER", "ORDER_PICKER"]
 *       responses:
 *         '201':
 *           description: User registered successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: User registered successfully
 *         '203':
 *           description: Validation error or user already exists
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: Email Already exists
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   errorMessage:
 *                     type: string
 *                     example: Internal Server Error
 */
router
  .route("/adminRegister")
  .post(isAdmin, isAuthorization(["ADMIN"]), adminRegister);

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
