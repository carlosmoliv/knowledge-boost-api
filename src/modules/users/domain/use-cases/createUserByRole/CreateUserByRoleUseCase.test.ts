import { AppError } from "../../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/inMemory/UsersRepositoryInMemory";
import { Role } from "../../users.enums";
import { CreateUserByRoleUseCase } from "./CreateUserByRoleUseCase";

describe("Create User by Role", () => {
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let createUserByRoleUseCase: CreateUserByRoleUseCase;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserByRoleUseCase = new CreateUserByRoleUseCase(
      usersRepositoryInMemory
    );
  });

  it("should create a new user student by default with the provided data", async () => {
    const data = {
      name: "John Doe",
      email: "johndoe.student.1@example.com",
      password: "12345678",
    };

    const user = await createUserByRoleUseCase.execute(data);

    expect(user).toBeDefined();
    expect(user).toHaveProperty("_id");
    expect(user.role).toEqual(Role.student);
  });

  // it("shouldn't create user with an email that already exists", async () => {
  //   const existingUser = {
  //     name: "John Doe",
  //     email: "johndoe.student.2@example.com",
  //     password: "12345678",
  //   };

  //   await createUserByRoleUseCase.execute(existingUser);

  //   const data = {
  //     name: "John Doe",
  //     email: "johndoe.student.2@example.com",
  //     password: "12345678",
  //   };

  //   await expect(createUserByRoleUseCase.execute(data)).rejects.toEqual(
  //     new AppError(
  //       "UserConflictError",
  //       "User already exists with the provided email address.",
  //       409
  //     )
  //   );
  // });

  it("should create a user tutor if role tutor is provided", async () => {
    const data = {
      email: "johndoe.tutor.1@example.com",
      name: "John Doe Tutor",
      password: "12345678",
    };

    const user = await createUserByRoleUseCase.execute(data, Role.tutor);

    expect(user.role).toEqual(Role.tutor);
    expect(user.tutor).toBeDefined();
  });

  it("should create a user admin if role admin is provided", async () => {
    const data = {
      email: "johndoe.admin.1@example.com",
      name: "John Doe Admin",
      password: "12345678",
    };

    const user = await createUserByRoleUseCase.execute(data, Role.admin);

    expect(user.role).toEqual(Role.admin);
    expect(user.admin).toBeDefined();
  });
});
