import User from "./views/User"

const userRoutes = {
  exact: true,
  name: "user",
  path: "/user/:id",
  element: User,
  title: "User Setup",
}

export default userRoutes
