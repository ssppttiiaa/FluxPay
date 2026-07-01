class UserModel {

  constructor({

    id = null,

    full_name,

    email,

    password,

    phone,

    created_at,

  }) {

    this.id = id;

    this.full_name = full_name;

    this.email = email;

    this.password = password;

    this.phone = phone;

    this.created_at = created_at;

  }

  static fromDatabase(data) {

    if (!data) return null;

    return new UserModel(data);

  }

}

export default UserModel;