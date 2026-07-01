import SubscriptionRepository from "../repositories/SubscriptionRepository";
import SubscriptionModel from "../models/SubscriptionModel";

export const testRepository = async () => {

  console.log("=======================================");
  console.log("🚀 MULAI TEST BACKEND FLUXPAY");
  console.log("=======================================");

  try {

    // ==============================
    // CREATE
    // ==============================

    const subscription = new SubscriptionModel({

      name: "Netflix",

      price: 186000,

      category: "Entertainment",

      billing_cycle: "Monthly",

      start_date: "2026-07-01",

      next_payment_date: "2026-08-01",

      reminder_days: 7,

      status: "active",

      created_at: "2026-07-01",

    });

    const insertedId =
      await SubscriptionRepository.create(subscription);

    console.log("✅ INSERT SUCCESS");
    console.log("ID :", insertedId);





    // ==============================
    // GET BY ID
    // ==============================

    const detail =
      await SubscriptionRepository.getById(insertedId);

    console.log(" ");

    console.log("✅ GET BY ID");

    console.log(detail);





    // ==============================
    // UPDATE
    // ==============================

    detail.price = 200000;

    detail.reminder_days = 3;

    await SubscriptionRepository.update(detail);

    console.log(" ");

    console.log("✅ UPDATE SUCCESS");





    // ==============================
    // GET ALL
    // ==============================

    const allData =
      await SubscriptionRepository.getAll();

    console.log(" ");

    console.log("✅ GET ALL");

    console.table(allData);





    // ==============================
    // SEARCH
    // ==============================

    const search =
      await SubscriptionRepository.search("Net");

    console.log(" ");

    console.log("✅ SEARCH");

    console.table(search);





    // ==============================
    // CATEGORY
    // ==============================

    const entertainment =
      await SubscriptionRepository.getByCategory("Entertainment");

    console.log(" ");

    console.log("✅ CATEGORY");

    console.table(entertainment);





    // ==============================
    // BILLING CYCLE
    // ==============================

    const monthly =
      await SubscriptionRepository.getByBillingCycle("Monthly");

    console.log(" ");

    console.log("✅ MONTHLY");

    console.table(monthly);





    // ==============================
    // ACTIVE
    // ==============================

    const active =
      await SubscriptionRepository.getAllActive();

    console.log(" ");

    console.log("✅ ACTIVE");

    console.table(active);





    // ==============================
    // COUNT
    // ==============================

    const total =
      await SubscriptionRepository.count();

    console.log(" ");

    console.log("✅ TOTAL SUBSCRIPTION");

    console.log(total);





    // ==============================
    // UPDATE STATUS
    // ==============================

    await SubscriptionRepository.updateStatus(
      insertedId,
      "inactive"
    );

    console.log(" ");

    console.log("✅ STATUS UPDATED");





    // ==============================
    // INACTIVE
    // ==============================

    const inactive =
      await SubscriptionRepository.getInactiveSubscriptions();

    console.log(" ");

    console.log("✅ INACTIVE");

    console.table(inactive);





    // ==============================
    // DELETE
    // ==============================

    await SubscriptionRepository.delete(insertedId);

    console.log(" ");

    console.log("✅ DELETE SUCCESS");





    console.log("=======================================");
    console.log("🎉 SEMUA TEST BERHASIL");
    console.log("=======================================");

  } catch (error) {

    console.log("❌ TEST GAGAL");

    console.log(error);

  }

};