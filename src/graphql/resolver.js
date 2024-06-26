import { PrismaClient } from "@prisma/client";
let prisma = new PrismaClient();

export let resolver = {
  getVideo: async () => {
    let data = await prisma.video.findMany({
      include: {
        users: true,
        video_type: true,
      },
    });
    console.log(data);
    return data;
  },

  getUser: () => {
    let data = {
      id: 1,
      userName: "abc",
      age: 2,
      email: "abc@gmail.com",
      product: [
        {
          productId: 1,
          productName: "sp1",
        },
      ],
    };
    return data;
  },

  getUserId: ({ userId }) => {
    let data = {
      id: userId,
      userName: "abc",
      age: 2,
      email: "abc@gmail.com",
      product: [
        {
          productId: 1,
          productName: "abc",
        },
      ],
    };
    return data;
  },

  createUser: () => {},
};
