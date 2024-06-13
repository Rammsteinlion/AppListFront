import { http } from "@/util";
import axios from "axios";

export const getTaskService = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await http.get("");
      } catch (error) {
        console.error("Error:", error);
      }
    }, 2000);
  });
};

export const onGetDataTask = async (): Promise<any> => {
  try {
    const response = await http.post(
      "portafolio/authentication/Backend/public/task/",
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const onAddSaveTask = async (params: { [key: string]: string }): Promise<any> => {
    try {
      const response = await http.post(
        "/portafolio/authentication/Backend/public/task/",
        params,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTgyNTEzMTAsImV4cCI6MTcxODI1MzExMCwiZGF0YSI6eyJpZFRva2VuIjoiYTY5NjYyNDg0NWVlMjRlZDE5YTFjMDdkYWY2ZTZiMTQ3YTM5MTAxY2E2YmVmMDMyMzJhY2EyN2ZiMWM2MzhmMzYzZDE0YTE1N2ZlYzc3ZDMyYWY5MWRhYTc3NmJkMTY1YTg5OGQwNTE3MDFiOGIwMDA0NzhhNGFmM2Y0ODcwODcifX0.LtPiqfbJWSJWnWYsvth7NBwqYs8yutUJLz4IJmDlesk`
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };