import { createTables } from "../database/migrations";

import { testRepository } from "./testRepository";
import { testUser } from "./testUser";
import { testDashboard } from "./testDashboard";
import { testReminder } from "./testReminder";
import { testCurrency } from "./testCurrency";
import {testNotification} from "./testNotification";
import {testExport} from "./testExport";
// import {testLocalNotification} from "./testLocalNotification";

export const testAll = async () => {

  console.log("\n==================================");
  console.log("🚀 FLUXPAY BACKEND TEST");
  console.log("==================================");

  try {

    // Membuat database & tabel
    await createTables();

    // TEST 1
    console.log("\n===== TEST CRUD SUBSCRIPTION =====");
    await testRepository();

    // TEST 2
    console.log("\n===== TEST USER =====");
    await testUser();

    // TEST 3
    console.log("\n===== TEST DASHBOARD =====");
    await testDashboard();

    // TEST 4
    console.log("\n===== TEST REMINDER =====");
    await testReminder();
    
// TEST 5
    console.log("\n===== TEST CURRENCY =====");
    await testCurrency();

    // TEST 6
    console.log("\n===== TEST NOTIFICATION =====");
    await testNotification();

    // TEST 7
    console.log("\n===== TEST EXPORT =====");
    await testExport();

    // TEST 8
    // console.log("\n===== TEST LOCAL NOTIFICATION =====");
    // await testLocalNotification();

    console.log("\n==================================");
    console.log("✅ SEMUA TEST BERHASIL");
    console.log("==================================");

  } catch (err) {

    console.log("\n==================================");
    console.log("❌ TEST GAGAL");
    console.log(err);
    console.log("==================================");

  }

};