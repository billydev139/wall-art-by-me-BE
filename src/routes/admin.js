import express from "express";
const router = express.Router();
import {
  addArt,
  deleteArtById,
  getArtById,
  updateArtById,
  getOrders,
  getOrder,
  updateOrder,
  delSingleImage,
  myTeam,
  deleteAdmin,
  editAdmin,
  adminRegister,
  addFrame,
  getFrame,
  editFrame,
  deleteFrame,
} from "../controllers/admin/admin.js";
import { isAdmin, isAuthorization } from "../../src/middleware/auth.js";
import { profileImg } from "../middleware/storage.js";
/**
 *  @swagger
 *  tags:
 *    name: Admin
 *    description: APIs for managing art by admin
 */

/**
 * @swagger
 * /admin/addArt:
 *   post:
 *     summary: Add a new piece of art
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               artisticStyle:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               price:
 *                 type: number
 *               size:
 *                 type: string
 *               artist:
 *                 type: string
 *               description:
 *                 type: string
 *               orientation:
 *                 type: string
 *                 enum:
 *                   - Portrait
 *                   - Square
 *                   - Landscape
 *               frameOption:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     price:
 *                       type: number
 *                     size:
 *                       type: string
 *                     name:
 *                       type: string
 *               posterFrame:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     price:
 *                       type: number
 *                     color:
 *                       type: string
 *                     material:
 *                       type: string
 *     responses:
 *       200:
 *         description: Art added successfully
 *       500:
 *         description: Internal Server Error
 */

router
  .route("/addArt")
  .post(
    isAdmin,
    isAuthorization(["ADMIN", "CONTENT_WRITER"]),
    profileImg,
    addArt
  );

/**
 * @swagger
 * /admin/getArt/{id}:
 *   get:
 *     summary: Get art by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the art
 *     responses:
 *       200:
 *         description: Art found
 *       404:
 *         description: Art not found
 *       500:
 *         description: Internal Server Error
 */
router.route("/getArt/:id").get(getArtById);

/**
 * @swagger
 * /admin/deleteArt/{id}:
 *   delete:
 *     summary: Delete art by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the art
 *     responses:
 *       200:
 *         description: Art deleted successfully
 *       404:
 *         description: Art not found
 *       500:
 *         description: Internal Server Error
 */

router
  .route("/deleteArt/:id")
  .delete(isAdmin, isAuthorization(["ADMIN", "CONTENT_WRITER"]), deleteArtById);

router
  .route("/updateArtById/:id")
  .patch(
    isAdmin,
    isAuthorization(["ADMIN", "CONTENT_WRITER"]),
    profileImg,
    updateArtById
  );

// get orders
/**
 * @swagger
 * /admin/getOrders/:
 *   get:
 *     summary: This api is used to get the all order in admin side.The orderStatus is ["Pending", "Shipped", "Delivered"]
 *     tags: [Admin]
 *     parameters:
 *     - in: query
 *       name: page
 *       type: string
 *     - in: query
 *       name: orderStatus
 *       type: string
 *     - in: query
 *       name: aritisticStyle
 *       type: string
 *     responses:
 *       200:
 *         description: Art found
 *       404:
 *         description: Art not found
 *       500:
 *         description: Internal Server Error
 */

router
  .route("/getOrders")
  .get(isAdmin, isAuthorization(["ADMIN", "ORDER_PICKER"]), getOrders);

// get single order
/**
 * @swagger
 * /admin/getOrder/{id}:
 *   get:
 *     summary: This api is used to get single order by id
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the order
 *
 *     responses:
 *       200:
 *         description: Art found
 *       404:
 *         description: Art not found
 *       500:
 *         description: Internal Server Error
 */

//get Single Order
router
  .route("/getOrder/:id")
  .get(isAdmin, isAuthorization(["ADMIN", "ORDER_PICKER"]), getOrder);

//update Order

/**
 * @swagger
 * /admin/updateOrder/{id}:
 *   patch:
 *     summary: Update order status user this enum to update the status ["Pending", "Shipped", "Delivered"] by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the art
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderStatus:
 *                 type: string
 *     responses:
 *       200:
 *         description: Art updated successfully
 *       404:
 *         description: Art not found
 *       500:
 *         description: Internal Server Error
 */

router
  .route("/updateOrder/:id")
  .patch(isAdmin, isAuthorization(["ADMIN", "ORDER_PICKER"]), updateOrder);

/**
 * @swagger
 * paths:
 *   /admin/delSingleImage/{id}/{image}:
 *     delete:
 *       summary: Delete a single image from the art collection
 *       tags: [Admin]
 *       description: Deletes a specified image from an art piece by its ID.
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *           description: The ID of the art piece.
 *         - name: image
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *           description: The filename of the image to be deleted.
 *       responses:
 *         '200':
 *           description: Image deleted successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Image Deleted Successfully
 *         '404':
 *           description: Not Found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Image not found
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   errorMessage:
 *                     type: string
 *                     example: Internal server error message
 */
router
  .route("/delSingleImage/:id/:image")
  .delete(
    isAdmin,
    isAuthorization(["ADMIN", "CONTENT_WRITER"]),
    delSingleImage
  );

