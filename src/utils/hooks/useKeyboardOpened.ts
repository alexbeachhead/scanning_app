import { useEffect, useState } from "react"
import { Keyboard, Platform } from "react-native"

export const useKeyboardOpened = () => {
  const [isKeyboardOpened, setIsKeyboardOpened] = useState(false)

  useEffect(() => {
    const keyboardOpenListener = Keyboard.addListener(
      Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow",
      () => setIsKeyboardOpened(true)
    )

    const keyboardHideListener = Keyboard.addListener(
      Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide",
      () => setIsKeyboardOpened(false)
    )

    return () => {
      keyboardHideListener.remove()
      keyboardOpenListener.remove()
    }
  }, [])

  return isKeyboardOpened
}
