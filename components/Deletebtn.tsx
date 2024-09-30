"use client"
import { deleteGrocery, MyRevalidate } from '@/extra/actions'
import React from 'react'

export default function Deletebtn({ id: id }: { id: string }) {

    const handleDelete = async (id: string) => {
        await deleteGrocery(id)
        MyRevalidate("/")


    }

    return (
        <button onClick={() => handleDelete(id)}>Delete</button>
    )
}
