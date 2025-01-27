import request from "supertest";
import { items } from "../db/items.db";
import app from "../index";

describe("API Integration Tests", () => {
    beforeEach(() => {
      items.length = 0;
    });

    it("Should add a new item to db to POST -> /api/items", async () => {
        const response = await request(app).post("/api/items").send({
            name: "Bike",
            description: "Great bike for staying healthy",
            pricePerDay: 30,
        });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe("Bike");
        expect(items).toHaveLength(1);


        //***
        // Test Call to add second item
        //  */
        const response2 = await request(app).post("/api/items").send({
            name: "Camera",
            description: "Great 48mp Camera for clicking pictures",
            pricePerDay: 65,
        });

        expect(response2.status).toBe(201);
        expect(response2.body.name).toBe("Camera");
        expect(items).toHaveLength(2);

        //***
        // Test Call to get all items
        //  */

        const response3 = await request(app).get("/api/items")

        expect(response3.status).toBe(200);
        expect(response3.body).toHaveLength(2);
        expect(response3.body[0].name).toBe("Bike");
        expect(response3.body[1].name).toBe("Camera");


        //***
        // Test Call to rent the camera
        //  */

        const response4 = await request(app).post("/api/items/rent").send({
            name: "Camera",
            startDate: "01-20-2025",
            endDate: "01-22-2025"
        })
        //console.log(response4.body.item.rentalDates[0].start);
        expect(response4.body.message).toBe("Rented Successfully");
        expect(response4.status).toBe(201);
        expect(response4.body.item.rentalDates).toHaveLength(1);
        expect(response4.body.item.rentalDates[0].start).toBe("01-20-2025");

        //***
        // Test Call to rent the camera with overlapping dates
        //  */

        const response5 = await request(app).post("/api/items/rent").send({
            name: "Camera",
            startDate: "01-21-2025",
            endDate: "01-25-2025"
        })

        expect(response5.body.message).toBe("Item is not available on requested dates")
        expect(response5.status).toBe(400);

        //***
        // Test Call to rent the camera with wrong dates
        // Start Date is greater than end Date
        //  */

        const response6 = await request(app).post("/api/items/rent").send({
            name: "Camera",
            startDate: "01-10-2025",
            endDate: "01-08-2025"
        })
        expect(response6.body.message).toBe("Start date must be before End date")
        expect(response6.status).toBe(400);


        //***
        // Test Call to rent the camera with wrong inputs
        // Name as a integer
        //  */
        const response7 = await request(app).post("/api/items/rent").send({
            name: 123,
            startDate: "01-01-2025",
            endDate: "01-02-2025"
        })

        expect(response7.body.message).toBe("Invalid input data")

        //***
        // Test Call to rent the camera with wrong inputs
        // wrong dates
        //  */
        const response8 = await request(app).post("/api/items/rent").send({
            name: 123,
            startDate: "01-01-2025",
            endDate: "Hello"
        })

        expect(response8.body.message).toBe("Invalid input data")

        //***
        // Test call to search items based on name
        //  */
        const response9 = await request(app).get("/api/items/search").send({
            name: "Bike"
        })
        //console.log(response9.body)
        expect(response9.status).toBe(200)
        expect(response9.body.message).toBe("Items Found")


        //***
        // Test call to search items based on minPrice
        //  */

        const response10 = await request(app).get("/api/items/search").send({
            minPrice: 10
        })
        //console.log(response10.body)
        expect(response10.status).toBe(200)
        expect(response10.body.message).toBe("Items Found")

        //***
        // Test call to search items based on minPrice
        //  */

        const response11 = await request(app).get("/api/items/search").send({
            maxPrice: 11
        })
        //console.log(response11.body)
        expect(response11.status).toBe(404)
        expect(response11.body.message).toBe("No items found")

        //***
        // Test call to search items based on minPrice
        //  */

        const response12 = await request(app).post("/api/items/return").send({
            name: "Car",
            startDate: "01-20-2025",
            endDate: "01-22-2025"
        })
        //console.log(response12.body)
        expect(response12.status).toBe(404)
        expect(response12.body.message).toBe("Item Not Found")

        //***
        // Test call to search items based on minPrice
        //  */

        const response13 = await request(app).post("/api/items/return").send({
            name: "Camera",
            startDate: "01-20-2025",
            endDate: "01-22-2025"
        })
        console.log(response13.body)
        expect(response13.status).toBe(200)
        expect(response13.body.message).toBe("Return Successfull")
        expect(response13.body.item.name).toBe("Camera") 
    });
});
