import { useState } from "react";

const useFormData = (initState, f01) => {
  const [formData, setFormData] = useState(initState);

  const handleInputChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    f01(formData);
  };

  return { formData, handleInputChange, handleSubmit };
};

export { useFormData };
