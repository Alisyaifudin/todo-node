import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

async function main() {
	console.log("migration started...");
    console.log(process.env.DATABASE_URL)
	await migrate(db, { migrationsFolder: "drizzle" });
	console.log("migration finished");
	process.exit(0);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
