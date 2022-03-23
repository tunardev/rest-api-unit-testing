import { expect } from "chai";
import request from "request";

const apiUrl = "http://localhost:8080";

describe("routes", () => {
  describe("GET /a", () => {
    it("returns 404", (done) => {
      request(`${apiUrl}/a`, (err, res, body) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
    });
  });
});

describe("routes/users", () => {
  describe("GET /", () => {
    it("returns 200", (done) => {
      request(`${apiUrl}/users`, (error, response, body) => {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe("GET /:id", () => {
    it("returns 400", (done) => {
      request(`${apiUrl}/users/1`, (error, response, body) => {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
  });

  describe("POST /users", () => {
    it("returns 200", (done) => {
      request.post(
        {
          uri: `${apiUrl}/users`,
          body: JSON.stringify({ name: "John Doe", age: 30 }),
        },
        (error, response, body) => {
          expect(response.statusCode).to.equal(200);
          done();
        }
      );
    });

    describe("GET /:id", () => {
      it("returns 200", (done) => {
        request(`${apiUrl}/users/1`, (error, response, body) => {
          expect(response.statusCode).to.equal(200);
          done();
        });
      });
    });

    describe("PUT /:id", () => {
      it("returns 400", (done) => {
        request.put(
          {
            uri: `${apiUrl}/users/2`,
            body: JSON.stringify({ name: "John Doe", age: 20 }),
          },
          (error, response, body) => {
            expect(response.statusCode).to.equal(400);
            done();
          }
        );
      });
    });

    describe("PUT /:id", () => {
      it("returns 200", (done) => {
        request.put(
          {
            uri: `${apiUrl}/users/1`,
            body: JSON.stringify({ name: "John Doe", age: 20 }),
          },
          (error, response, body) => {
            expect(response.statusCode).to.equal(200);
            done();
          }
        );
      });
    });

    describe("DELETE /:id", () => {
      it("returns 400", (done) => {
        request.delete(`${apiUrl}/users/2`, (error, response, body) => {
          expect(response.statusCode).to.equal(400);
          done();
        });
      });
    });

    describe("DELETE /:id", () => {
      it("returns 200", (done) => {
        request.delete(`${apiUrl}/users/1`, (error, response, body) => {
          expect(response.statusCode).to.equal(200);
          done();
        });
      });
    });
  });
});
