const app = require("../app.js");

const {
  plantsData,
  userData,
  myPlantsData,
} = require("../../db/data/test-data/index.js");

const db = require("../../db/connection");
const seed = require("../../db/seeds/seed");
const request = require("supertest");

beforeEach(() => {
  return seed( plantsData, userData, myPlantsData );
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
  });
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

describe("/api/users", () => {
  test("GET 200 - returns an array of user objects in the correct format", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        expect(users).toBeInstanceOf(Array);
        users.forEach((user) => {
          expect(user).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              password: expect.any(String),
              profile_picture: expect.any(String),
              email: expect.any(String),
            })
          );
        });
      });
  });
});

describe("Add a user", () => {
  test("POST - 200, allows for the addition of a new user", () => {
    return request(app)
      .post("/api/users")
      .send({
        username: "christmas123",
        password: "password",
        profile_picture:
          "https://m.media-amazon.com/images/I/31Cd9UQp6eL._SX355_.jpg",
        email: "christmas123@gmail.com",
      })
      .expect(201)
      .then((res) => {
        expect(res.body.user).toEqual({
          username: "christmas123",
          password: "password",
          profile_picture:
            "https://m.media-amazon.com/images/I/31Cd9UQp6eL._SX355_.jpg",
          email: "christmas123@gmail.com",
        });
      });
  });
  test("POST - 400, returns a 400 error if the given user does not meet the input requirements", () => {
    return request(app)
      .post("/api/users")
      .send({
        username: "fatfroggo",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual("Bad request");
      });
  });
});

describe("/api/users/:username", () => {
  test("GET 200 - returns a single user when passed a valid username", () => {
    return request(app)
      .get("/api/users/fatfroggo")
      .expect(200)
      .then(({ body }) => {
        const { user } = body;
        expect(user).toEqual(
          expect.objectContaining({
            username: "fatfroggo",
            password: "password",
            profile_picture:
              "https://ih1.redbubble.net/image.309227812.7490/st,small,507x507-pad,600x600,f8f8f8.jpg",
            email: "fatfroggo@gmail.com",
          })
        );
      });
  });
  test("GET 404 - returns a 404 not found error when given a nonexistent username", () => {
    return request(app)
      .get("/api/users/90")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toEqual("Not found");
      });
  });
});

describe("Update a username of a valid user", () => {
  test("Allows a user to update the username of an existing user", () => {
    return request(app)
      .patch("/api/users/fatfroggo")
      .send({
        username: "fatfroggo123",
      })
      .expect(202)
      .then(({ body }) => {
        expect(body.user).toEqual({
          username: "fatfroggo123",
          password: "password",
          profile_picture:
            "https://ih1.redbubble.net/image.309227812.7490/st,small,507x507-pad,600x600,f8f8f8.jpg",
          email: "fatfroggo@gmail.com",
        });
      });
  });
  test("PATCH 404 - returns a not found error if given a username which does not exist", () => {
    return request(app)
      .patch("/api/users/smileyface")
      .send({
        username: "hello123",
      })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toEqual("Not found");
      });
  });
  test("Patch 400 - returns a bad request error when given an invalid key", () => {
    return request(app)
      .patch("/api/users/fatfroggo")
      .send({
        user: "smileyface",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual("Bad request");
      });
  });
});

describe("/api/myPlants/:username", () => {
  test("GET 200 - returns an array of myPlants for a given username", () => {
    return request(app)
      .get("/api/myPlants/fatfroggo")
      .expect(200)
      .then(({ body }) => {
        const { myPlants } = body;
        expect(myPlants).toBeInstanceOf(Array);
        expect(myPlants.length).toBe(2);
        myPlants.forEach((myPlant) => {
          expect(myPlant).toEqual(
            expect.objectContaining({
              my_plant_id: expect.any(Number),
              username: "fatfroggo",
              category: expect.any(String),
              climate: expect.any(String),
              common_name: expect.any(String),
              latin_name: expect.any(String),
              light_preference: expect.any(String),
              origin: expect.any(String),
              pruning: expect.any(String),
              watering_advice: expect.any(String),
              picture_url: expect.any(String),
              temp_max: expect.any(Number),
              temp_min: expect.any(Number),
              last_watered: expect.any(Number),
            })
          );
        });
      });
  });
  test("GET 404 - returns a 404 not found error when given a username which does not exist in the database", () => {
    return request(app)
      .get("/api/myPlants/90")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toEqual("Not found");
      });
  });
});


describe("/api/myPlants/username/:plantid", () => {
  test("POST 201 - Adds plant to database and returns the posted plant", () => {
    return request(app)
      .post("/api/myPlants/fatfroggo/3")
      .send({last_watered: 9 })
      .expect(201)
      .then(({ body }) => {
        const { myPlant } = body;
        console.log(myPlant)
        expect(myPlant).toEqual(
          expect.objectContaining({
            my_plant_id: 4,
            plant_id: 3,
            username: "fatfroggo",
            last_watered: 9,
          })
        );
      });
  });
  test("GET 404 - returns a 404 not found error when given a username which does not exist in the database", () => {
    return request(app)
      .post("/api/myPlants/90/3")
      .send({ last_watered: 9 })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toEqual("Not found");
      });
  });
    test("GET 404 - returns a 404 not found error when given a plant_id which does not exist in the database", () => {
      return request(app)
        .post("/api/myPlants/fatfroggo/50")
        .send({ last_watered: 9 })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toEqual("Not found");
        });
    });
        test("GET 400 - returns a 400 bad request error when given an invalid body", () => {
          return request(app)
            .post("/api/myPlants/fatfroggo/3")
            .send({ watered: 9 })
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toEqual("Bad request");
            });
        });
});