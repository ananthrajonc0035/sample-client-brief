
interface CreateAccountParams {
  customerName: string;
  briefId: string;
  briefName: string;
  isActive: boolean;
}

export const useAccount = () => {
  const loading = ref(false);

  const createAccount = async ({
    customerName,
    briefId,
    briefName,
    isActive,
  }: CreateAccountParams) => {
    try {
      loading.value = true;
      const requestBody = {
        customerName,
        briefId: parseInt(briefId),
        briefName,
        isActive,
      };

      const response = await fetch(
        "http://52.66.203.14:9000/api/v1/accounts/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Account created successfully:", data);
      alert("Account created successfully!");
    } catch (error) {
      console.error("Error creating account:", error);
      alert(
        "Error creating account. Please check the console for more information."
      );
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    createAccount,
  };
};
