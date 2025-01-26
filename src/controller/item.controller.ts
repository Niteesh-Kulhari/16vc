import { Request, Response } from "express";
import {
  Item,
  itemSchema,
  rentSchema,
  returnSchema,
} from "../models/item.model";
import { items } from "../db/items.db";

//*******
// Function to add the item into our in memory database
//  */
export const listItem = (req: Request, res: Response) => {
  const { name, description, pricePerDay } = req.body;

  const newItem = itemSchema.omit({ id: true }).parse(req.body);

  const itemWithId = {
    ...newItem,
    rentalDate: [],
    id: items.length + 1,
  };

  // const newItem: Item = {
  //     id: items.length + 1,
  //     name,
  //     description,
  //     pricePerDay,
  //     availability: true,
  //     rentalDates: [],
  // };

  items.push(itemWithId);
  res.status(201).json(itemWithId);
};

//*******
// Function to get all the items stored in our database
//  */

export const getItems = (req: Request, res: Response) => {
  res.status(200).json(items);
};

//*********
// Function to rent items
//  */

export const rentItems = (req: Request, res: Response): void => {
  try {
    const { name, startDate, endDate } = rentSchema.parse(req.body);

    const item = items.find((i) => i.name === name);

    if (!item) {
      res.status(404).json({ message: "Item Not Found" });
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      res.status(400).json({ message: "Start date must be befor End date" });
    }

    if (!item.rentalDates || item.rentalDates.length === 0) {
      item.rentalDates = [{ start: startDate, end: endDate }];
      res.status(201).json({ message: "Rented Successfully", item });
      return;
    }

    const isAvailable = item.rentalDates.every(
      (rental) => end < new Date(rental.start) || start > new Date(rental.end)
    );

    if (!isAvailable) {
      res
        .status(400)
        .json({ message: "Item is not available on requested dates" });
      return;
    }

    item.rentalDates.push({ start: startDate, end: endDate });
    res.status(201).json({ message: "Rented Successfully", item });
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occured" });
  }
};

//*********
// Function to search item based on parameters
//  */

export const searchItems = (req: Request, res: Response) => {
  try {
    const { name, minPrice, maxPrice } = req.body;

    if (!name && !minPrice && !maxPrice) {
      res.status(400).json({ message: "Invalid Inputs" });
      return;
    }

    const filteredItems = new Set();

    if (name) {
      const filteredNames = items.filter((item) =>
        item.name.toLowerCase().includes(name.toLowerCase())
      );

      filteredNames.forEach((item) => filteredItems.add(item));
    }

    if (minPrice) {
      const filteredMin = items.filter((item) => item.pricePerDay >= minPrice);

      filteredMin.forEach((item) => filteredItems.add(item));
    }

    if (maxPrice) {
      const filteredMax = items.filter((item) => item.pricePerDay <= maxPrice);

      filteredMax.forEach((item) => filteredItems.add(item));
    }

    const array = Array.from(filteredItems);

    if (array.length === 0) {
      res.status(404).json({ message: "No items found" });
      return;
    }

    res.status(200).json({ message: "Items Found", array });
  } catch (error) {
    res.status(500).json({ message: "Unexpected Error Occured" });
  }
};

//*********
// Function to return rented item
//  */

export const returnItems = (req: Request, res: Response) => {
  try {
    const { name, startDate, endDate } = returnSchema.parse(req.body);

    const item = items.find(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );
    if (!item) {
      res.status(404).json({ message: "Item Not Found" });
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      res
        .status(400)
        .json({ message: "Start date should be less than End date" });
    }

    const rentIndex = item.rentalDates?.findIndex(
      (rental) => {
         rental.start === startDate  &&
         rental.end === endDate
      }
    )

    if(rentIndex === -1){
      res.status(400).json({message: "Rental not found"})
    }
  } catch (error) {
    res.status(500).json({ message: "Unexpected Error occured" });
  }
};
