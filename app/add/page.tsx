"use client"; // Ensure you have the "use client" directive at the top

import { addGrocery, getGrocery, MyRedirect, updateGrocery } from '@/extra/actions';
import { useSearchParams } from 'next/navigation'

import React, { useEffect } from 'react';

export default function Page() {

    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    console.log(id)

    // use state for grocery name
    const [name, setName] = React.useState("");
    const [amount, setAmount] = React.useState("");
    const [notes, setNotes] = React.useState("");
    const [status, setStatus] = React.useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        if (id) {
            await updateGrocery({


                id: id as string,
                name: data.name as string,
                amount: parseInt(data.amount as string),
                notes: data.notes as string,
                status: data.status as string
            });
        } else {
            await addGrocery({


                id: "",
                name: data.name as string,
                amount: parseInt(data.amount as string),
                notes: data.notes as string,
                status: data.status as string
            });
        }

        MyRedirect("/");


        console.log(data);

        // You can also perform further actions with the data here, like sending it to your API.
    }

    useEffect(() => {

        if (id) {

            getGrocery(id).then((data) => {
                if (data) {

                    setName(data.name)
                    setAmount(data.amount.toString())
                    setNotes(data.notes ?? "")
                    setStatus(data.status ?? "")
                    console.log(data)
                }


            })

        }

    }, [id])


    return (
        <div className="flex  justify-center items-center min-h-screen">


            <form className="flex flex-col gap-4 w-96" onSubmit={handleSubmit} method="post">
                <h2 className="text-xl font-bold "> Add new grocery</h2>
                <label htmlFor="name">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="Enter grocery name" required />

                <label htmlFor="amount">Amount</label>
                <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" name="amount" placeholder="Enter amount" required />

                <label htmlFor="notes">Notes (optional)</label>
                <input value={notes} onChange={(e) => setNotes(e.target.value)} type="text" name="notes" placeholder="Enter any notes" />

                <label htmlFor="status">Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} name="status" defaultValue="pending">
                    <option value="pending">Pending</option>
                    <option value="purchased">Purchased</option>
                </select>

                <button type="submit" value="Submit">
                    {
                        id ? "Update" : "Add"
                    }
                </button>
            </form>
        </div>
    );
}
