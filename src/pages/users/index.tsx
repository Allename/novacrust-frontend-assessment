import UsersTable from "./components/users-table";

const Users = () => {
  return (
    <div className="p-4 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-6xl font-medium text-[#020618]">Users</h1>
          </div>
        </div>
        <UsersTable />
      </div>
    </div>
  );
}

export default Users