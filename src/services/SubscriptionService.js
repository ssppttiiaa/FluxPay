import SubscriptionRepository from "../repositories/SubscriptionRepository";

class SubscriptionService {

    async getAll() {
        return await SubscriptionRepository.getAll();
    }

    async getById(id) {
        return await SubscriptionRepository.getById(id);
    }

    async create(subscription) {
        return await SubscriptionRepository.create(subscription);
    }

    async update(subscription) {
        return await SubscriptionRepository.update(subscription);
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

    async getUpcoming() {
        return await SubscriptionRepository.getUpcomingSubscriptions();
    }

}

export default new SubscriptionService();