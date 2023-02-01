import { ConnectionError, Sequelize } from 'sequelize';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from '../config';
import { Umzug, SequelizeStorage } from 'umzug';
import { logErrorMessage } from '../utils/loggers';

/**
 *
 */
export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  dialectOptions: {
    // ssl: {
    //   require: true,
    //   rejectUnauthorized: false,
    // },
  },
  logging: process.env.NODE_ENV === 'production' ? false : console.log,
});

const migrationConf = {
  migrations: { glob: 'src/db/migrations/*.ts' },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
};

const umzug = new Umzug(migrationConf);

/**
 *
 */
const runMigrations = async () => {
  try {
    const migrator = umzug;
    const migrations = await migrator.up();
    console.log('Migrations up to date', {
      files: migrations.map((file) => file.name),
    });
  } catch (error: unknown) {
    logErrorMessage(error);
    console.log('failed to migrate: ', error);
  }
};

/**
 *
 */
export const rollbackMigrations = async () => {
  try {
    await sequelize.authenticate();
    const migrator = umzug;
    await migrator.down();
  } catch (error: unknown) {
    logErrorMessage(error);
    console.log('failed to rollback: ', error);
  }
};

/**
 *
 * @returns
 */
export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();

    console.log('Database connected');
  } catch (error) {
    error instanceof ConnectionError
      ? logErrorMessage(error.message)
      : logErrorMessage(error);

    console.log('Connecting to database failed: ', error);
    return process.exit(1);
  }

  return null;
};

export type Migration = typeof umzug._types.migration;
