import AsyncStorage from "@react-native-async-storage/async-storage"

export class StorageHelper {
  static set<T>(key: string, data: T) {
    const value = JSON.stringify(data)

    return AsyncStorage.setItem(key, value)
  }

  static async get<T>(key: string) {
    const strObj = await AsyncStorage.getItem(key)

    return strObj ? (JSON.parse(strObj) as T) : null
  }

  static clear() {
    return AsyncStorage.clear()
  }
}
