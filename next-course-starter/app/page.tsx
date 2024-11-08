import UsersPage from "./users/page";

export default function Home() {
  return (
    <main>
      <h1>Hello world</h1>
      <UsersPage searchParams={{ sortOrder: "name" }} />
    </main>
  );
}
