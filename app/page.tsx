import Deletebtn from "@/components/Deletebtn";
import UpdateStatus from "@/components/UpdateStatus";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

export default async function Home() {

  const prisma = new PrismaClient()
  const groceryList = await prisma.grocery.findMany()
  console.log(groceryList)




  return (

    <>

      <Link href="/add">+ Add new grocery</Link>
      <br />
      <br />


      <h2 className="text-xl font-bold ">
        Groceries
      </h2>
      <div className="flex gap-2 flex-row flex-grow">
        <p className="text-xs font-bold">ID:</p>
        <p className="text-xs font-bold">Name:</p>
        <p className="text-xs font-bold">Amount:</p>
        <p className="text-xs font-bold">Notes:</p>
        <p className="text-xs font-bold">Status:</p>



      </div>
      <div className="flex flex-col gap-4 mt-4">
        {groceryList?.map((grocery) => (
          <div className="flex flex-row gap-2 w-full justify-between max-w-3xl" key={grocery.id}>

            <div className="flex gap-2 flex-row flex-grow">
              <p>{grocery.id}</p>

              <p>{grocery.name}</p>
              <p>{grocery.amount}</p>
              <p>{grocery.notes}</p>
              <p>{grocery.status}</p>
            </div>

            {/* add edit delete */}
            <div className="flex gap-2 flex-row">
              <UpdateStatus id={grocery.id} status={grocery.status ?? ""} />
              <Link href={`/add?id=${grocery.id}`}>Edit</Link>
              <Deletebtn id={grocery.id} />

            </div>
          </div>
        ))}
      </div>

    </>
  );
}
