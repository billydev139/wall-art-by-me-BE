import express from "express";
const router = express.Router();
import { useLogin, userRegister } from "../controllers/auth/auth.js";

/**
 * @swagger
 * paths:
 *   /auth/useLogin:
 *     post:
 *       summary: User login
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
 *           description: User logged in successfully
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
 *                     example: User logged in successfully
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

router.route("/useLogin").post(useLogin);

/**
 * @swagger
 * paths:
*   /auth/userRegister:
*     post:
*       summary: User registration
*       tags: 
*         - Auth
*       description: Endpoint for user registration
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
router.route("/userRegister").post( userRegister);
export default router;
