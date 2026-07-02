import SubscriptionRepository from "../repositories/SubscriptionRepository";

class SubscriptionAPI {

  async getAll() {
    return await SubscriptionRepository.getAll();
  }

  async getById(id) {
    return await SubscriptionRepository.getById(id);
  }

  async create(data) {
    return await SubscriptionRepository.create(data);
  }

  async update(data) {
    return await SubscriptionRepository.update(data);
  }

  async delete(id) {
    return await SubscriptionRepository.delete(id);
  }

  async search(keyword) {
    return await SubscriptionRepository.search(keyword);
  }

  async getActive() {
    return await SubscriptionRepository.getAllActive();
  }

  async getInactive() {
    return await SubscriptionRepository.getInactiveSubscriptions();
  }

}
export default new SubscriptionAPI();