import SubscriptionService from "../services/SubscriptionService";

class SubscriptionApi {

  async getAll() {
    return await SubscriptionService.getAll();
  }

  async getById(id) {
    return await SubscriptionService.getById(id);
  }

  async create(subscription) {
    return await SubscriptionService.create(subscription);
  }

  async update(subscription) {
    return await SubscriptionService.update(subscription);
  }

  async delete(id) {
    return await SubscriptionService.delete(id);
  }

  async search(keyword) {
    return await SubscriptionService.search(keyword);
  }

  async getActive() {
    return await SubscriptionService.getActive();
  }

  async getInactive() {
    return await SubscriptionService.getInactive();
  }

  async getUpcoming() {
    return await SubscriptionService.getUpcoming();
  }

}

export default new SubscriptionApi();