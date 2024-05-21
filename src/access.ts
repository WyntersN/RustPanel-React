export default (initialState: initialStateType) => {
  const access: string[] = [];
  if (initialState && initialState.access) {
    access.push(...initialState.access.map((item) => item.toLowerCase()));
  }
  return {
    buttonAccess: (name: string) => access.includes(name.toLowerCase()),
  };
};
