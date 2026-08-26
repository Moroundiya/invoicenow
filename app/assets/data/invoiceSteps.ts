import { InvoiceStep } from "../layouts/invoice/CreateInvoiceLayout";

export const steps: {
    number: InvoiceStep;
    title: string;
    shortTitle: string;
}[] = [
    {
        number: 1,
        title: "Choose Template",
        shortTitle: "Template",
    },
    {
        number: 2,
        title: "Invoice Details",
        shortTitle: "Details",
    },
    {
        number: 3,
        title: "Customize",
        shortTitle: "Customize",
    },
    {
        number: 4,
        title: "Preview",
        shortTitle: "Preview",
    },
    {
        number: 5,
        title: "Download",
        shortTitle: "Download",
    },
];