/**
 * @swagger
 * /admin/myTeam:
 *   get:
 *     summary: Retrieve a list of all team members or a single admin
 *     tags: [Admin]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: The admin ID
 *     responses:
 *       200:
 *         description: A list of all team members or a single admin
 *       404:
 *         description: Admin not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
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
router.route("/myTeam").get(isAdmin, isAuthorization(["ADMIN"]), myTeam);

/**
 * @swagger
 * /admin/delTeamMember/{id}:
 *   delete:
 *     summary: Delete an admin by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin ID
 *     responses:
 *       200:
 *         description: Admin deleted
 *       404:
 *         description: Admin not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
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
router
  .route("/delTeamMember/:id")
  .delete(isAdmin, isAuthorization(["ADMIN"]), deleteAdmin);

/**
 * @swagger
 * /admin/editTeamMember/{id}:
 *   put:
 *     summary: Edit a team member by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The admin ID
 *     description: Endpoint for editing a team member's details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *                 description: User's username
 *               email:
 *                 type: string
 *                 example: user@example.com
 *                 description: User's email
 *               phone:
 *                 type: string
 *                 example: +1234567890
 *                 description: User's phone number
 *               password:
 *                 type: string
 *                 example: Pa$$w0rd!
 *                 description: User's password
 *               role:
 *                 type: string
 *                 example: Admin
 *                 description: User's role ["ADMIN", "CONTENT_WRITER", "ORDER_PICKER"]
 *     responses:
 *       200:
 *         description: Team member edited successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 admin:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *       404:
 *         description: Team member not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
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
router
  .route("/editTeamMember/:id")
  .put(isAdmin, isAuthorization(["ADMIN"]), editAdmin);

/**
 * @swagger
 * paths:
 *   /admin/adminRegister:
 *     post:
 *       summary: admin registration
 *       tags:
 *         - Admin
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
 * paths:
 *   /admin/addFrame:
 *     post:
 *       summary: Add a new frame
 *       tags:
 *         - Admin
 *       description: Endpoint for adding a new frame
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 frameOption:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       price:
 *                         type: number
 *                         example: 100
 *                         description: Price of the frame option
 *                       size:
 *                         type: string
 *                         example: "8x10"
 *                         description: Size of the frame option
 *                       name:
 *                         type: string
 *                         example: "Classic Frame"
 *                         description: Name of the frame option
 *                 frameExtras:
 *                   type: string
 *                   example: "Mounted"
 *                   description: Extra features for the frame
 *                 posterFrame:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       price:
 *                         type: number
 *                         example: 150
 *                         description: Price of the poster frame
 *                       color:
 *                         type: string
 *                         example: "Black"
 *                         description: Color of the poster frame
 *                       material:
 *                         type: string
 *                         example: "Wood"
 *                         description: Material of the poster frame
 *       responses:
 *         '200':
 *           description: Frame Saved Successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Frame Saved Successfully
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   errorMessage:
 *                     type: string
 *                     example: An error occurred
 */

router
  .route("/addFrame")
  .post(isAdmin, isAuthorization(["ADMIN", "CONTENT_WRITER"]), addFrame);


/**
 * @swagger
 * paths:
 *   /admin/getFrame:
 *     get:
 *       summary: Get frame 
 *       tags:
 *         - Admin
 *       description: Endpoint for retrieving a frame
 *       responses:
 *         '200':
 *           description: Frame retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   frame:
 *                     $ref: '#/components/schemas/Frame'
 *         '404':
 *           description: Frame not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   errorMessage:
 *                     type: string
 *                     example: Frame not found
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   errorMessage:
 *                     type: string
 *                     example: An error occurred
 */
router
  .route("/getFrame")
  .get( getFrame);

/**
 * @swagger
 * paths:
 *   /admin/deleteFrame/{id}:
 *     delete:
 *       summary: Delete frame by ID
 *       tags:
 *         - Admin
 *       description: Endpoint for deleting a frame by its ID
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: The ID of the frame to delete
 *       responses:
 *         '200':
 *           description: Frame deleted successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Frame deleted successfully
 *         '404':
 *           description: Frame not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   errorMessage:
 *                     type: string
 *                     example: Frame not found
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   errorMessage:
 *                     type: string
 *                     example: An error occurred
 */
router
  .route("/deleteFrame/:id")
  .delete(isAdmin, isAuthorization(["ADMIN", "CONTENT_WRITER"]), deleteFrame);


/**
 * @swagger
 * paths:
 *   /admin/editFrame/{id}:
 *     put:
 *       summary: Edit frame
 *       tags:
 *         - Admin
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: The admin ID
 *       description: Endpoint for editing a frame
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 frameOption:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       price:
 *                         type: number
 *                         example: 100
 *                         description: Price of the frame option
 *                       size:
 *                         type: string
 *                         example: "8x10"
 *                         description: Size of the frame option
 *                       name:
 *                         type: string
 *                         example: "Classic Frame"
 *                         description: Name of the frame option
 *                 frameExtras:
 *                   type: string
 *                   example: "Mounted"
 *                   description: Extra features for the frame
 *                 posterFrame:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       price:
 *                         type: number
 *                         example: 150
 *                         description: Price of the poster frame
 *                       color:
 *                         type: string
 *                         example: "Black"
 *                         description: Color of the poster frame
 *                       material:
 *                         type: string
 *                         example: "Wood"
 *                         description: Material of the poster frame
 *       responses:
 *         '200':
 *           description: Edit Frame Successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Edit Frame Successfully
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   errorMessage:
 *                     type: string
 *                     example: An error occurred
 */

router
  .route("/editFrame/:id")
  .put(isAdmin, isAuthorization(["ADMIN", "CONTENT_WRITER"]), editFrame);



export default router;
   