import { UserDTO } from "@dtos/UserDto";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { USER_STORAGE } from "./storageConfig";

export async function storageUserSave(user: UserDTO): Promise<void> {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
}

export async function storageUserGet(): Promise<UserDTO> {
  const storage = await AsyncStorage.getItem(USER_STORAGE);
  const user: UserDTO = storage ? JSON.parse(storage) : {};

  return user;
}
