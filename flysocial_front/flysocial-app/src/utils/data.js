// Gets user data from Sanity.

export const userQuery = (userId) => {
  const query = `*[_type == "user" && id == '${userId}']`;
  return query;
};
