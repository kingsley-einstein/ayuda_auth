import { Router } from "express";
import { AuthController } from "../controllers";
import { AuthMiddleware } from "../middlewares";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    statusCode: 200,
    response: {
      prefix: "/api/v1",
      routes: ["/auth/create"]
    }
  });
});

router.post(
  "/auth/create",
  AuthMiddleware.hasKeys,
  AuthMiddleware.checkAlreadyRegistered,
  AuthController.signUp
);

router.post("/auth/signin", AuthController.signIn);

router.patch(
  "/auth/update",
  AuthMiddleware.checkToken,
  AuthController.updateAuthInfo
);

router.get(
  "/auth/getloggeduser",
  AuthMiddleware.checkToken,
  AuthController.getLoggedUser
);

router.get("/auth/byId/:id", AuthController.getUserById);

router.get(
  "/auth/signout",
  AuthMiddleware.checkToken,
  AuthController.logUserOut
);

export default router;
