import { createApp, createIdentityProvider } from '@kottster/server';
import schema from '../../kottster-app.json';

/*
 * Sensitive values are read from environment variables so they are never
 * stored in source code.  In Dokploy (or any other PaaS) set these in the
 * "Environment Variables" section of your service.
 *
 * See https://kottster.app/docs/deploying#before-you-deploy
 */

const secretKey     = process.env.SECRET_KEY;
const jwtSecretSalt = process.env.JWT_SECRET_SALT;
const rootUsername  = process.env.ROOT_USERNAME ?? 'admin';
const rootPassword  = process.env.ROOT_PASSWORD;

if (!secretKey)     throw new Error('Missing required env variable: SECRET_KEY');
if (!jwtSecretSalt) throw new Error('Missing required env variable: JWT_SECRET_SALT');
if (!rootPassword)  throw new Error('Missing required env variable: ROOT_PASSWORD');

export const app = createApp({
  schema,
  secretKey,

  /*
   * The identity provider configuration.
   * See https://kottster.app/docs/app-configuration/identity-provider
   */
  identityProvider: createIdentityProvider('sqlite', {
    // Store the DB in /app/data so it can be mounted as a Docker volume
    fileName: 'data/app.db',

    passwordHashAlgorithm: 'bcrypt',
    jwtSecretSalt,

    /* The root admin user credentials */
    rootUsername,
    rootPassword,
  }),
});