import { notFound } from "next/navigation";
import React from "react";

interface IUserDetailPageProps {
  params: {
    id: number;
  };
}

const UserDetailPage = ({ params: { id } }: IUserDetailPageProps) => {
  if (id > 10) notFound();

  return <div>UserDetailPage {id} </div>;
};

export default UserDetailPage;
