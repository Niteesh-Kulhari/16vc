import express from "express"
import { getItems, listItem, rentItems, returnItems, searchItems } from "../controller/item.controller";


const router = express.Router();

//******
//* Route to create new item 
//******
router.post("/", listItem)

//******
//* Route to rent item 
//******
router.post("/rent", rentItems)

//******
//* Route to rent item 
//******
router.post("/return", returnItems)

//******
//* Route to get all the items 
//******
router.get("/", getItems)

//******
//* Route to search items based on certain parameters 
//******
router.get("/search", searchItems)


export default router;