import { Sequelize } from 'sequelize';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from '../config';
// import Umzug from 'umzug';
// import { DATABASE_URL } from '../config';

// export const sequelize = new Sequelize(
//   DATABASE_URL
//   // {dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }}
// );

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
});

// const runMigrations = async () => {
//   const migrator = new Umzug({
//     storage: 'sequelize',
//     storageOptions: {
//       sequelize,
//       tableName: 'migrations',
//     },
//     migrations: {
//       params: [sequelize.getQueryInterface()],
//       path: `${process.cwd()}/migrations`,
//       pattern: /\.ts$/,
//     },
//   });
//   const migrations = await migrator.up();
//   console.log('Migrations up to date', {
//     files: migrations.map((mig) => mig.file),
//   });
// };

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('Database connected');
  } catch (error) {
    console.log('Connecting to database failed');
    console.log(error);
    return process.exit(1);
  }

  return null;
};
