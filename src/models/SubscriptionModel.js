class SubscriptionModel {
  constructor({
    id = null,
    name = "",
    price = 0,
    category = "",
    billing_cycle = "",
    start_date = "",
    next_payment_date = "",
    reminder_days = 7,
    status = "active",
    created_at = "",
  }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.billing_cycle = billing_cycle;
    this.start_date = start_date;
    this.next_payment_date = next_payment_date;
    this.reminder_days = reminder_days;
    this.status = status;
    this.created_at = created_at;
  }

  /**
   * Mengubah object menjadi format JSON
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      category: this.category,
      billing_cycle: this.billing_cycle,
      start_date: this.start_date,
      next_payment_date: this.next_payment_date,
      reminder_days: this.reminder_days,
      status: this.status,
      created_at: this.created_at,
    };
  }

  /**
   * Membuat object dari data database
   */
  static fromDatabase(data) {
    if (!data) return null;

    return new SubscriptionModel({
      id: data.id,
      name: data.name,
      price: data.price,
      category: data.category,
      billing_cycle: data.billing_cycle,
      start_date: data.start_date,
      next_payment_date: data.next_payment_date,
      reminder_days: data.reminder_days,
      status: data.status,
      created_at: data.created_at,
    });
  }

  /**
   * Copy object dengan data baru
   */
  copyWith(data = {}) {
    return new SubscriptionModel({
      id: data.id ?? this.id,
      name: data.name ?? this.name,
      price: data.price ?? this.price,
      category: data.category ?? this.category,
      billing_cycle: data.billing_cycle ?? this.billing_cycle,
      start_date: data.start_date ?? this.start_date,
      next_payment_date: data.next_payment_date ?? this.next_payment_date,
      reminder_days: data.reminder_days ?? this.reminder_days,
      status: data.status ?? this.status,
      created_at: data.created_at ?? this.created_at,
    });
  }
}

export default SubscriptionModel;