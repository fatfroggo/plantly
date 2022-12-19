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

describe.only("/api/plants?climate", () => {
  test("Allows users filter by climate", () => {
    return request(app)
      .get("/api/plants?climate=Tropical")
      .expect(200)
      .then(({ body }) => {
        expect(body.plants.length).toBe(9);
        body.plants.forEach((plant) => {
          expect(plant.climate).toBe("Tropical");
        });
      });
  });
  test("Returns an empy array when given a valid climate which has no related plants", () => {
    return request(app)
      .get("/api/plants?climate=Arid%20Tropical")
      .expect(200)
      .then(({ body }) => {
        expect(body.plants.length).toBe(0);
      });
  });
  test("Returns a 404 not found error when given an climate query of the correct data type but which does not exist", () => {
    return request(app)
      .get("/api/plants?climate=farmland")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Climate not found");
      });
  });
  test("Returns a 400 not found error when given a climate query of an invalid data type", () => {
    return request(app)
      .get("/api/plants?climate=7")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid climate query");
      });
  });
});
