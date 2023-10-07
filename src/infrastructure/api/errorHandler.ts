import { useErrorsStore } from "@/common/domain/stores/errorsStore";

export default async (err: any) => {
  const errorsStore = useErrorsStore();
  if (err.response?.data && err.response?.data.type === "UnauthorizedError") {
  } else if (err.name !== "CanceledError") {
    errorsStore.errors.push(err);
  }
  throw err;
};
