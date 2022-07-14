const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/userController");

// routes
router.get("/", employeeController.viewall);
router.post("/", employeeController.filter);

router.get("/upload", employeeController.uploadForm);

router.get("/addEmployee", employeeController.employeeForm);
router.post("/addEmployee", employeeController.create);

router.get("/:id", employeeController.remove)

module.exports = router;
