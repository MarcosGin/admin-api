import * as passport from "passport";
import * as passportLocal from "passport-local";
import * as passportBearer from "passport-http-bearer";
import * as passportClient from "passport-oauth2-client-password";
import { BasicStrategy } from "passport-http";
import * as bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";

import { User, AccessToken, Client } from "../models";
import { AuthError } from "../errors/AuthError";

const LocalStrategy = passportLocal.Strategy;
const BearerStrategy = passportBearer.Strategy;
const ClientPasswordStrategy = passportClient.Strategy;

export class Auth {
  static serializeUser() {
    passport.serializeUser((user: any, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id: number, done) => {
      User.findOne<User>({ where: { id } }).then((user: User) => {
        done(null, user);
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
      new LocalStrategy(async (userName, password, done) => {
        const user = await User.findOne<User>({ where: { email: userName } });
        if (user) {
          //const authorized = await this.comparePasswords(password, user.password);
          return done(null, user);
        } else {
          return done("No user found", false);
        }
      })
    );
  }

  static async comparePasswords(pass1: string | undefined, pass2: string | undefined): Promise<boolean> {
    if (pass1 && pass2) {
      return bcrypt.compare(pass1, pass2);
    } else {
      return false;
    }
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

            return done(null, user);
          } else {
            return done(new AuthError("Unauthorized"));
          }
        } catch (err) {
          if (err) return done(new AuthError(err.message), false);
        }
      })
    );
  }

  /**
   * BasicStrategy & ClientPasswordStrategy
   *
   * These strategies are used to authenticate registered OAuth clients.  They are
   * employed to protect the `token` endpoint, which consumers use to obtain
   * access tokens.  The OAuth 2.0 specification suggests that clients use the
   * HTTP Basic scheme to authenticate.  Use of the client password strategy
   * allows clients to send the same credentials in the request body (as opposed
   * to the `Authorization` header).  While this approach is not recommended by
   * the specification, in practice it is quite common.
   */
  static useBasicStrategy() {
    passport.use(
      new BasicStrategy(function(clientId, clientSecret, done) {
        Client.findOne({
          where: { clientId: clientId }
        })
          .then(function(client: any) {
            if (!client) return done(null, false);
            if (!bcrypt.compareSync(clientSecret, client.clientSecret)) return done(null, false);
            return done(null, client);
          })
          .catch(function(error) {
            return done(error);
          });
      })
    );

    passport.use(
      new ClientPasswordStrategy(function(clientId, clientSecret, done) {
        Client.findOne({
          where: { clientId: clientId }
        })
          .then(function(client: any) {
            if (!client) return done(null, false);
            if (!bcrypt.compareSync(clientSecret, client.clientSecret)) return done(null, false);
            return done(null, client);
          })
          .catch(function(error) {
            return done(error);
          });
      })
    );
  }

  public static getBearerMiddleware() {
    return passport.authenticate("bearer", { session: false, failWithError: true });
  }
}
