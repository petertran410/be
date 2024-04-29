import { buildSchema } from "graphql";

// {productId, productName}
export let schemaGraphpl = buildSchema(`
  type User {
    user_id: ID
    full_name: String
    email: String
    avatar: String,
    pass_word: String,
    face_app_id: String,
    role: String,
    refresh_token: String
  }

  type Video {
    video_id: ID,
    video_name: String,
    thumbnail: String,
    description: String,
    views: Int,
    source: String,
    user_id: Int,
    type_id: Int,
    users: User,
    video_type: videoType
  }

  type videoType {
    type_id: ID,
    type_name: String,
    icon: String
  }

  type Product {
    productId: ID
    productName: String
  }

  type RootQuery {
    getUser: User
    getUserId(userId: Int): User
    getVideo: [Video]
  }

  type RootMutation {
    createUser: String
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);