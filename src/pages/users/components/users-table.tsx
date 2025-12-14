/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from "@/components/loader/loader";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelectedUser } from "@/context/SelectedUserContext";
import { fetchUsers, fetchUsersCount } from "@/services/users/userService";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

const UsersTable = () => {
  const navigate = useNavigate();
  const { setSelectedUser } = useSelectedUser();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const PAGE_SIZE = 4;

  const users = useQuery({
    queryKey: ["users", { pageNumber, pageSize: PAGE_SIZE }],
    queryFn: fetchUsers,
  });

  const userCount = useQuery({
    queryKey: ["userCount"],
    queryFn: fetchUsersCount,
  });

  const userData = users?.data;
  const totalCount = userCount?.data?.count;
  const totalPages =
    totalCount && totalCount > 0 ? Math.ceil(totalCount / PAGE_SIZE) : 1;

  const formatAddress = (addr: any) =>
    `${addr.street}, ${addr.city}, ${addr.state}. ${addr.zipcode}`;

  const handleUserClick = (user: any) => {
    setSelectedUser(user);
    navigate({
      to: "/users/$userId/posts",
      params: { userId: user?.id },
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPageNumber(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (pageNumber > 3) {
        pages.push("ellipsis-start");
      }

      const start = Math.max(2, pageNumber - 1);
      const end = Math.min(totalPages - 1, pageNumber + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (pageNumber < totalPages - 2) {
        pages.push("ellipsis-end");
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="w-full h-full">
      <div className="border border-[#E2E8F0] rounded-md min-h-[220px]">
        {users.isFetching ? (
          <Loader />
        ) : users.isError ? (
          <div role="alert" className="p-4 text-red-600">
            Failed to load users.
            <Button
              variant='outline'
              className="ml-2 underline text-red-700"
              onClick={() => users.refetch()}
            >
              Retry
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-[#62748E]">Full Name</TableHead>
                <TableHead className="text-[#62748E]">Email</TableHead>
                <TableHead className="text-[#62748E] max-w-[392px] truncate">
                  Address
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userData?.map((user: any) => (
                <TableRow
                  key={user?.id}
                  onClick={() => handleUserClick(user)}
                  className="cursor-pointer hover:bg-muted"
                >
                  <TableCell className="font-medium">{user?.name}</TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell className="max-w-[392px] truncate">
                    {formatAddress(user.address)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <div className="flex justify-end items-center w-full mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem className="cursor-pointer">
              <PaginationPrevious
                onClick={() => handlePageChange(pageNumber - 1)}
              />
            </PaginationItem>

            {getPageNumbers().map((page) =>
              typeof page === "string" ? (
                <PaginationItem className="cursor-pointer" key={page}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem className="cursor-pointer" key={page}>
                  <PaginationLink
                    onClick={() => handlePageChange(page)}
                    isActive={pageNumber === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem className="cursor-pointer">
              <PaginationNext
                onClick={() => handlePageChange(pageNumber + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default UsersTable;
