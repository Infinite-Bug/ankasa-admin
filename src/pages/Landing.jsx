import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/actions/user";

export default function Landing() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div>
      {user.isLoading ? (
        <h1 className="bg-success p-3">Loading...</h1>
      ) : (
        user.data.map((item) => <div key={item.id}>{item.name}</div>)
      )}
    </div>
  );
}
