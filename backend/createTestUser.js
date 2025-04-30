const bcrypt = require("bcryptjs");
const { connectDB, getDB } = require("./config/db"); // Make sure path is correct

const usersData = [
  { name: "Effat Mujawar", email: "effat.mujawar@gmail.com", role: "admin" },
  { name: "Shruti Waychal", email: "shruti.waychal@gmail.com", role: "admin" },
  { name: "Anish Jarag", email: "anish.jarag@gmail.com", role: "manager" },
  {
    name: "Tanishq Vankudre",
    email: "tanishq.vankudre@gmail.com",
    role: "manager",
  },
  { name: "Test User", email: "test.user@gmail.com", role: "user" },
];

async function createUsers() {
  try {
    await connectDB();
    const db = getDB();
    const users = db.collection("users");

    const hashedUsers = await Promise.all(
      usersData.map(async ({ name, email, role }) => {
        const firstName = name.split(" ")[0];
        const password = await bcrypt.hash(`${firstName}123`, 10);
        return { name, email, password, role };
      })
    );

    const result = await users.insertMany(hashedUsers);
    console.log(`✅ Inserted ${result.insertedCount} users.`);
  } catch (err) {
    console.error("❌ Error inserting users:", err);
  } finally {
    process.exit();
  }
}

createUsers();
