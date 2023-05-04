/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *         - role
 *       properties:
 *         role:
 *           type: string
 *           description: The auto-generated id of the comment
 *       example:
 *         role: SELLER
 */

/**
 * @swagger
 * /users/{id}/role:
 *      patch:
 *          tags: [User roles and permissions]
 *          summary: Admin assigns roles to users.
 *          security:
 *            - bearerAuth: []
 *          parameters:
 *            - in: path
 *              name: id
 *              schema:
 *                type: string
 *              required: true
 *              description: The user id
 *          requestBody:
 *              required: true
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/Role'
 *          responses:
 *                  201:
 *                     description: Got all users
 *                  400:
 *                     description: Bad Request
 *                  404:
 *                     description: Not Found
 *                  500:
 *                     description: Internal server error
 *
 */
