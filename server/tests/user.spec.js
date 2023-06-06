import mongoose from "mongoose";
import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import _ from "lodash";
import jsonwebtoken from 'jsonwebtoken';
import { userInput, userInputInvalidPassword, userInputInvalidEmail, userInputInvalidName, userPayload, differentUser, photo } from './user.fixture';
import { app } from '../app';
import { jest } from '@jest/globals';
import User from '../models/user.model';
import passport from "passport";

describe('user', () => {
  beforeEach(async () => {
    process.env.JWT_SECRET = 'Secret#123';
    process.env.JWT_EXP = '2h';
    process.env.PORT = 3000;
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterEach(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  // beforeAll(() => {
  //   User.findOne = jest.fn().mockResolvedValue([userPayload])
  // });

  //user registration
  describe("user registration", () => {
    describe("given the username and password are valid", () => {
      it("should return a 200 status and success message", async () => {
        const { statusCode, body } = await supertest(app)
          .post("/api/register")
          .send(userInput);

        expect(statusCode).toBe(200);

        expect(body).toEqual({
          status: true, 
          message: 'User registered successfully'
        });
      });
    });

    describe("given invalid password", () => {
      it("should return a 400 status and validation error", async () => {
        const { statusCode, body } = await supertest(app)
          .post("/api/register")
          .send(userInputInvalidPassword);

        expect(statusCode).toBe(400);

        expect(body).toEqual(
          expect.objectContaining({
            message: 'User validation failed: password: Password must be minimum 8 characters long.',
            name: 'ValidationError'
          })
        );
      });
    });

    describe("given invalid email", () => {
      it("should return a 400 status and validation error", async () => {
        const { statusCode, body } = await supertest(app)
          .post("/api/register")
          .send(userInputInvalidEmail);

        expect(statusCode).toBe(400);

        expect(body).toEqual(
          expect.objectContaining({
            message: 'User validation failed: email: Invalid email.',
            name: 'ValidationError'
          })
        );
      });
    });

    describe("given invalid name", () => {
      it("should return a 400 status and validation error", async () => {
        const { statusCode, body } = await supertest(app)
          .post("/api/register")
          .send(userInputInvalidName);

        expect(statusCode).toBe(400);

        expect(body).toEqual(
          expect.objectContaining({
            message: 'User validation failed: name: Name cannot be empty.',
            name: 'ValidationError'
          })
        );
      });
    });

    describe("fetch user profile given valid credentials", () => {
      it("should return a 200 status and data", async () => {
        const jwt = jsonwebtoken.sign({ _id: userPayload._id },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXP
          });

          jest.spyOn(User, 'findOne').mockReturnValue(userPayload);

        const { statusCode, body } = await supertest(app)
          .get("/api/userProfile")
          .send(userPayload)
          .set("authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);

        expect(body).toEqual(
          expect.objectContaining({
            user: expect.any(Object),
            status: true
          })
        );
      });
    });

    describe("fetch user profile given invalid credentials", () => {
      it("should return a 404 status and data", async () => {
        const jwt = jsonwebtoken.sign({ _id: userPayload._id },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXP
          });

          jest.spyOn(User, 'findOne').mockReturnValue(null);

        const { statusCode, body } = await supertest(app)
          .get("/api/userProfile")
          .send(userPayload)
          .set("authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(404);

        expect(body).toEqual({
          status: false, 
          message: 'User not found'
        });
      });
    });

    /* describe("authenticate user", () => {
      it("should return a 200 status and token", async () => {
        const jwt = jsonwebtoken.sign({ _id: userPayload._id },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXP
          });
        //jest.spyOn(passport, 'authenticate').mockReturnValue(userPayload);
        jest.spyOn(User, 'findOne').mockReturnValue(userPayload);
        passport.authenticate = jest.fn((authType, options, callback) => () => { callback('This is an error', null); });

        const { statusCode, body } = await supertest(app)
          .get("/api/authenticate")
          .send(userPayload);

        expect(statusCode).toBe(200);

        expect(body).toEqual({
          status: false, 
          message: 'User not found'
        });
      });
    }); */

    describe("fetch user photos", () => {
      it("should return a 200 status and data", async () => {
        const jwt = jsonwebtoken.sign({ _id: userPayload._id },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXP
          });

          jest.spyOn(User, 'findOne').mockReturnValue(userPayload);

        const { statusCode, body } = await supertest(app)
          .get("/api/fetchUserPhotos")
          .send(userPayload)
          .set("authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);

        expect(body).toEqual(
          expect.objectContaining({
            user: expect.any(Object),
            status: true
          })
        );
      });
    });

    describe("fetch user photos given invalid user", () => {
      it("should return a 404 status and data", async () => {
        const jwt = jsonwebtoken.sign({ _id: userPayload._id },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXP
          });

          jest.spyOn(User, 'findOne').mockReturnValue(null);

        const { statusCode, body } = await supertest(app)
          .get("/api/fetchUserPhotos")
          .send(userPayload)
          .set("authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(404);

        expect(body).toEqual({
          status: false, 
          message: 'User not found'
        });
      });
    });

    describe("fetch users to follow", () => {
      it("should return a 200 status and data", async () => {
        const jwt = jsonwebtoken.sign({ _id: userPayload._id },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXP
          });

          jest.spyOn(User, 'findOne').mockReturnValue(userPayload);

        const { statusCode, body } = await supertest(app)
          .get("/api/fetchUsersToFollow")
          .send(userPayload)
          .set("authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);

        expect(body).toEqual(
          expect.objectContaining({
            status: true,
            users: expect.any(Object)
          })
        );
      });
    });

    describe("fetch shared photos", () => {
      it("should return a 200 status and data", async () => {
        const jwt = jsonwebtoken.sign({ _id: userPayload._id },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXP
          });

          jest.spyOn(User, 'findOne').mockReturnValue(userPayload);

        const { statusCode, body } = await supertest(app)
          .get("/api/fetchUsersToFollow")
          .send(userPayload)
          .set("authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);

        expect(body).toEqual(
          expect.objectContaining({
            status: true,
            users: expect.any(Object)
          })
        );
      });
    });

    describe("follow a user", () => {
      it("should return a 200 status and success message", async () => {
        const jwt = jsonwebtoken.sign({ _id: userPayload._id },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXP
          });

          jest.spyOn(User, 'findOne').mockReturnValue(differentUser);

        const { statusCode, body } = await supertest(app)
          .post("/api/follow")
          .send({
            'id': differentUser._id,
            'follow': true
          })
          .set("authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);

        expect(body).toEqual({
            status: true,
            message: 'Followed succesfully'
          }
        );
      });
    });

    describe("unfollow a user", () => {
      it("should return a 200 status and success message", async () => {
        const jwt = jsonwebtoken.sign({ _id: userPayload._id },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXP
          });

          jest.spyOn(User, 'findOne').mockReturnValue(differentUser);

        const { statusCode, body } = await supertest(app)
          .post("/api/follow")
          .send({
            'id': differentUser._id,
            'follow': false
          })
          .set("authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);

        expect(body).toEqual({
            status: true,
            message: 'Unfollowed succesfully'
          }
        );
      });
    });

    describe("follow a user given invalid id", () => {
      it("should return a 500 status and error message", async () => {
        const jwt = jsonwebtoken.sign({ _id: userPayload._id },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXP
          });

          jest.spyOn(User, 'findOne').mockReturnValue(differentUser);

        const { statusCode, body } = await supertest(app)
          .post("/api/follow")
          .send({
            'follow': true
          })
          .set("authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(500);

        expect(body).toEqual({
            status: false,
            message: 'Invalid request'
          }
        );
      });
    });

    describe("delete a photo", () => {
      it("should return a 200 status and success message", async () => {
        const jwt = jsonwebtoken.sign({ _id: userPayload._id },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXP
          });

          jest.spyOn(User, 'findOne').mockReturnValue(userPayload);

        const { statusCode, body } = await supertest(app)
          .post("/api/deletePhoto")
          .send({
            'id': differentUser._id
          })
          .set("authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(200);

        expect(body).toEqual({
            status: true,
            message: 'Deleted succesfully'
          }
        );
      });
    });

    describe("delete a photo", () => {
      it("should return a 500 status and error message", async () => {
        const jwt = jsonwebtoken.sign({ _id: userPayload._id },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXP
          });

          jest.spyOn(User, 'findOne').mockReturnValue(null);

        const { statusCode, body } = await supertest(app)
          .post("/api/deletePhoto")
          .send({
            'id': differentUser._id
          })
          .set("authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(500);

        expect(body).toEqual({
            status: false,
            message: 'User does not exist'
          }
        );
      });
    });

    describe("upload a photo", () => {
      it("should return a 500 status and error message", async () => {
        const jwt = jsonwebtoken.sign({ _id: userPayload._id },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXP
          });

          jest.spyOn(User, 'findOne').mockReturnValue(userPayload);

        const { statusCode, body } = await supertest(app)
          .post("/api/upload")
          .send({
            files: {
              'thumbnail': photo
            }
          })
          .set("authorization", `Bearer ${jwt}`);

        expect(statusCode).toBe(500);

        expect(body).toEqual({
            status: false,
            message: 'No file to upload'
          }
        );
      });
    });

  });
});