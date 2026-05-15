import { useFieldArray, useForm } from "react-hook-form";
import { api } from "../services/api";
import ReceiptItemsTable from "../components/ReceiptItemsTable";

const CreateReceiptPage = () => {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      items: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = async (data: any) => {
    try {
      await api.post("/receipts", data);

      alert("Create receipt successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Create Warehouse Receipt</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Receipt No"
          {...register("receiptNo")}
        />

        <input
          placeholder="Department"
          {...register("department")}
        />

        <input
          placeholder="Unit Name"
          {...register("unitName")}
        />

        <button
          type="button"
          onClick={() =>
            append({
              productName: "",
              productCode: "",
              quantity: 0,
              unitPrice: 0,
              amount: 0,
            })
          }
        >
          Add Item
        </button>

        <ReceiptItemsTable
          register={register}
          fields={fields}
          remove={remove}
        />

        <button type="submit">
          Save Receipt
        </button>
      </form>
    </div>
  );
};

export default CreateReceiptPage;
