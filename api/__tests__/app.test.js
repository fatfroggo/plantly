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

describe("/api/plants", () => {
  test("GET 200 - returns an array of all plant objects in the correct format", () => {
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

describe("/api/plants?climate", () => {
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

describe("/api/plants?common_name=", () => {
  test("GET 200 - returns plants with a common name matching or containing the search field", () => {
    return request(app)
      .get("/api/plants?common_name=Evergreen")
      .expect(200)
      .then(({ body }) => {
        expect(body.plants.length).toBe(2);
        body.plants.forEach((plant) => {
          expect(plant.common_name).toContain("Evergreen");
        });
      });
  });
  test("GET 200 - allows for multiple queries to be made simultaneously", () => {
    return request(app)
      .get("/api/plants?common_name=Evergreen&&climate=Tropical")
      .expect(200)
      .then(({ body }) => {
        expect(body.plants.length).toBe(2);
        body.plants.forEach((plant) => {
          expect(plant.common_name).toContain("Evergreen");
          expect(plant.climate).toEqual("Tropical");
        });
      });
  });
  test("GET 200 - allows for multiple queries to be made simultaneously", () => {
    return request(app)
      .get("/api/plants?common_name=Evergreen&&climate=Subtropical")
      .expect(200)
      .then(({ body }) => {
        expect(body.plants.length).toBe(0);
      });
  });
  test("GET 404 - return a 404 not found error when given a name which does not match any known plants", () => {
    return request(app)
      .get("/api/plants?common_name=hello")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toEqual("Not found");
      });
  })
  test("GET 400 - return a 400 bad request error when given a name of the incorrect data type", () => {
    return request(app)
      .get("/api/plants?common_name=7")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual("Invalid name query");
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
