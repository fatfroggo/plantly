const app = require("../app.js");
const { plantsData } = require("../../db/data/test-data/index.js");
const db = require("../../db/connection");
const seed = require("../../db/seeds/seed");
const request = require("supertest");

beforeEach(() => {
  return seed({ plantsData });
});

afterAll(() => {
  return db.end();
});

describe("Get /api/plants", () => {
  test("returns all plants", () => {
    return request(app)
      .get("/api/plants")
      .expect(200)
      .then(({ body }) => {
        const { plants } = body;
        expect(plants).toBeInstanceOf(Array);
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
              temp_min: expect.any(Number),
            })
          );
        });
      });
  });
});

describe("/api/plants/:plant_id", () => {
  test("GET 200 - returns a single plant when passed a valid plant_id", () => {
    return request(app)
      .get("/api/plants/9")
      .expect(200)
      .then(({ body }) => {
        const { plant } = body;
        expect(plant).toEqual(
          expect.objectContaining({
            plant_id: 9,
            common_name: "Guzmania",
            latin_name: "Guzmenia 'Marjan'",
            category: expect.any(String),
            climate: expect.any(String),
            origin: expect.any(String || null),
            pruning: expect.any(String),
            watering_advice: expect.any(String),
            light_preference: expect.any(String),
            picture_url:
              "http://www.tropicopia.com/house-plant/thumbnails/5632.jpg",
            temp_max: 30,
            temp_min: 10,
          })
        );
      });
  });
  test("GET 404 - returns a 404 not found error when given a nonexistent plant_id", () => {
    return request(app)
      .get("/api/plants/90")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toEqual("Not found");
      });
  });
  test("GET 400 - returns a bad request error when given an invalid id", () => {
    return request(app)
      .get("/api/plants/hello")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual("Bad request");
      });
  });
});
