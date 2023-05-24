import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useLoading = () => {
  const loading = useSelector((state) => state.loading.pageLoad);
  const [initializing, setInitializing] = useState(true);
  const [isInitial, setInitial] = useState(true);

  useEffect(() => {
    if (isInitial) {
      setInitial(false);
    } else {
      if (!loading) {
        setInitializing(false);
      }
    }
  }, [isInitial, loading]);

  return { initializing, loading };
};
