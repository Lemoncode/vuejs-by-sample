interface LoginEntity {
  login: string;
  password: string;
}

const createEmptyLoginEntity = (): LoginEntity => ({
  login: '',
  password: '',
});

export { LoginEntity, createEmptyLoginEntity };