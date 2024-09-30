import { PrismaClient, Grocery } from "@prisma/client";
import { addGrocery, getGrocery, updateGrocery, updateStatus, deleteGrocery } from '../extra/actions'; // Update the path to your file

// Mock PrismaClient
jest.mock("@prisma/client", () => {
    const mockPrismaClient = {
        grocery: {
            create: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    };
    return {
        PrismaClient: jest.fn(() => mockPrismaClient),
    };
});

describe("Grocery Server Actions", () => {
    let mockPrismaClient: jest.Mocked<PrismaClient>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockPrismaClient = new PrismaClient() as jest.Mocked<PrismaClient>;
    });

    describe("addGrocery", () => {
        it("should create a new grocery item", async () => {
            const groceryData: Omit<Grocery, 'id'> = {
                name: "Apple",
                amount: 5,
                notes: "Red apples",
                status: "Active",
            };

            const createdGrocery: Grocery = { id: "1", ...groceryData };
            (mockPrismaClient.grocery.create as jest.Mock).mockResolvedValue(createdGrocery);

            await addGrocery(groceryData as Grocery);

            expect(mockPrismaClient.grocery.create).toHaveBeenCalledWith({
                data: groceryData,
            });
        });
    });

    describe("getGrocery", () => {
        it("should fetch a grocery item by id", async () => {
            const groceryItem: Grocery = {
                id: "1",
                name: "Apple",
                amount: 5,
                notes: "Red apples",
                status: "Active",
            };

            (mockPrismaClient.grocery.findUnique as jest.Mock).mockResolvedValue(groceryItem);

            const result = await getGrocery("1");

            expect(mockPrismaClient.grocery.findUnique).toHaveBeenCalledWith({
                where: { id: "1" },
            });
            expect(result).toEqual(groceryItem);
        });
    });

    describe("updateGrocery", () => {
        it("should update an existing grocery item", async () => {
            const groceryData: Grocery = {
                id: "1",
                name: "Apple",
                amount: 10,
                notes: "Green apples",
                status: "Active",
            };

            (mockPrismaClient.grocery.update as jest.Mock).mockResolvedValue(groceryData);

            await updateGrocery(groceryData);

            expect(mockPrismaClient.grocery.update).toHaveBeenCalledWith({
                where: { id: "1" },
                data: {
                    name: groceryData.name,
                    amount: groceryData.amount,
                    notes: groceryData.notes,
                    status: groceryData.status,
                },
            });
        });
    });

    describe("updateStatus", () => {
        it("should update the status of a grocery item", async () => {
            const id = "1";
            const status = "Completed";

            (mockPrismaClient.grocery.update as jest.Mock).mockResolvedValue({ id, status });

            await updateStatus(id, status);

            expect(mockPrismaClient.grocery.update).toHaveBeenCalledWith({
                where: { id },
                data: { status },
            });
        });
    });

    describe("deleteGrocery", () => {
        it("should delete a grocery item", async () => {
            const id = "1";

            (mockPrismaClient.grocery.delete as jest.Mock).mockResolvedValue({ id });

            await deleteGrocery(id);

            expect(mockPrismaClient.grocery.delete).toHaveBeenCalledWith({
                where: { id },
            });
        });
    });
});