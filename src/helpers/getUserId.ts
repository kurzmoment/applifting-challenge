import client from "../apollo-client";
import { GET_USERS } from "../graphql/queries";

export async function getUserId(userEmail: string | undefined) {
  const {
    data: { getUserList },
  } = await client.query({
    query: GET_USERS,
  });
  var user_id: number = 0;
  getUserList.map((u: User) => {
    if (u.email === userEmail) {
      user_id = u.id;
    }
    return user_id;
  });
  return user_id;
}
