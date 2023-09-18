import { IncomingMessage, ServerResponse } from "http";
import { IPatchUser, IUsers } from "./repositories/UserRepository";
import { UserController } from "./controllers/UserController";

const http = require("http");
const userController = new UserController()

const getBody = (req: IncomingMessage) => new Promise((resolve, reject) => {
  let body = "";
  req.on("data", chunk => {
    body += chunk.toString();
  });
  req.on("end", () => {
    if (body)
      resolve(JSON.parse(body))
    else
      resolve('')
  });
})

const serverHandler = (fn: Function) => {
  return async (req: IncomingMessage, res: ServerResponse) => {
    const { url, method } = req;
    try {
      const body = await getBody(req)
      const { status, data } = await fn(url, body)
      res.statusCode = status || 200;
      res.setHeader("Cache-Control", "max-age=3600");
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data))
    } catch (e: any) {
      res.statusCode = 404;
      res.end(e.message)
    }
  }
}


const handlerGET = (url: string, body: any) => {
  let data = null;
  if (url === "/users") {
    const users = userController.get() as IUsers[];
    data = users.map(user => ({
      ...user,
      links: [
        { rel: "self", href: `/users/${ user.id }` },
        { rel: "hobbies", href: `/users/${ user.id }/hobbies` },
      ],
    }));
  } else if (url.match(/^\/users\/\d+$/)) {
    const userId = parseInt(url.split("/").pop() as string);
    data = userController.get(userId)
  } else if (url.match(/^\/users\/\d+\/hobbies$/)) {
    const userId = parseInt(url.split("/")[2]);
    data = userController.getHobby(userId)
  } else {
    throw new Error("URL Not Allowed");
  }

  return {
    status: 200,
    data
  }

}

const handlerPOST = async (url: string, body: any) => {
  let message
  if (url === "/users") {
    message = userController.post(body as IUsers);
  } else if (url.match(/^\/users\/\d+\/hobbies$/)) {
    const userId = parseInt(url.split("/")[2]);
    const hobbies = body.hobbies;
    message = userController.addHobby(userId, hobbies)
  } else {
    throw new Error("URL Not Allowed");
  }
  return {
    status: 201,
    data: message
  }
}

const handlerPUT = async (url: string, body: any) => {
  let data;
  if (url.match(/^\/users\/\d+$/)) {
    const userId = parseInt(url.split("/").pop() as string);
    data = userController.put(userId, body as IPatchUser)
  } else {
    throw new Error("URL Not Allowed");
  }
  return {
    status: 200,
    data
  }
}


const handlerDELETE = async (url: string) => {
  let message = ''
  if (url.match(/^\/users\/\d+$/)) {
    const userId = parseInt(url.split("/").pop() as string);
    message = userController.delete(userId)
  } else if (url.match(/^\/users\/\d+\/hobbies\/\w+$/)) {
    // @ts-ignore
    const [_, userId, hobby] = url.match(/^\/users\/(\d+)\/hobbies\/(\w+)$/);

    message = userController.deleteHobby(parseInt(userId), hobby)
  } else {
    throw new Error("URL Not Allowed");
  }
  return {
    status: 200,
    data: message
  }
}


const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  const { url, method } = req;
  switch (method) {
    case "POST":
      return serverHandler(handlerPOST)(req, res);
    case "GET":
      return serverHandler(handlerGET)(req, res);
    case "PUT":
      return serverHandler(handlerPUT)(req, res);
    case "DELETE":
      return serverHandler(handlerDELETE)(req, res);
    default:
      return res.end("Method Not Allowed");
  }

});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
