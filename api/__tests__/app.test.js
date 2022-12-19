const app = require("../app.js");
const {plantsData} = require("../../db/data/test-data/index.js");
const db = require("../../db/connection");
const seed = require("../../db/seeds/seed");
const request = require("supertest");


beforeEach(() => {
  return seed({plantsData});
});

afterAll(() => {
  return db.end();
});


describe ("Get /api/plants", () => {
    test("returns all plants", () => {
        return request(app)
        .get("/api/plants")
        .expect(200)
        .then(({body}) => {
            const {plants} = body
            expect(plants).toBeInstanceOf(Array)
            plants.forEach((plant) => {
                expect(plant).toEqual(
                  expect.objectContaining({
                    plant_id: expect.any(Number),
                    common_name: expect.any(String),
                    latin_name: expect.any(String),
                    category: expect.any(String),
                    climate: expect.any(String),
                    origin: expect.any(String || null),
                    pruning: expect.any(String),
                    watering_advice: expect.any(String),
                    light_preference: expect.any(String),
                    picture_url: expect.any(String),
                    temp_max: expect.any(Number),
                    temp_min:expect.any(Number)
                  })
                );
            })
        })
          })
})