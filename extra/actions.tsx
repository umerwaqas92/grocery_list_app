"use server"
import { Grocery, PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


// add new grocery
export async function addGrocery(groceryData: Grocery) {

    const prisma = new PrismaClient()
    const grocery = await prisma.grocery.create({
        data: {
            name: groceryData.name,
            amount: groceryData.amount,
            notes: groceryData.notes,
            status: groceryData.status
        },
    })
    console.log(grocery)
}


// get by id
export async function getGrocery(id: string) {
    const prisma = new PrismaClient()
    const grocery = await prisma.grocery.findUnique({
        where: {
            id: id
        }
    })
    console.log(grocery)
    return grocery
}

// update grocery
export async function updateGrocery(groceryData: Grocery) {
    const prisma = new PrismaClient()
    const grocery = await prisma.grocery.update({
        where: {
            id: groceryData.id
        },
        data: {
            name: groceryData.name,
            amount: groceryData.amount,
            notes: groceryData.notes,
            status: groceryData.status
        },
    })
    console.log(grocery)
}

// update status
export async function updateStatus(id: string, status: string) {
    const prisma = new PrismaClient()
    const grocery = await prisma.grocery.update({
        where: {
            id: id
        },
        data: {
            status: status
        },
    })
    console.log(grocery)
}

// delete grocery
export async function deleteGrocery(id: string) {
    const prisma = new PrismaClient()
    const grocery = await prisma.grocery.delete({
        where: {
            id: id
        }
    })
    console.log(grocery)
}

// revalidate helper function
export async function MyRevalidate(path: string) {
    revalidatePath(path)
}

// Redirect helper function
export async function MyRedirect(path: string) {
    revalidatePath(path)
    return redirect(path)
}