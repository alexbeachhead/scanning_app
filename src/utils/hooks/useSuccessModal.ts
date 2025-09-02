import { useState } from "react";

export const useSuccessModal = () => {
  const [successModal, setSuccessModal] = useState({
    open: false,
    title: "",
    subtitle: "",
  });

  const handleSuccessModal = (title: string, subtitle: string) => {
    setSuccessModal({
      open: true,
      title,
      subtitle,
    });
  };

  return { successModal, handleSuccessModal, setSuccessModal };
};
