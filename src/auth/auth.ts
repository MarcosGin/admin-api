import * as passport from "passport";
import * as passportLocal from "passport-local";
import * as passportBearer from "passport-http-bearer";
import { sign, verify } from "jsonwebtoken";

import { User, AccessToken, UserDTO } from "../models";
import { AuthError } from "../errors/AuthError";
import { Utils } from "../utils";

const LocalStrategy = passportLocal.Strategy;
const BearerStrategy = passportBearer.Strategy;

export class Auth {
  static serializeUser() {
    passport.serializeUser((user: any, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id: number, done) => {
      User.findOne<User>({ where: { id } }).then((user: User) => {
        done(null, new UserDTO(user));
      });
    });
  }

  /**
   * LocalStrategy
   *
   * This strategy is used to authenticate users based on a username and password.
   * Anytime a request is made to authorize an application, we must ensure that
   * a user is logged in before asking them to approve the request.
   */
  static useLocalStrategy() {
    passport.use(
      new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        const user = await User.findOne<User>({ where: { email } });
        if (user) {
          const authorized = await Utils.comparePassword(password, user.password);

          if (authorized) {
            return done(null, new UserDTO(user));
          } else {
            return done(null, false, { message: "The password is incorrect" });
          }
        } else {
          return done(new AuthError("The e-mail not exist."));
        }
      })
    );
  }

  /**
   * BearerStrategy
   *
   * This strategy is used to authenticate users based on an access token (aka a
   * bearer token).  The user must have previously authorized a client
   * application, which is issued an access token to make requests on behalf of
   * the authorizing user.
   */
  static useBearerStrategy() {
    passport.use(
      new BearerStrategy(async (token, done) => {
        try {
          const accessToken = await AccessToken.findOne<AccessToken>({ where: { token } });

          if (accessToken) {
            const decodedToken = await verify(accessToken.token, process.env.JWT_SECRET || "");
            const user = await User.findOne({ where: { id: decodedToken["id"] } });

            if (user) {
              return done(null, new UserDTO(user));
            }
          } else {
            return done(new AuthError("Unauthorized"));
          }
        } catch (err) {
          if (err) return done(new AuthError(err.message), false);
        }
      })
    );
  }

  public static getBearerMiddleware() {
    return passport.authenticate("bearer", { session: false, failWithError: true });
  }

  public static authenticate = (callback: any) =>
    passport.authenticate("local", { session: false, failWithError: true }, callback);

  public static async createToken(data: object) {
    try {
      const jwt = await sign({ ...data }, process.env.JWT_SECRET || "", { expiresIn: process.env.JWT_EXP });
      return jwt;
    } catch (err) {
      return false;
    }
  }
}
