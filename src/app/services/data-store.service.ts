export class DataStoreService {
  allUsers = {
    1: {
      name:     'Pesho Peshev',
      username: 'pesho',
      password: 'pesho_pass',
      role:     'admin',
    },
    2: {
      name:     'Gosho Goshef',
      username: 'gosho',
      password: 'goshev_pass',
      role:     'user',
    },
    3: {
      name:     'Kiro Kirov',
      username: 'kiro',
      password: 'kiro_pass',
      role:     'user',
    },
  };

  userLoggedIn: boolean = false;
  currentUser = {};

  logIn () {
  }
}
