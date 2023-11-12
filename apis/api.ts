type Options = {
  method: string;
  headers: { "Content-Type": string };
  body?: any;
};

const baseUrl = process.env.NEXT_PUBLIC_URL;

async function fetchAPI(endpoint: string, method: string, data: any = null) {
  const options: Options = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  const response = await fetch(`${baseUrl}${endpoint}`, options);
  return response.json();
}

export const getApi = (endpoint: string) => fetchAPI(endpoint, "GET");
export const postApi = (endpoint: string, data: any) =>
  fetchAPI(endpoint, "POST", data);
export const generalApi = fetchAPI;
