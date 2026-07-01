class SessionService {

  currentUser = null;

  setCurrentUser(user) {
    this.currentUser = user;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isLogin() {
    return this.currentUser !== null;
  }

  clearSession() {
    this.currentUser = null;
  }

}

export default new SessionService();