import React from "react";

interface IUserDetailPageProps {
  params: {
    id: number;
  };
}

const UserDetailPage = ({ params: { id } }: IUserDetailPageProps) => {
  return <div>UserDetailPage {id} </div>;
};

export default UserDetailPage;
