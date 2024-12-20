import React, { Suspense } from "react";
import UserTable from "./UserTable";
import Link from "next/link";

interface IUsersPageProps {
  searchParams: {
    sortOrder: string;
  };
}

const UsersPage = async ({ searchParams: { sortOrder } }: IUsersPageProps) => {
  return (
    <>
      <h1>Users</h1>
      <Link href="/users/new" className="btn">
        New User
      </Link>
      <Suspense fallback={<p>Loading...</p>}>
        <UserTable sortOrder={sortOrder} />
      </Suspense>
    </>
  );
};

export default UsersPage;
