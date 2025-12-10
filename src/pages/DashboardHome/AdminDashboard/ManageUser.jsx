import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AiFillDelete } from "react-icons/ai";
import Swal from "sweetalert2";

const ManageUser = () => {
  const { user } = useAuth();
  const [role, setRole] = useState("");
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users", role],
    queryFn: async () => {
      const url = role ? `/users/role/${role}` : "/users";
      const result = await axiosSecure.get(url);
      return result.data;
    },
  });

  const handleRole = (id, role) => {
    axiosSecure.patch(`/users/${id}/role`, { role }).then((res) => {
      if (res.data.modifiedCount > 0) {
        console.log(res.data);
        refetch();
      }
    });
  };
  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`users/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <>
      <div className="overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Manage Users</h2>
          <select
            className="border p-2 rounded"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="student">Student</option>
            <option value="moderator">Moderator</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Change Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user?.photoURL} alt={user?.displayName} />
                      </div>
                    </div>
                  </div>
                </td>

                <td>{user?.displayName}</td>
                <td>{user?.email}</td>
                <td>{user?.role}</td>
                <th>
                  <select
                    defaultValue={user?.role}
                    onChange={(e) => handleRole(user._id, e.target.value)}
                  >
                    <option value="student">Student</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>
                </th>
                <th>
                  <button
                    className="btn btn-ghost bg-warning"
                    onClick={() => deleteUser(user._id)}
                  >
                    <AiFillDelete></AiFillDelete>
                    delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageUser;
