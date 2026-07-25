import UserRepository from "../repositories/UserRepository";
import SessionService from "./SessionService";

class UserService {

    async profile(id) {
        return await UserRepository.getById(id);
    }

    async update(user) {

        await UserRepository.update(user);

        // ambil data terbaru dari database
        const updatedUser = await UserRepository.getById(user.id);

        // update session
        SessionService.setCurrentUser(updatedUser);

        return updatedUser;

    }

}

export default new UserService();