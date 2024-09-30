/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { MyRevalidate, updateStatus } from '@/extra/actions';
import React, { useEffect } from 'react'

export default function UpdateStatus({ id: id, status }: { id: string, status: string }) {
    // use steate for status
    const [_status, set_Status] = React.useState(status);

    useEffect(() => {

        updateStatus(id, _status).then(() => {
            MyRevalidate("/")
        })

    }, [

        _status
    ])





    return (
        <div className="flex gap-2">

            <select value={status} onChange={(e) => set_Status(e.target.value)} name="status" id="status" className="">
                <option value="pending">Pending</option>
                <option value="purchased">Purchased</option>
            </select>


        </div>
    )
}
